import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import * as vodUsageActions from '../../../../actions/VodUsageActions';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { COLOR_GRAY_20 } from '../../../../styles/commonStyles';
import Models = VOO.Mobile.App.Models;
import VodMonthUsage from './VodMonthUsage';
import MyScrollView from '../../../common/MyScrollView';

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  vodMonthlyUsages: Models.VodMonthlyUsage[];
}

type ConnectedDispatch = {
  fetchVodUsage: () => void;
}

interface Props {
  fetchVodUsage: () => void;
  vodMonthlyUsages: Models.VodMonthlyUsage[];
  loading: boolean;
  offline: boolean;
  error: any;
}

interface State {
  refreshing: boolean;
}

export class Vod extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentWillMount() {
    this.props.fetchVodUsage();
  }

  onRefresh() {
    this.props.fetchVodUsage();
  }

  render() {
    const {
      vodMonthlyUsages,
      loading,
      offline,
      error
    } = this.props;

    const noData = !vodMonthlyUsages || vodMonthlyUsages.length === 0;

    return (
      <MyScrollView
        noData={noData}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText="Vous n'avez pas de consommation VOD."
      >
        {vodMonthlyUsages.map((monthlyUsage, index) => <VodMonthUsage key={`monthUsage-${index}`} monthUsage={monthlyUsage} />)}
      </MyScrollView>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  fetchVodUsage: () => dispatch(vodUsageActions.fetchVodUsage())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.vodUsage.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.vodUsage.error,
    vodMonthlyUsages: state.vodUsage.vodMonthlyUsages ?
      state.vodUsage.vodMonthlyUsages : []
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vod);
