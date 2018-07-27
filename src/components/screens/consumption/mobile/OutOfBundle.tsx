import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Dispatch } from 'redux';
import * as customerOptionsActions from '../../../../actions/CustomerOptionsActions';
import * as mobileUsageActions from '../../../../actions/MobileUsageActions';
import * as paymentBalanceActions from '../../../../actions/PaymentBalanceActions';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import FeaturedLabelValueUnit from '../../../common/FeaturedLabelValueUnit';
import { RootState } from '../../../../reducers';
import Models = VOO.Mobile.App.Models;
import numeral from '../../../../helpers/numberFormatter';
import { scale } from '../../../../helpers/scaleHelper';
import { COLOR_ERROR, COLOR_GRAY_100 } from '../../../../styles/commonStyles';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import MyScrollView from '../../../common/MyScrollView';

type ConnectedState = {
    loading: boolean;
    offline: boolean;
    error: any;
    options: Models.OptionViewResource[] | null;
    callDetailRecordsHistory: Models.CallDetailRecordsHistory | null;
    selectedMSISDN: number | null;
    totalMobile: number | null;
}

type ConnectedDispatch = {
    fetchPaymentBalance: () => void;
    fetchCustomerOptions: () => void;
    fetchMobileCDR: () => void;
}

interface Props {
    fetchPaymentBalance: () => void;
    fetchCustomerOptions: () => void;
    fetchMobileCDR: () => void;
    loading: boolean;
    offline: boolean;
    error: any;
    options: Models.OptionViewResource[];
    callDetailRecordsHistory: Models.CallDetailRecordsHistory;
    selectedMSISDN: number | null;
    totalMobile: number | null;
}

interface State {
    refreshing: boolean;
}

export class MobileOutOfBundle extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchCustomerOptions();
        this.props.fetchMobileCDR();
    }

    onRefresh() {
        this.props.fetchCustomerOptions();
        this.props.fetchMobileCDR();
    }

    render() {
        const {
            loading,
            offline,
            error,
            callDetailRecordsHistory,
            selectedMSISDN,
            totalMobile,
            options } = this.props;

        // TODO: move logic in reducer
        let limitedBudget: Models.OptionViewResource | null = null;

        if (options && options.length > 0) {
            const limitedBudgetFound = options.filter((option) =>
                option.category && option.category.toString() === 'Mobile' &&
                option.externalId && option.externalId.toUpperCase() === 'LIMIT' &&
                option.status && option.status.toString() === 'Active' &&
                option.phoneNumber === `${selectedMSISDN}`
            );

            if (limitedBudgetFound.length > 0) {
                limitedBudget = limitedBudgetFound[0];
            }
        }

        const outOfBundleSummary = callDetailRecordsHistory &&
            callDetailRecordsHistory.summary;

        let outOfBundleUsageCost;
        if (outOfBundleSummary) {
            outOfBundleUsageCost = outOfBundleSummary.outOfBundleUsage && outOfBundleSummary.outOfBundleUsage.cost ? outOfBundleSummary.outOfBundleUsage.cost : 0;
        }

        const extractValues = (detail) => {
            let totalCost = 0;
            let NationalCost = 0;
            let NationalUsage = 0;
            let InternationalCost = 0;
            let InternationalUsage = 0;

            if (detail) {
                totalCost = detail.outOfBundleUsage && detail.outOfBundleUsage.cost || 0;
                const NationalFound = detail.details && detail.details.filter(d => d.name === 'National');
                if (NationalFound && NationalFound.length > 0) {
                    NationalCost = NationalFound[0].outOfBundleUsage && NationalFound[0].outOfBundleUsage.cost || 0;
                    NationalUsage = NationalFound[0].outOfBundleUsage && NationalFound[0].outOfBundleUsage.usage || 0;
                }

                const InternationalFound = detail.details && detail.details.filter(d => d.name === 'International');
                if (InternationalFound && InternationalFound.length > 0) {
                    InternationalCost = InternationalFound[0].outOfBundleUsage && InternationalFound[0].outOfBundleUsage.cost || 0;
                    InternationalUsage = InternationalFound[0].outOfBundleUsage && InternationalFound[0].outOfBundleUsage.usage || 0;
                }
            }

            return {
                totalCost,
                NationalUsage,
                NationalCost,
                InternationalUsage,
                InternationalCost
            }
        };

        const VoiceFound = outOfBundleSummary && outOfBundleSummary.details && outOfBundleSummary.details.filter(detail => detail.name.toString() === 'Voice');
        const SmsFound = outOfBundleSummary && outOfBundleSummary.details && outOfBundleSummary.details.filter(detail => detail.name.toString() === 'Sms');
        const DataFound = outOfBundleSummary && outOfBundleSummary.details && outOfBundleSummary.details.filter(detail => detail.name.toString() === 'Data');

        const Voice = extractValues(VoiceFound && VoiceFound.length > 0 && VoiceFound[0]);
        const Sms = extractValues(SmsFound && SmsFound.length > 0 && SmsFound[0]);
        const Data = extractValues(DataFound && DataFound.length > 0 && DataFound[0]);

        const noData = !VoiceFound && !SmsFound && !DataFound;

        return (
            <MyScrollView
                noData={noData}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                offline={offline}
                error={error}
                noDataNoErrorText="Vous n'avez pas de consommation hors-forfait ce mois-ci."
            >
                <View style={{ paddingBottom: scale(50) }}>
                    {totalMobile ?
                        <Card style={{ marginTop: scale(25), marginBottom: scale(10) }}>
                            <Section noBorderBottom={true} style={styles.usageSection}>
                                <View style={styles.outOfBundleGroup}>
                                    <View style={styles.outOfBundleLine}>
                                        <Text style={[styles.outOfBundleText, styles.outOfBundleUsage]}>{`${numeral(totalMobile).format()}`}</Text>
                                        {limitedBudget ?
                                            (<View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.outOfBundleText, styles.outOfBundleLimit]}>/{limitedBudget.creditLimit}</Text>
                                                <Text style={[styles.outOfBundleCurrency, styles.outOfBundleLimit]}>€</Text>
                                            </View>) : <Text style={[styles.outOfBundleCurrency, styles.outOfBundleUsage]}>€</Text>}
                                    </View>
                                    {limitedBudget ? <ProgressBar fixedColor={COLOR_ERROR} height={10} progress={outOfBundleUsageCost / limitedBudget.creditLimit} /> : null}
                                    <Text style={styles.outOfBundleNote}>{translate(limitedBudget ? 'MODIFY_LIMIT_VIA_ACCOUNT' : 'MODIFY_OOB_VIA_ACCOUNT')}</Text>
                                </View>
                            </Section>
                        </Card> : null}
                    <View style={styles.outOfBundleDetails}>
                        <TwoColumnLine style={styles.twoColumnStyle}
                            column1Icon={Icon.PHONE} column1Text="APPELS" column1Type={LineColumnType.Header}
                            column2Text={`${numeral(Voice.totalCost).format()}€`} column2Type={LineColumnType.HeaderBold} />
                        <Section style={styles.details}>
                            <TwoColumnLine
                                column1Text={`National (${Voice.NationalUsage} min.)`}
                                column2Text={`${numeral(Voice.NationalCost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                        </Section>
                        <Section style={styles.details}>
                            <TwoColumnLine
                                column1Text={`International (${Voice.InternationalUsage} min.)`}
                                column2Text={`${numeral(Voice.InternationalCost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                        </Section>
                    </View>
                    <View style={styles.outOfBundleDetails}>
                        <TwoColumnLine style={styles.twoColumnStyle}
                            column1Icon={Icon.SMS} column1Text="SMS/MMS" column1Type={LineColumnType.Header}
                            column2Text={`${numeral(Sms.totalCost).format()}€`} column2Type={LineColumnType.HeaderBold} />
                        <Section style={styles.details}>
                            <TwoColumnLine
                                column1Text={`National (${Sms.NationalUsage} SMS/MMS)`}
                                column2Text={`${numeral(Sms.NationalCost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                        </Section>
                        <Section style={styles.details}>
                            <TwoColumnLine
                                column1Text={`International (${Sms.InternationalUsage} SMS/MMS)`}
                                column2Text={`${numeral(Sms.InternationalCost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                        </Section>
                    </View>
                    <View style={styles.outOfBundleDetails}>
                        <TwoColumnLine style={styles.twoColumnStyle}
                            column1Icon={Icon.WORLD_GLOBE} column1Text="DATA" column1Type={LineColumnType.Header}
                            column2Text={`${numeral(Data.totalCost).format()}€`} column2Type={LineColumnType.HeaderBold} />
                        <Section style={styles.details}>
                            <TwoColumnLine
                                column1Text={`National (${Data.NationalUsage} mo)`}
                                column2Text={`${numeral(Data.NationalCost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                        </Section>
                        <Section style={styles.details}>
                            <TwoColumnLine
                                column1Text={`International (${Data.InternationalUsage} mo)`}
                                column2Text={`${numeral(Data.InternationalCost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                        </Section>
                    </View>
                </View>
            </MyScrollView>
        );
    }
};

const styles = StyleSheet.create({
    usageSection: {
        height: scale(93),
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: scale(3)
    },
    outOfBundleGroup: {
        alignItems: 'center'
    },
    outOfBundleLine: {
        flexDirection: 'row',
        marginBottom: scale(10)
    },
    outOfBundleText: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(26)
    },
    outOfBundleUsage: {
        color: COLOR_ERROR
    },
    outOfBundleLimit: {
        color: COLOR_GRAY_100
    },
    outOfBundleCurrency: {
        fontFamily: 'Roboto-Regular',
        alignItems: 'center',
        fontSize: scale(16.5),
        paddingTop: scale(8.5)
    },
    outOfBundleNote: {
        fontFamily: 'Roboto-Regular',
        marginTop: scale(10),
        fontSize: scale(10)
    },
    outOfBundleDetails: {
        marginTop: scale(20)
    },
    twoColumnStyle: {
        marginHorizontal: 17,
        paddingBottom: 10
    },
    details: {
        paddingHorizontal: 20
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchCustomerOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
    fetchPaymentBalance: () => dispatch(paymentBalanceActions.fetchPaymentBalance()),
    fetchMobileCDR: () => dispatch(mobileUsageActions.fetchMobileCDR())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customerOptions.loading || state.mobileCDR.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.customerOptions.error || state.customerOptions.error,
        callDetailRecordsHistory: state.mobileCDR.callDetailRecordsHistory ?
            state.mobileCDR.callDetailRecordsHistory : null,
        options: state.customerOptions ? state.customerOptions.options : [],
        selectedMSISDN: state.mobileSubscriptions ? state.mobileSubscriptions.selectedMSISDN : null,
        totalMobile: state.paymentBalance ? state.paymentBalance.totalMobile : null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileOutOfBundle);
