import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { COLOR_GRAY_20 } from '../../../styles/commonStyles';
import Header from '../../common/Header';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';
import { Dispatch } from 'redux';
import * as actions from '../../../actions/errorActions';
import { scale } from '../../../helpers/scaleHelper';

type ConnectedState = {
}

type ConnectedDispatch = {
  throwHttp401Error: () => void;
  throwGeneralError: () => void;
  throwNoWifiError: () => void;
}

interface Props {
  throwHttp401Error: () => void;
  throwGeneralError: () => void;
  throwNoWifiError: () => void;
}

interface State {

}

export class Temp extends React.Component<ConnectedState & ConnectedDispatch, State> {

  _throwHttp401Error() {
    console.log('401');
    this.props.throwHttp401Error();
  }

  _throwGeneralError() {
    console.log('general');
    this.props.throwGeneralError();
  }

  _throwNoWifiError() {
    console.log('no wifi');
    this.props.throwNoWifiError();
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.buttonsWrapper}>
          <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={styles.button} onPress={this._throwHttp401Error.bind(this)}>
            <Text style={styles.buttonText}>401</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={styles.button} onPress={this._throwGeneralError.bind(this)}>
            <Text style={styles.buttonText}>500</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={styles.button} onPress={this._throwNoWifiError.bind(this)}>
            <Text style={styles.buttonText}>No Wifi</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  throwHttp401Error: () => dispatch(actions.throwHttp401Error()),
  throwGeneralError: () => dispatch(actions.throwGeneralError()),
  throwNoWifiError: () => dispatch(actions.throwNoWifiError())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    marginRight: scale(5),
    marginTop: scale(5),
    backgroundColor: '#000000'
  },
  buttonText: {
    color: '#ffffff'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Temp);
