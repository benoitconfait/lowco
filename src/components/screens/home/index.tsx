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
import Models = Lowco.Models;

type ConnectedState = {
  loading: boolean;
  offline: boolean;
  error: any;
}

type ConnectedDispatch = {

}

interface Props {
  loading: boolean;
  offline: boolean;
  error: any;
  navigation: any
}

interface State {
  refreshing: boolean;
}

export class Home extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentDidMount() {
  }

  onRefresh() {
  }

  render() {
    const {
      loading,
      offline,
      error,
      navigation } = this.props;


    return (
      <MyScrollView
        noData={false}
        loading={loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        offline={offline}
        error={error}
        noDataNoErrorText="Vous n'avez pas de consommation ce mois-ci."
      >
        <View>
          <Text>salut </Text>
        </View>
      </MyScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({

});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    loading: false,
    offline: false,
    error: ''
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
