import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { List } from 'react-native-elements';
import MyListItem from '../../../common/MyListItem';
import ErrorScreen from '../../../screens/error';
import InternetConsumption from '../../summary/InternetConsumption';
import CurrentPeriod from '../../summary/CurrentPeriod';
import * as customerActions from '../../../../actions/CustomerActions';
import * as addressActions from '../../../../actions/AddressActions';
import * as internetUsageActions from '../../../../actions/InternetUsageActions';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { COLOR_GRAY_20, COLOR_GRAY_40 } from '../../../../styles/commonStyles';
import { scale } from '../../../../helpers/scaleHelper';
import MyScrollView from '../../../common/MyScrollView';
import Models = VOO.Mobile.App.Models;

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  usageAddresses: Array<Models.Address> | null;
  internetUsages: Array<Models.NetMonthlyUsage>;
  selectedPodId: string | null;
}

type ConnectedDispatch = {
  fetchCustomer: () => void;
  fetchInternetUsage: () => void;
  setSelectedPodId: (value) => void;
}

interface Props {
  fetchCustomer: () => void;
  fetchInternetUsage: () => void;
  setSelectedPodId: (value) => void;
  usageAddresses: Array<Models.Address>;
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

export class NetConsumption extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentWillMount() {
    this.props.fetchCustomer();
    this.props.fetchInternetUsage();
  }

  onRefresh() {
    this.props.fetchCustomer();
    this.props.fetchInternetUsage();
  }

  render() {
    const {
      usageAddresses,
      internetUsages,
      loading,
      offline,
      error,
      selectedPodId,
      setSelectedPodId,
      navigation } = this.props;

    const noData = !usageAddresses || usageAddresses.length === 0 || !internetUsages || internetUsages.length === 0;

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
          style={{ marginTop: scale(7), marginBottom: scale(16.5) }}
          showSectionHeader={false}
          showCardHeader={true}
          navigation={navigation}
          usages={internetUsages}
          addresses={usageAddresses}
          selectedPodId={selectedPodId}
          onAddressChange={setSelectedPodId}
          linkToLandingScreen={false}
        />
        <List containerStyle={{ marginBottom: scale(0), borderTopColor: COLOR_GRAY_40 }}>
          <MyListItem
            key={1}
            transparent={true}
            title="Consommation détaillée"
            onPress={() => navigation.navigate('NetDetailedConsumption')}
          />
        </List>
        <CurrentPeriod style={{ marginTop: scale(0) }} />
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
  fetchCustomer: () => dispatch(customerActions.fetchCustomer()),
  fetchInternetUsage: () => dispatch(internetUsageActions.fetchInternetUsage()),
  setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.customer.loading || state.internetUsage.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.customer.error || state.internetUsage.error,
    usageAddresses: state.addresses ? state.addresses.usageAddresses : null,
    internetUsages: state.internetUsage.internetUsages ?
      state.internetUsage.internetUsages : [],
    selectedPodId: state.addresses ? state.addresses.selectedPodId : null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetConsumption);
