import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { COLOR_GRAY_20, COLOR_GRAY_40, COLOR_ERROR, COLOR_PRIMARY } from '../../../../styles/commonStyles';
import { List } from 'react-native-elements';
import MyListItem from '../../../common/MyListItem';
import MobileConsumption from '../../summary/MobileConsumption';
import EuropeConsumption from './EuropeConsumption';
import * as mobileSubscriptionsActions from '../../../../actions/MobileSubscriptionsActions';
import * as mobileUsageActions from '../../../../actions/MobileUsageActions';
import * as paymentBalanceActions from '../../../../actions/PaymentBalanceActions';
import { scale } from '../../../../helpers/scaleHelper';
import CurrentPeriod from '../../summary/CurrentPeriod';
import numeral from '../../../../helpers/numberFormatter';
import MyScrollView from '../../../common/MyScrollView';

import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import Models = Lowco.Models;

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  mobileSubscriptions: Array<Models.MobileSubscription>;
  selectedMSISDN: number | null;
  totalBalance: number | null;
  callDetailRecordsHistory: Models.CallDetailRecordsHistory | null;
}

type ConnectedDispatch = {
  fetchMobileSubscriptions: () => void;
  fetchMobileCDR: () => void;
  fetchPaymentBalance: () => void;
  setSelectedMSISDN: (value) => void;
}

interface Props {
  loading: boolean;
  offline: boolean;
  error: any;
  navigation: any
  fetchMobileSubscriptions: () => void;
  fetchMobileCDR: () => void;
  fetchPaymentBalance: () => void;
  setSelectedMSISDN: (value) => void;
  mobileSubscriptions: Array<Models.MobileSubscription>;
  callDetailRecordsHistory: Models.CallDetailRecordsHistory;
  totalBalance: number;
  selectedMSISDN: number | null;
}

interface State {
  refreshing: boolean;
}

export class Mobile extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentWillMount() {
    this.props.fetchPaymentBalance();
    this.props.fetchMobileSubscriptions();
    this.props.fetchMobileCDR();
  }

  onRefresh() {
    this.props.fetchPaymentBalance();
    this.props.fetchMobileSubscriptions();
    this.props.fetchMobileCDR();
  }

  render() {
    const {
      mobileSubscriptions,
      callDetailRecordsHistory,
      loading,
      offline,
      error,
      totalBalance,
      selectedMSISDN,
      setSelectedMSISDN,
      navigation } = this.props;

    let subscription: Models.MobileSubscription | null = null;

    if (mobileSubscriptions && selectedMSISDN) {
      subscription = mobileSubscriptions[selectedMSISDN];
    }

    const outOfBundleUsageCost = callDetailRecordsHistory &&
      callDetailRecordsHistory.summary &&
      callDetailRecordsHistory.summary.outOfBundleUsage &&
      callDetailRecordsHistory.summary.outOfBundleUsage.cost ?
      `${numeral(callDetailRecordsHistory.summary.outOfBundleUsage.cost).format()}€` : ' ';

    const totalBalanceFormatted = totalBalance ? `${numeral(totalBalance).format()}€` : ' ';

    const noData = (!mobileSubscriptions || Object.keys(mobileSubscriptions).length === 0);

    return (
      <MyScrollView
        noData={noData}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText="Vous n'avez pas de consommation mobile ce mois-ci."
      >
        <View>
          <MobileConsumption
            style={{ marginTop: scale(7) }}
            linkToLandingScreen={false}
            showSectionHeader={false}
            showCardHeader={true}
            navigation={navigation}
            subscriptions={mobileSubscriptions}
            selectedMSISDN={selectedMSISDN}
            onMobileChange={setSelectedMSISDN}
          />
          {subscription && subscription.usage && subscription.usage.europe ? <EuropeConsumption europeUsage={subscription.usage.europe} /> : null}
          <List containerStyle={{ marginTop: scale(43), marginBottom: scale(5), borderTopColor: COLOR_GRAY_40 }}>
            <MyListItem
              transparent={true}
              key="MobileOutOfBundle"
              title="Hors-Forfait"
              rightTitle={outOfBundleUsageCost}
              rightTitleStyle={styles.outOfBundleUsage}
              onPress={() => navigation.navigate('MobileOutOfBundle')}
            />
            <MyListItem
              transparent={true}
              key="MobileDetailedConsumption"
              title="Consommation détaillée"
              onPress={() => navigation.navigate('MobileDetailedConsumption')}
            />
            {/* 
            APPVOOMOB-179 - remove "invoice estimate link" (meeting feedback Feb 27th 2018)
            <MyListItem
              transparent={true}
              key="Invoice"
              title="Facture provisoire"
              rightTitle={totalBalanceFormatted}
              rightTitleStyle={styles.invoiceEstimate}
              onPress={() => navigation.navigate('Invoice')}
            /> */}
          </List>
          <CurrentPeriod style={{ marginTop: scale(20) }} />
        </View>
      </MyScrollView>
    );
  }
}

const styles = StyleSheet.create({
  outOfBundleUsage: {
    color: COLOR_ERROR
  },
  invoiceEstimate: {
    color: COLOR_PRIMARY
  }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  fetchMobileSubscriptions: () => dispatch(mobileSubscriptionsActions.fetchMobileSubscriptions()),
  fetchPaymentBalance: () => dispatch(paymentBalanceActions.fetchPaymentBalance()),
  fetchMobileCDR: () => dispatch(mobileUsageActions.fetchMobileCDR()),
  setSelectedMSISDN: (value) => dispatch(mobileSubscriptionsActions.setSelectedMSISDN(value))
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.mobileSubscriptions.loading || state.paymentBalance.loading || state.mobileCDR.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.mobileSubscriptions.error || state.paymentBalance.error || state.mobileCDR.error,
    mobileSubscriptions: state.mobileSubscriptions.mobileSubscriptions ?
      state.mobileSubscriptions.mobileSubscriptions : [],
    totalBalance: state.paymentBalance ? state.paymentBalance.totalBalance : null,
    selectedMSISDN: state.mobileSubscriptions ? state.mobileSubscriptions.selectedMSISDN : null,
    callDetailRecordsHistory: state.mobileCDR.callDetailRecordsHistory ?
      state.mobileCDR.callDetailRecordsHistory : null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mobile);
