import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  AppState,
  Image
} from 'react-native';
import SafariView from 'react-native-safari-view';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { Dispatch } from 'redux';
import {
  fetchAccessToken,
  loginScreenDisplayed,
  userCancelledLogin,
  redirectToLoginSreen
} from '../actions/AuthAction';
import ErrorScreen from './screens/error';
import { APP_RUNNING_STATE } from '../actionTypes/appStateActionTypes';

import {
  appActive,
  appBackground,
  appInactive
} from '../actions/AppStateActions';
import { fetchCustomer } from '../actions/CustomerActions';
import { generateAuthState, buildAtesLoginUrl } from '../helpers/authHelper';
import { LoginPayload } from '../actionTypes/authActionTypes';

type ConnectedState = {
  isAuthLoginPageDisplayed: boolean;
  loadingLoginPage: boolean;
  isLoggedIn: boolean;
  authUrl: string | null;
  authState: string | null;
  currentState: APP_RUNNING_STATE;
  previousState: APP_RUNNING_STATE;
  authLoginPageReloadable: boolean;
};

type ConnectedDispatch = {
  fetchAccessToken: (authorizationCode: string) => void;
  fetchCustomer: () => void;
  loginScreenDisplayed: () => void;
  appActive: () => void;
  appBackground: () => void;
  appInactive: () => void;
  userCancelledLogin: (loginArgs: LoginPayload) => void;
  redirectToLoginSreen: (loginArgs: LoginPayload) => void;
};

interface Props {
  fetchAccessToken: (authorizationCode: string) => void;
  loginScreenDisplayed: () => void;
  userCancelledLogin: () => void;
  appActive: () => void;
  appBackground: () => void;
  appInactive: () => void;
  fetchCustomer: () => void;
  redirectToLoginSreen: (loginArgs: LoginPayload) => void;
  children: any;
  isAuthLoginPageDisplayed: boolean;
  loadingLoginPage: boolean;
  isLoggedIn: boolean;
  authUrl: string | null;
  currentState: APP_RUNNING_STATE;
  previousState: APP_RUNNING_STATE;
  authLoginPageReloadable: boolean;
  authState: string | null;
}
interface State { }
export class Authorize extends React.Component<Props, State> {

  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  componentDidMount() {
    // Add event listener to handle lowco:// URLs
    Linking.addEventListener('url', this._handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then(url => {
      if (url) {
        this._handleOpenURL({ url });
      }
    });

    AppState.addEventListener('change', this._handleAppStateChange);

    // When the user exits the app while login was cancelled
    // (due to a pop navigation) then trigger a 401 error (by calling GET /customer)
    // to allow the redirection to the login page wen the app is reloaded.
    this.props.fetchCustomer();
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this._handleOpenURL);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _loginCancelledByUser = (): boolean => {
    const result = this.props.isAuthLoginPageDisplayed
      && this.props.authLoginPageReloadable
      && this.props.currentState === APP_RUNNING_STATE.ACTIVE
      && this.props.previousState === APP_RUNNING_STATE.BACKGROUND;
    return result;
  }

  _handleAppStateChange = appState => {
    switch (appState) {
      case APP_RUNNING_STATE.ACTIVE:
        this.props.appActive();
        if (this._loginCancelledByUser()) {
          this.props.userCancelledLogin();
        }
        break;
      case APP_RUNNING_STATE.INACTIVE:
        this.props.appInactive();
        break;
      case APP_RUNNING_STATE.BACKGROUND:
        this.props.appBackground();
        break;
    }
  }

  _parseCallbackParams = data => {
    const params = data.split('&state=');

    return {
      code: params[0],
      state: params[1]
    };
  }

  _handleOpenURL = ({ url }) => {
    // Extract ates authorizaton code from response url
    const [, code] = url.match(/code=([^#]+)/);

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }

    const params = this._parseCallbackParams(code);

    if (this._isValidAuthState(params.state)) {
      this.props.fetchAccessToken(params.code);
    } else {
      const authState = generateAuthState();
      const atesLoginUrl = buildAtesLoginUrl(this.props.authUrl as string, authState);
      this.props.redirectToLoginSreen({ authState: authState, authUrl: atesLoginUrl });
    }
  }

  // (RFC-6819) Validating the state see: https://tools.ietf.org/html/rfc6819#section-5.3.5
  _isValidAuthState(state: string): boolean {
    const valid = this.props.authState === state;
    return valid;
  }

  // Open URL in a browser
  _openURL = url => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true
      });
    } else {
      // Or Linking.openURL on Android
      Linking.openURL(url);
    }
  }

  render() {

    // When the loging is cancelled by the user and the app is still active
    // then display the home page so that protected api requests
    // are done and then a 401 request is returned by the api.
    // This allow reloading the login page automatically.
    // Because the pop navigation does'nt re-render
    if (this.props.isLoggedIn || this._loginCancelledByUser()) {
      return (<View style={styles.container}>
        {this.props.children}
      </View>);
    }
    else {
      this._openWebBrowser();
      return (<View style={[styles.container, styles.centerContents]}>
        <Image resizeMode='contain' style={styles.image} source={require('../../assets/img/loader_techno.gif')} />
      </View>);
    }
  }

  _openWebBrowser = () => {
    if (!this.props.isAuthLoginPageDisplayed
      && this.props.authUrl) {
      this._openURL(this.props.authUrl);
      this.props.loginScreenDisplayed();
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  fetchAccessToken: (authorizationCode: string) =>
    dispatch(fetchAccessToken(authorizationCode)),
  loginScreenDisplayed: () => dispatch(loginScreenDisplayed()),
  appBackground: () => dispatch(appBackground()),
  appActive: () => dispatch(appActive()),
  appInactive: () => dispatch(appInactive()),
  userCancelledLogin: () => dispatch(userCancelledLogin()),
  fetchCustomer: () => dispatch(fetchCustomer()),
  redirectToLoginSreen: (loginArgs: LoginPayload) => dispatch(redirectToLoginSreen(loginArgs)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
    isAuthLoginPageDisplayed: state.auth.isAuthLoginPageDisplayed,
    isLoggedIn: state.auth.isLoggedIn,
    authUrl: state.auth.authUrl,
    currentState: state.appState.current,
    previousState: state.appState.previous,
    authLoginPageReloadable: state.auth.authLoginPageReloadable,
    loadingLoginPage: state.auth.loadingLoginPage,
    authState: state.auth.authState
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  centerContents: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 75
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
