import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { COLOR_GRAY_20, COLOR_GRAY_100 } from '../../../styles/commonStyles';
import * as paymentBalanceActions from '../../../actions/PaymentBalanceActions';
import * as invoicesActions from '../../../actions/InvoicesActions';
import Header from '../../common/Header';
import InvoiceEstimate from '../summary/InvoiceEstimate';
import InvoicesSummary from './InvoicesSummary';
import Invoices from './Invoices';
import { scale } from '../../../helpers/scaleHelper';
import { RootState } from '../../../reducers';
import { Card } from '../../common/card';
import MyScrollView from '../../common/MyScrollView';
import Models = VOO.Mobile.App.Models;

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
  totalBalance: number | null;
  totalPack: number | null;
  totalMobile: number | null;
  totalTelevision: number | null;
  invoices: Models.Invoice[] | null;
  token: any;
};

type ConnectedDispatch = {
  fetchPaymentBalance: () => void;
  fetchInvoices: () => void;
  downloadInvoice: (key: string) => void;
};

interface Props {
  fetchPaymentBalance: () => void;
  fetchInvoices: () => void;
  downloadInvoice: (key: string) => void;
  totalBalance: number;
  totalPack: number;
  totalMobile: number;
  totalTelevision: number;
  invoices: Models.Invoice[];
  token: any,
  loading: boolean;
  offline: boolean;
  error: any;
  navigation: any
}

interface State {
  refreshing: boolean;
}

export class Invoice extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }


  downloadInvoices = (url) => {

    this.props.downloadInvoice(url);

  }

  componentDidMount() {
    this.props.fetchPaymentBalance();
    this.props.fetchInvoices();
  }

  onRefresh() {
    this.props.fetchPaymentBalance();
    this.props.fetchInvoices();
  }

  render() {
    const {
      totalBalance,
      totalPack,
      totalMobile,
      totalTelevision,
      invoices,
      token,
      loading,
      offline,
      error,
      navigation } = this.props;

    const noData = !invoices && totalBalance === null;

    return (
      <MyScrollView
        noData={noData}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText='Pas de factures'
      >
        <InvoiceEstimate showSectionHeader={false} style={{ marginTop: scale(8) }} navigation={navigation} totalBalance={totalBalance} />
        <InvoicesSummary style={{ marginTop: scale(24) }} totalBalance={totalBalance} totalPack={totalPack} totalMobile={totalMobile} totalTelevision={totalTelevision} />
        <Invoices style={{ marginTop: scale(47) }} invoices={invoices} token={token} downloadInvoice={this.downloadInvoices} />
        <View style={styles.bottomNote}>
          <Text style={styles.regularText}>Comptez un délai de <Text style={styles.boldText}>1 à 5 jours ouvrables</Text> entre votre paiement et la réception de celui-ci sur notre compte.</Text>
        </View>
      </MyScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bottomNote: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(27),
    paddingVertical: scale(24),
  },
  boldText: {
    fontWeight: 'bold'
  },
  regularText: {
    alignItems: 'center',
    fontSize: scale(10),
    color: COLOR_GRAY_100,
    marginTop: scale(5)
  }
});



const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  fetchPaymentBalance: () => dispatch(paymentBalanceActions.fetchPaymentBalance()),
  fetchInvoices: () => dispatch(invoicesActions.fetchInvoices()),
  downloadInvoice: (key: string) => dispatch(invoicesActions.downloadInvoice(key)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: state.paymentBalance.loading || state.invoices.loading,
    offline: state.connectionInfo && state.connectionInfo.offline,
    error: state.paymentBalance.error || state.invoices.error,
    totalBalance: state.paymentBalance ? state.paymentBalance.totalBalance : null,
    totalPack: state.paymentBalance ? state.paymentBalance.totalPack : null,
    totalMobile: state.paymentBalance ? state.paymentBalance.totalMobile : null,
    totalTelevision: state.paymentBalance ? state.paymentBalance.totalTelevision : null,
    invoices: state.invoices ? state.invoices.invoices : null,
    token: state.auth ? state.auth.token : null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
