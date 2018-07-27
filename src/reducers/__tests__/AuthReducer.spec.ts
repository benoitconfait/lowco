import AuthReducer, { INITIAL_STATE, Token } from '../AuthReducer';
import {
  fetchAccessToken,
  displayLoginSreen,
  loginScreenDisplayed,
  fetchAccessTokenFulFilled,
  fetchAccessTokenError,
  refreshToken,
  refreshTokenFulFilled,
  refreshTokenError,
  redirectToLoginSreen
} from '../../actions/AuthAction';
import { Reducer } from 'redux-testkit';

describe('reducers/AuthReducer', () => {

  it('should set the login status', () => {
    const authUrl = 'http://10.0.2.2:5000/authorize';
    const authState = 'a-guid-value';
    const expectedResult = {
      ...INITIAL_STATE,
      isLoggedIn: false,
      token: null,
      authUrl: authUrl,
      authState: authState,
    };

    Reducer(AuthReducer).expect(displayLoginSreen({ authState: authState, authUrl: authUrl })).toReturnState(expectedResult);
  });


  it('should set the authState and authUrl (Reloading logine page flow)', () => {
    const authUrl = 'http://10.0.2.2:5000/authorize';
    const authState = 'a-guid-value';
    const expectedResult = {
      ...INITIAL_STATE,
      isLoggedIn: false,
      token: null,
      authUrl: authUrl,
      authState: authState,
      isAuthLoginPageDisplayed: false,
      reloadingLoginPage: true,
      authLoginPageReloadable: true
    };

    Reducer(AuthReducer).expect(redirectToLoginSreen({ authState: authState, authUrl: authUrl })).toReturnState(expectedResult);
  });


  it('should set the isAuthLoginPageDisplayed value to true', () => {

    const expectedResult = {
      ...INITIAL_STATE,
      isAuthLoginPageDisplayed: true,
      authLoginPageReloadable: true,
      loadingLoginPage: true
    };

    Reducer(AuthReducer).withState(INITIAL_STATE).expect(loginScreenDisplayed()).toReturnState(expectedResult);
  });

  it('should not change the state', () => {
    const authCode = 'fake_auth_code';
    Reducer(AuthReducer).withState(INITIAL_STATE).expect(fetchAccessToken(authCode)).toReturnState(INITIAL_STATE);
  });

  it('should set the user login status to true', () => {

    const expectedToken = {
      refreshToken: 'fake_refresh_token',
      accessToken: 'fake_access_token',
      expiresIn: 3000,
      tokenType: 'Bearer'
    };
    const expectedResult = {
      ...INITIAL_STATE,
      token: JSON.stringify(expectedToken),
      isLoggedIn: true
    };

    Reducer(AuthReducer).withState(INITIAL_STATE).expect(fetchAccessTokenFulFilled(expectedToken)).toReturnState(expectedResult);
  });

  it('should reset all fields except authUrl', () => {

    const authUrl = 'http://10.0.2.2:5000/authorize';

    const expectedToken = {
      refreshToken: 'fake_refresh_token',
      accessToken: 'fake_access_token',
      expiresIn: 3000,
      tokenType: 'Bearer'
    };

    const expectedResult = {
      ...INITIAL_STATE,
      token: null,
      isLoggedIn: false,
      authUrl: authUrl,
      isAuthLoginPageDisplayed: false
    };

    const initialState = {
      ...INITIAL_STATE,
      token: null,
      authUrl: authUrl,
      isLoggedIn: false,
      isAuthLoginPageDisplayed: true
    };

    Reducer(AuthReducer).withState(initialState).expect(fetchAccessTokenError({})).toReturnState(expectedResult);
  });

  // The refresh token should be silent for the user.
  // When the app is loggged in, it should stay in that state when refreshing token
  // The logged in status chenges only when the refresh token fails (401: refresh token expiry)
  it('should set refreshingToken to true', () => {

    const authUrl = 'http://10.0.2.2:5000/authorize';

    const initialToken = {
      refreshToken: 'fake_refresh_token',
      accessToken: 'fake_access_token',
      expiresIn: 3000,
      tokenType: 'Bearer'
    };

    const initialState = {
      ...INITIAL_STATE,
      token: JSON.stringify(initialToken),
      authUrl: authUrl,
      isLoggedIn: true,
      refreshingToken: false
    };

    const expectedResult = {
      ...initialState,
      refreshingToken: true
    };

    Reducer(AuthReducer).withState(initialState).expect(refreshToken(authUrl)).toReturnState(expectedResult);
  });

  it('should set the new tokens to the token state', () => {

    const authUrl = 'http://10.0.2.2:5000/authorize';

    const initialToken = {
      refreshToken: 'old_fake_refresh_token',
      accessToken: 'old_fake_access_token',
      expiresIn: 3000,
      tokenType: 'Bearer'
    };

    const refreshedToken = {
      ...initialToken,
      refreshToken: 'new_fake_refresh_token',
      accessToken: 'new_fake_access_token',
    };

    const initialState = {
      ...INITIAL_STATE,
      token: JSON.stringify(initialToken),
      authUrl: authUrl,
      isLoggedIn: true,
      refreshingToken: true
    };

    const expectedState = {
      ...initialState,
      token: JSON.stringify(refreshedToken),
      refreshingToken: false
    };

    Reducer(AuthReducer).withState(initialState).expect(refreshTokenFulFilled(refreshedToken)).toReturnState(expectedState);
  });

  it('should set loggedIn to false', () => {

    const authUrl = 'http://10.0.2.2:5000/authorize';

    const initialState = {
      ...INITIAL_STATE,
      token: null,
      authUrl: authUrl,
      isLoggedIn: true,
      refreshingToken: true
    };

    const expectedState = {
      ...INITIAL_STATE,
      forceCallApi: true
    };

    Reducer(AuthReducer).withState(initialState).expect(refreshTokenError({ error: 'refreh failed' })).toReturnState(expectedState);
  });

});