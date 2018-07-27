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
import Models = VOO.Mobile.App.Models;
import numeral from '../../../../helpers/numberFormatter';
import { scale } from '../../../../helpers/scaleHelper';
import MyScrollView from '../../../common/MyScrollView';

type ConnectedState = {
    loading: boolean;
    offline: boolean;
    error: any;
    phoneUsageCollection: Models.PhoneDailyUsageCollection | null;
    perDayUsages: Array<Models.PerDayUsage>;
}

type ConnectedDispatch = {
    fetchPhoneUsage: () => void;
}

interface Props {
    fetchPhoneUsage: () => void;
    phoneUsageCollection: Models.PhoneDailyUsageCollection;
    perDayUsages: Array<Models.PerDayUsage>;
    loading: boolean;
    offline: boolean;
    error: any;
}

interface State {
    refreshing: boolean;
}

export class TelDetailedConsumption extends React.Component<ConnectedState & ConnectedDispatch, State> {
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
            perDayUsages,
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
                    <Card style={{ marginTop: scale(25), marginBottom: scale(15) }}>
                        <Section style={[styles.featuredSection, styles.cardWithoutHeaderStyle ]}>
                            <FeaturedLabelValueUnit label={translate('CALL_DURATION_USAGE')} value={`${phoneUsageCollection.totalVoiceCommunication}`} unit="min" />
                        </Section>
                        <Section style={[styles.featuredSection, styles.cardBottomStyle]} noBorderBottom={true}>                            
                            <FeaturedLabelValueUnit label={translate('OUT_OF_BUNDLE_OWED')} value={`${numeral(phoneUsageCollection.outOfBundlePriceTVAC).format()}`} unit="€" />
                        </Section>
                    </Card>

                    {perDayUsages && perDayUsages.map((dayUsage, index) => <TelDayUsage key={`dayUsage-${index}`} dayUsage={dayUsage} />)}
                </View>
            </MyScrollView>
        );
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    featuredSection: {
        paddingTop: scale(20),
        height: scale(89),
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: scale(3)
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
    fetchPhoneUsage: () => dispatch(phoneUsageActions.fetchPhoneUsage())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.phoneUsage.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.phoneUsage.error,
        phoneUsageCollection: state.phoneUsage.phoneUsageCollection ?
            state.phoneUsage.phoneUsageCollection : null,
        perDayUsages: state.phoneUsage.perDayUsages ?
            state.phoneUsage.perDayUsages : []
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TelDetailedConsumption);
