import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import InternetConsumption from '../../summary/InternetConsumption';
import CurrentPeriod from '../../summary/CurrentPeriod';
import * as customerActions from '../../../../actions/CustomerActions';
import * as addressActions from '../../../../actions/AddressActions';
import * as internetYearlyUsageActions from '../../../../actions/InternetYearlyUsageActions';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { COLOR_GRAY_20 } from '../../../../styles/commonStyles';
import Models = Lowco.Models;
import BarChart from '../../../common/charts/BarChart';
import MyScrollView from '../../../common/MyScrollView';

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  internetYearlyUsages: Models.NetMonthlyUsage[] | null;
  selectedPodId: string | null;
}

type ConnectedDispatch = {
  fetchInternetYearlyUsage: () => void;
  setSelectedPodId: (value) => void;
}

interface Props {
  fetchInternetYearlyUsage: () => void;
  setSelectedPodId: (value) => void;
  internetYearlyUsages: Array<Models.NetMonthlyUsage>;
  loading: boolean;
  offline: boolean;
  error: any;
  selectedPodId: string | null;
  navigation: any
}

interface State {
  refreshing: boolean;
}

class NetMonthly extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentWillMount() {
    this.props.fetchInternetYearlyUsage();
  }

  onRefresh() {
    this.props.fetchInternetYearlyUsage();
  }

  render() {
    const {
      internetYearlyUsages,
      loading,
      offline,
      error,
      selectedPodId,
      setSelectedPodId,
      navigation } = this.props;

    const yearlyUsagesForPod = selectedPodId && internetYearlyUsages && internetYearlyUsages.filter(x => x.connectionId === selectedPodId);
    const noData = !yearlyUsagesForPod || yearlyUsagesForPod.length === 0;

    return (
      <MyScrollView
        noData={noData}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText="Vous n'avez pas de consommation internet."
      >
        <BarChart
          style={{ marginTop: 10 }}
          navigation={navigation}
          usage={null}
          yearlyUsagesForPod={yearlyUsagesForPod}
          selectedPodId={selectedPodId}
          showMonthlyChart={true}
        />
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
  fetchInternetYearlyUsage: () => dispatch(internetYearlyUsageActions.fetchInternetYearlyUsage()),
  setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.internetYearlyUsage.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.internetYearlyUsage.error,
    internetYearlyUsages: state.internetYearlyUsage ?
      state.internetYearlyUsage.internetYearlyUsages : [],
    selectedPodId: state.addresses ? state.addresses.selectedPodId : null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetMonthly);
