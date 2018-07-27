import React from 'react';
import { NetInfo, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import * as connectionInfoActions from '../actions/ConnectionInfoActions';
import WarningBanner from './common/WarningBanner';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import DeviceInfo from 'react-native-device-info';
import { buildLogData } from '../helpers/errorHelper';
import { logError } from '../actions/errorActions';

const reportError = (error: any) => {
  const logData = buildLogData(error, DeviceInfo);

  if (logData) {
    logError(logData);
  }

  console.log(error);
};

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    reportError(e);
    Alert.alert(
      `Une erreur inattendue s'est produite`,
      `Veuillez fermer l'application et recommencer!`,
      [{
        text: 'Recharger',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  } else {
    console.log(e);
  }
};

type ConnectedState = {
};

type ConnectedDispatch = {
  setConnectionInfo: (connectionInfo) => void;
};

interface Props {
  setConnectionInfo: (connectionInfo) => void;
  children: any;
}

interface State {
}

export class ErrorHandler extends React.Component<Props, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {};
    this.props = props;
  }

  handleConnectivityChange(connectionInfo) {
    this.props.setConnectionInfo(connectionInfo);
  }

  componentWillMount() {
    setJSExceptionHandler(errorHandler, true);
    setNativeExceptionHandler((exceptionString) => {
      reportError(exceptionString);
    });
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.props.setConnectionInfo(connectionInfo);
    });
    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectivityChange.bind(this)
    );

  }

  componentDidCatch(error: any) {
    reportError(error);
  }

  render() {

    const { children } = this.props;

    return <View style={styles.content}>
      {children}
    </View>;
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  setConnectionInfo: (connectionInfo) => dispatch(connectionInfoActions.setConnectionInfo(connectionInfo))
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);