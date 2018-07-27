import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { List } from 'react-native-elements';
import MyListItem from '../../../common/MyListItem';
import { Card } from '../../../common/card';
import SectionHeader from '../../../common/SectionHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import ProgressBar from '../../../common/ProgressBar';
import ErrorScreen from '../../../screens/error';
import CurrentPeriod from '../../summary/CurrentPeriod';
import * as phoneUsageActions from '../../../../actions/PhoneUsageActions';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { COLOR_GRAY_20, COLOR_GRAY_40, COLOR_ERROR, COLOR_GRAY_100 } from '../../../../styles/commonStyles';
import { scale } from '../../../../helpers/scaleHelper';
import Models = VOO.Mobile.App.Models;
import DropDown from '../../../common/DropDown';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import numeral from '../../../../helpers/numberFormatter';
import MyScrollView from '../../../common/MyScrollView';
import { getVoiceUsageTexts } from '../../../../helpers/usageTextHelper';
import { formatNumber } from 'libphonenumber-js';

type ConnectedState = {
    loading: boolean;
    offline: boolean;
    error: any;
    phones: Array<Models.Phone> | null;
    selectedPhoneNumber: string | null;
    phoneUsageCollection: Models.PhoneDailyUsageCollection | null;
}

type ConnectedDispatch = {
    fetchPhones: () => void;
    setSelectedPhoneNumber: (value) => void;
    fetchPhoneUsage: () => void;
}

interface Props {
    loading: boolean;
    offline: boolean;
    error: any;
    selectedPhoneNumber: string | null;
    navigation: any;
    phones: Array<Models.Phone> | null;
    fetchPhones: () => void;
    setSelectedPhoneNumber: (value) => void;
    fetchPhoneUsage: () => void;
    phoneUsageCollection: Models.PhoneDailyUsageCollection;
}

interface State {
    refreshing: boolean;
}

export class TelConsumption extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchPhones();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.phones && nextProps.phones) {
            this.props.fetchPhoneUsage();
        }
    }

    onRefresh() {
        this.props.fetchPhones();
    }

    render() {
        const {
            loading,
            offline,
            error,
            navigation,
            selectedPhoneNumber,
            phones,
            setSelectedPhoneNumber,
            phoneUsageCollection } = this.props;

        // drop down options
        const phoneOptions = phones && phones.length > 0 ? phones.map((phone) => {
            return {
                key: phone.esId,
                value: formatNumber(`+32${phone.esId}`, 'National')
            };
        }) : [];

        let fixUsageTexts;
        let fixUsageProgress = 0;
        const fixed = phoneUsageCollection
            && phoneUsageCollection.options
            ? phoneUsageCollection.options.filter(x => x.id === 'FIXE01') : [];

        if (fixed.length > 0
            && fixed[0].bundles
            && fixed[0].bundles.length > 0) {

            const fixCurrent = Math.round(fixed[0].bundles[0].currentValue / 60);
            const fixLimit = Math.round(fixed[0].bundles[0].value / 60);

            fixUsageTexts = getVoiceUsageTexts(fixCurrent, fixLimit);
            fixUsageProgress = fixCurrent / fixLimit;

        }
        let intlUsageTexts;
        let intlUsageProgress = 0;
        const inter = phoneUsageCollection
            && phoneUsageCollection.options
            ? phoneUsageCollection.options.filter(x => x.id === 'FIXE01') : [];

        if (inter.length > 0
            && inter[0].bundles
            && inter[0].bundles.length > 0) {

            const intlCurrent = Math.round(inter[0].bundles[0].currentValue / 60);
            const intlLimit = Math.round(inter[0].bundles[0].value / 60);

            intlUsageTexts = getVoiceUsageTexts(intlCurrent, intlLimit);
            intlUsageProgress = intlCurrent / intlLimit;

        }

        const noData = !fixUsageTexts && !intlUsageTexts;

        return (
            <MyScrollView
                noData={noData}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                offline={offline}
                error={error}
                noDataNoErrorText="Vous n'avez pas de consommation téléphonique ce mois-ci."
            >
                <DropDown readOnly={phones && phones.length === 1 || false} style={{ marginTop: scale(18), marginBottom: scale(5) }} defaultText={'Selectionner un numéro'} options={phoneOptions} selectedKey={selectedPhoneNumber || ''} onChange={setSelectedPhoneNumber} />
                <View style={{ paddingBottom: scale(5.5) }}>
                    <Card style={{ marginTop: scale(10), marginBottom: scale(15) }}>
                        {fixUsageTexts ?
                            <Section style={[styles.usageSection, styles.cardWithoutHeaderStyle]}>
                                <TwoColumnLine
                                    style={{ paddingBottom: scale(4) }}
                                    column1Icon={Icon.FIXE}
                                    column1Text="Fixe"
                                />
                                <TwoColumnLine
                                    style={{ paddingBottom: scale(7) }}
                                    column1Text={fixUsageTexts.usageCurrentLabel}
                                    column1Type={fixUsageTexts.usageCurrentLabelType}
                                    column1Text2={fixUsageTexts.usageLimitLabel}
                                    column1Text2Type={fixUsageTexts.usageLimitLabelType}
                                    column2Icon={fixUsageTexts.usageTextIcon}
                                    column2Text={fixUsageTexts.usageText}
                                    column2Type={fixUsageTexts.usageTextType}
                                />
                                <ProgressBar progress={(fixUsageProgress)} />
                            </Section>
                            : null}
                        {intlUsageTexts ?
                            <Section noBorderBottom={true} style={[styles.usageSection, styles.cardBottomStyle]}>
                                <TwoColumnLine
                                    style={{ paddingBottom: scale(4) }}
                                    column1Icon={Icon.WORLD_GLOBE}
                                    column1Text="International"
                                />
                                <TwoColumnLine
                                    style={{ paddingBottom: scale(7) }}
                                    column1Text={intlUsageTexts.usageCurrentLabel}
                                    column1Type={intlUsageTexts.usageCurrentLabelType}
                                    column1Text2={intlUsageTexts.usageLimitLabel}
                                    column1Text2Type={intlUsageTexts.usageLimitLabelType}
                                    column2Icon={intlUsageTexts.usageTextIcon}
                                    column2Text={intlUsageTexts.usageText}
                                    column2Type={intlUsageTexts.usageTextType}
                                />
                                <ProgressBar progress={(intlUsageProgress)} />
                            </Section>
                            : null}
                    </Card>
                </View>
                <List containerStyle={{ marginBottom: scale(20), borderTopColor: COLOR_GRAY_40 }}>
                    {phoneUsageCollection && phoneUsageCollection.outOfBundlePriceTVAC ?
                        <MyListItem
                            key="TelOutOfBundle"
                            transparent={true}
                            title="Hors-forfait"
                            rightTitle={`${numeral(phoneUsageCollection.outOfBundlePriceTVAC).format()}€`}
                            rightTitleStyle={[styles.outOfBundleUsage]}
                            onPress={() => navigation.navigate('TelOutOfBundle')}
                        /> : null}
                    <MyListItem
                        key="TelDetailedConsumption"
                        transparent={true}
                        title="Consommation détaillée"
                        onPress={() => navigation.navigate('TelDetailedConsumption')}
                    />
                </List>
                <CurrentPeriod style={{ marginTop: scale(10) }} />
            </MyScrollView>
        );
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    outOfBundleUsage: {
        color: COLOR_ERROR
    },
    usageSection: {
        height: scale(84),
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardWithoutHeaderStyle: {
        borderTopLeftRadius: scale(3),
        borderTopRightRadius: scale(3)
    },
    cardBottomStyle: {
        borderBottomLeftRadius: scale(3),
        borderBottomRightRadius: scale(3)
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchPhones: () => dispatch(phoneUsageActions.fetchPhones()),
    setSelectedPhoneNumber: (value) => {
        dispatch(phoneUsageActions.setSelectedPhoneNumber(value));
        dispatch(phoneUsageActions.fetchPhoneUsage()
        )
    },
    fetchPhoneUsage: () => dispatch(phoneUsageActions.fetchPhoneUsage())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.phones.loading || state.phoneUsage.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.phones.error || state.phoneUsage.error,
        selectedPhoneNumber: state.phones ? state.phones.selectedPhoneNumber : null,
        phones: state.phones ? state.phones.phones : null,
        phoneUsageCollection: state.phoneUsage.phoneUsageCollection ?
            state.phoneUsage.phoneUsageCollection : null,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TelConsumption);
