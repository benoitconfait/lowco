import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Dispatch } from 'redux';
import * as mobileUsageActions from '../../../../actions/MobileUsageActions';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import FeaturedLabelValueUnit from '../../../common/FeaturedLabelValueUnit';
import { RootState } from '../../../../reducers';
import MobileDayUsage from './MobileDayUsage';
import Models = Lowco.Models;
import numeral from '../../../../helpers/numberFormatter';
import { scale } from '../../../../helpers/scaleHelper';
import MyScrollView from '../../../common/MyScrollView';

type ConnectedState = {
    loading: boolean;
    offline: boolean;
    error: any;
    callDetailRecordsHistory: Models.CallDetailRecordsHistory | null;
}

type ConnectedDispatch = {
    fetchMobileCDR: () => void;
}

interface Props {
    fetchMobileCDR: () => void;
    callDetailRecordsHistory: Models.CallDetailRecordsHistory;
    loading: boolean;
    offline: boolean;
    error: any;
    recordType: string;
}

interface State {
    refreshing: boolean;
}

export class Details extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchMobileCDR();
    }

    onRefresh() {
        this.props.fetchMobileCDR();
    }

    render() {
        const {
            callDetailRecordsHistory,
            loading,
            offline,
            error,
            recordType } = this.props;

        const hasData = callDetailRecordsHistory && callDetailRecordsHistory.items && callDetailRecordsHistory.items.length > 0;

        return (
            <MyScrollView
                noData={!hasData}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                offline={offline}
                error={error}
                noDataNoErrorText="Vous n'avez pas de consommation mobile ce mois-ci."
            >
                <View style={{ paddingBottom: scale(50) }}>
                    {hasData && callDetailRecordsHistory.items.map((dayUsage, index) => <MobileDayUsage key={`dayUsage-${index}`} recordType={recordType} dayUsage={dayUsage} />)}
                </View>
            </MyScrollView>
        );
    }
};

const styles = StyleSheet.create({
    featuredSection: {
        paddingTop: scale(20)
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchMobileCDR: () => dispatch(mobileUsageActions.fetchMobileCDR())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.mobileCDR.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.mobileCDR.error,
        callDetailRecordsHistory: state.mobileCDR.callDetailRecordsHistory ?
            state.mobileCDR.callDetailRecordsHistory : null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

