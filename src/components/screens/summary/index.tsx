import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as customerActions from '../../../actions/CustomerActions';
import * as addressActions from '../../../actions/AddressActions';
import * as internetUsageActions from '../../../actions/InternetUsageActions';
import * as mobileSubscriptionsActions from '../../../actions/MobileSubscriptionsActions';
import * as paymentBalanceActions from '../../../actions/PaymentBalanceActions';
import Header from '../../common/Header';
import MyScrollView from '../../common/MyScrollView';
import InternetConsumption from './InternetConsumption';
import MobileConsumption from './MobileConsumption';
import InvoiceEstimate from './InvoiceEstimate';
import CurrentPeriod from './CurrentPeriod';
import { scale } from '../../../helpers/scaleHelper';
import { RootState } from '../../../reducers';
import Models = VOO.Mobile.App.Models;

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  usageAddresses: Array<Models.Address> | null;
  internetUsages: any;
  mobileSubscriptions: Array<Models.MobileSubscription>;
  totalBalance: number | null;
  selectedPodId: string | null;
  selectedMSISDN: number | null;
}

type ConnectedDispatch = {
  fetchCustomer: () => void;
  fetchInternetUsage: () => void;
  fetchMobileSubscriptions: () => void;
  fetchPaymentBalance: () => void;
  setSelectedPodId: (value) => void;
  setSelectedMSISDN: (value) => void;
}

interface Props {
  fetchCustomer: () => void;
  fetchInternetUsage: () => void;
  fetchMobileSubscriptions: () => void;
  fetchPaymentBalance: () => void;
  setSelectedPodId: (value) => void;
  setSelectedMSISDN: (value) => void;
  usageAddresses: Array<Models.Address>;
  internetUsages: any;
  mobileSubscriptions: Array<Models.MobileSubscription>;
  totalBalance: number;
  loading: boolean;
  offline: boolean;
  error: any;
  selectedPodId: string | null;
  selectedMSISDN: number | null;
  navigation: any
}

interface State {
  refreshing: boolean;
}

export class Summary extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentDidMount() {
    this.props.fetchCustomer();
    this.props.fetchInternetUsage();
    this.props.fetchMobileSubscriptions();
    this.props.fetchPaymentBalance();
  }

  onRefresh() {
    this.props.fetchCustomer();
    this.props.fetchInternetUsage();
    this.props.fetchMobileSubscriptions();
    this.props.fetchPaymentBalance();
  }

  render() {
    const {
      usageAddresses,
      internetUsages,
      mobileSubscriptions,
      totalBalance,
      loading,
      offline,
      error,
      selectedPodId,
      setSelectedPodId,
      selectedMSISDN,
      setSelectedMSISDN,
      navigation } = this.props;

    const noData = (!usageAddresses || usageAddresses.length === 0 || !internetUsages || Object.keys(internetUsages).length === 0) &&
      (!mobileSubscriptions || Object.keys(mobileSubscriptions).length === 0) &&
      totalBalance === null;

    const showInternetConsumption = internetUsages && Object.keys(internetUsages).length > 0 &&
      usageAddresses && usageAddresses.length > 0;

    return (
      <MyScrollView
        noData={noData}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText="Vous n'avez pas de consommation ce mois-ci."
      >
        <View>
          {showInternetConsumption ?
            <InternetConsumption
              style={{ marginTop: scale(20), marginBottom: scale(30) }}
              showSectionHeader={true}
              showCardHeader={false}
              navigation={navigation}
              usages={internetUsages}
              addresses={usageAddresses}
              selectedPodId={selectedPodId}
              onAddressChange={setSelectedPodId}
              linkToLandingScreen={true}
            /> : null}
          <MobileConsumption
            style={{ marginBottom: scale(35) }}
            linkToLandingScreen={true}
            showCardHeader={false}
            showSectionHeader={true}
            navigation={navigation}
            subscriptions={mobileSubscriptions}
            selectedMSISDN={selectedMSISDN}
            onMobileChange={setSelectedMSISDN}
          />
          <InvoiceEstimate showSectionHeader={true} style={{ marginBottom: scale(20) }} navigation={navigation} totalBalance={totalBalance} />
          <CurrentPeriod />
        </View>
      </MyScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  fetchCustomer: () => dispatch(customerActions.fetchCustomer()),
  fetchInternetUsage: () => dispatch(internetUsageActions.fetchInternetUsage()),
  fetchMobileSubscriptions: () => dispatch(mobileSubscriptionsActions.fetchMobileSubscriptions()),
  fetchPaymentBalance: () => dispatch(paymentBalanceActions.fetchPaymentBalance()),
  setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
  setSelectedMSISDN: (value) => dispatch(mobileSubscriptionsActions.setSelectedMSISDN(value))
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.addresses.loading || state.internetUsage.loading || state.mobileSubscriptions.loading || state.paymentBalance.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.addresses.error || state.internetUsage.error || state.mobileSubscriptions.error || state.paymentBalance.error,
    usageAddresses: state.addresses ? state.addresses.usageAddresses : null,
    internetUsages: state.internetUsage.internetUsages ?
      state.internetUsage.internetUsages : {},
    mobileSubscriptions: state.mobileSubscriptions.mobileSubscriptions ?
      state.mobileSubscriptions.mobileSubscriptions : [],
    totalBalance: state.paymentBalance ? state.paymentBalance.totalBalance : null,
    selectedPodId: state.addresses ? state.addresses.selectedPodId : null,
    selectedMSISDN: state.mobileSubscriptions ? state.mobileSubscriptions.selectedMSISDN : null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
