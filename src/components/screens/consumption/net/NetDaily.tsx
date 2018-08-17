import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import InternetConsumption from '../../summary/InternetConsumption';
import CurrentPeriod from '../../summary/CurrentPeriod';
import * as customerActions from '../../../../actions/CustomerActions';
import * as addressActions from '../../../../actions/AddressActions';
import * as internetUsageActions from '../../../../actions/InternetUsageActions';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { COLOR_GRAY_20 } from '../../../../styles/commonStyles';
import Models = Lowco.Models;
import BarChart from '../../../common/charts/BarChart';
import { scale } from '../../../../helpers/scaleHelper';
import MyScrollView from '../../../common/MyScrollView';

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  internetUsages: Array<Models.NetMonthlyUsage>;
  selectedPodId: string | null;
}

type ConnectedDispatch = {
  fetchInternetUsage: () => void;
  setSelectedPodId: (value) => void;
}

interface Props {
  fetchInternetUsage: () => void;
  setSelectedPodId: (value) => void;
  internetUsages: Array<Models.NetMonthlyUsage>;
  loading: boolean;
  offline: boolean;
  error: any;
  selectedPodId: string | null;
  navigation: any
}

interface State {
  refreshing: boolean;
}

class NetDaily extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentWillMount() {
    this.props.fetchInternetUsage();
  }

  onRefresh() {
    this.props.fetchInternetUsage();
  }

  render() {
    const {
      internetUsages,
      loading,
      offline,
      error,
      selectedPodId,
      setSelectedPodId,
      navigation } = this.props;

    const internetUsage = selectedPodId && internetUsages && internetUsages[selectedPodId];

    const noData = !internetUsage;

    return (
      <MyScrollView
        noData={noData}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText="Vous n'avez pas de consommation internet ce mois-ci."
      >
        <InternetConsumption
          style={{ marginTop: scale(10) }}
          showSectionHeader={false}
          showCardHeader={false}
          navigation={navigation}
          usages={internetUsages}
          addresses={null}
          selectedPodId={selectedPodId}
          onAddressChange={setSelectedPodId}
          linkToLandingScreen={false}
        />

        <BarChart
          style={{ marginTop: scale(20) }}
          navigation={navigation}
          usage={internetUsage}
          selectedPodId={selectedPodId}
          yearlyUsagesForPod={null}
          showDailyChart={true}
        />
        <CurrentPeriod style={{ marginTop: scale(20) }} />
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
  fetchInternetUsage: () => dispatch(internetUsageActions.fetchInternetUsage()),
  setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.internetUsage.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.internetUsage.error,
    internetUsages: state.internetUsage.internetUsages ?
      state.internetUsage.internetUsages : [],
    selectedPodId: state.addresses ? state.addresses.selectedPodId : null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetDaily);
