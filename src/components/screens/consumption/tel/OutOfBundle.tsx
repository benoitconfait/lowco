import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Dispatch } from 'redux';
import * as phoneUsageActions from '../../../../actions/PhoneUsageActions';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import FeaturedLabelValueUnit from '../../../common/FeaturedLabelValueUnit';
import { RootState } from '../../../../reducers';
import TelDayUsage from './TelDayUsage';
import Models = Lowco.Models;
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
    phoneUsageCollection: Models.PhoneDailyUsageCollection | null;
    outOfBundle: object;
}

type ConnectedDispatch = {
    fetchPhoneUsage: () => void;
}

interface Props {
    fetchPhoneUsage: () => void;
    phoneUsageCollection: Models.PhoneDailyUsageCollection;
    outOfBundle: any;
    loading: boolean;
    offline: boolean;
    error: any;
}

interface State {
    refreshing: boolean;
}

export class TelOutOfBundle extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchPhoneUsage();
    }

    onRefresh() {
        this.props.fetchPhoneUsage();
    }

    render() {
        const {
            phoneUsageCollection,
            outOfBundle,
            loading,
            offline,
            error } = this.props;

        const noData = !phoneUsageCollection;

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
                <View style={{ paddingBottom: scale(50) }}>
                    <Card style={{ marginTop: scale(25), marginBottom: scale(19) }}>
                        <Section noBorderBottom={true} style={styles.usageSection}>
                            <View style={styles.outOfBundleGroup}>
                                <View style={styles.outOfBundleLine}>
                                    <Text style={[styles.outOfBundleText, styles.outOfBundleUsage]}>{`${numeral(phoneUsageCollection.outOfBundlePriceTVAC).format()}€`}</Text>
                                </View>
                            </View>
                        </Section>
                    </Card>
                    {outOfBundle ?
                        <View style={styles.outOfBundleDetails}>
                            <TwoColumnLine style={{ marginHorizontal: 21, paddingBottom: 10 }}
                                column1Icon={Icon.FIXE} column1Text="APPELS" column1Type={LineColumnType.Header}
                                column2Text={`${numeral(outOfBundle.total).format()}€`} column2Type={LineColumnType.HeaderBold} />
                            <Section style={styles.details}>
                                <TwoColumnLine
                                    column1Text={`National (${outOfBundle.national.minutes} min.)`}
                                    column2Text={`${numeral(outOfBundle.national.cost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                            </Section>
                            <Section style={styles.details}>
                                <TwoColumnLine
                                    column1Text={`International (${outOfBundle.international.minutes} min.)`}
                                    column2Text={`${numeral(outOfBundle.international.cost).format()}€`} column2Type={LineColumnType.MediumInfoSpaced} />
                            </Section>
                        </View> : null}
                </View>
            </MyScrollView>
        );
    }
};

const styles = StyleSheet.create({
    usageSection: {
        height: scale(60),
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: scale(3)
    },
    outOfBundleGroup: {
        alignItems: 'center'
    },
    outOfBundleLine: {
        flexDirection: 'row'
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
        fontSize: scale(14),
        paddingTop: scale(11)
    },
    outOfBundleNote: {
        marginTop: scale(10),
        fontSize: scale(9)
    },
    outOfBundleDetails: {
        marginTop: scale(10)
    },
    details: {
        paddingHorizontal: 21
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchPhoneUsage: () => dispatch(phoneUsageActions.fetchPhoneUsage())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.phoneUsage.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.phoneUsage.error,
        phoneUsageCollection: state.phoneUsage.phoneUsageCollection ?
            state.phoneUsage.phoneUsageCollection : null,
        outOfBundle: state.phoneUsage.outOfBundle ?
            state.phoneUsage.outOfBundle : null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TelOutOfBundle);
