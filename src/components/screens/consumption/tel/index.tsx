import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { COLOR_GRAY_20 } from '../../../../styles/commonStyles';
import TelConsumption from './TelConsumption';

import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import Models =  VOO.Mobile.App.Models;

type ConnectedState = {
}

type ConnectedDispatch = {

}

interface Props {
  navigation: any;
}

interface State {
  refreshing: boolean;
}

export class Tel extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state : State;
  props : Props;
  
  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { refreshing: false };
    this.props = props;
  }

  componentWillMount() {

  }

  onRefresh() {

  }

  render() {
    return (
      <TelConsumption navigation={this.props.navigation} />
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLOR_GRAY_20
  }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tel);
