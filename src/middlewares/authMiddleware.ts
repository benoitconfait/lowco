import * as actions from '../actions/AuthAction';
import * as customerActions from '../actions/CustomerActions';
import { AuthActionTypes, LoginPayload } from '../actionTypes/authActionTypes';
import { buildAtesLoginUrl, generateAuthState } from '../helpers/authHelper';
import config from '../config';
import { AppStateActionTypes } from '../actionTypes/appStateActionTypes';
import { Token } from '../reducers/AuthReducer';
import { RootState } from '../reducers';
import { fetchCustomer } from '../actions/CustomerActions';
const ERROR = '_ERROR';

// This middleware orchestrates the login flow and the the refresh token.
// It handles all 401 errors and manage the login flow by refreshing the token
// when a refresh token is present in the local (and secured) storage or
// by redirecting to the ates login page.
export default store => next => action => {
    const dispatch = store.dispatch;
    const state = store.getState();

    if (config.auth.loginEnabled) {
        handleUnauthorizedError(action, state, dispatch);
        handleLoginFailedError(action, state, dispatch);
    }

    return next(action);
};

const handleUnauthorizedError = (action: any, state: any, dispatch: any) => {

    if (action.type.indexOf(ERROR) > -1 && action.payload) {
        const error = action.payload;
        const httpStatus = (error.xhr) ? error.xhr.status : 500;

        if (httpStatus === 401) {
            const authUrl = error.xhr.getResponseHeader('location');
            refreshTokenOrDislpayLoginPage(authUrl, state, dispatch);
        }
    }
};

const handleLoginFailedError = (action: any, state: RootState, dispatch: any) => {
    if (action.type === AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR
        || action.type === AuthActionTypes.REFRESH_TOKEN_ERROR) {
        dispatch(actions.logout());
        dispatch(fetchCustomer());
    }
};

const notLoginOrRefreshing = (state: any): boolean => {
    return !state.auth.isAuthLoginPageDisplayed
        && !state.auth.refreshingToken
        && !state.auth.reloadingLoginPage;
};

const refreshTokenOrDislpayLoginPage = (authUrl: string, state: RootState, dispatch: any): void => {

    const token = state.auth.token ? JSON.parse(state.auth.token) : null;

    // if a refresh_token is present in the auth state
    // refresh the access_token with it.
    // else display the login page if needed (When a login via ates is on going
    // don't display the browser again)
    if (token && token.refreshToken && !state.auth.refreshingToken) {
        dispatch(actions.refreshToken(token.refreshToken));
    }
    else if (notLoginOrRefreshing(state) && !state.auth.loadingLoginPage) {
        // Avoid displaying the login page when a login or refreshing flow is on going.
        const authState = generateAuthState();
        const atesLoginUrl = buildAtesLoginUrl(authUrl, authState);
        dispatch(actions.displayLoginSreen({ authState: authState, authUrl: atesLoginUrl }));
    }
    else if (!state.auth.reloadingLoginPage
        && !state.auth.loadingLoginPage
        && state.auth.authLoginPageReloadable) {
        // When the user presses the back button (Pop navigation case) from the login page,
        // then redirect him to the login page again.
        const authState = generateAuthState();
        const atesLoginUrl = buildAtesLoginUrl(authUrl, authState);
        dispatch(actions.redirectToLoginSreen({ authState: authState, authUrl: atesLoginUrl }));
    }
};
