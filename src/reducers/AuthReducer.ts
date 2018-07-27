import { AuthActionTypes, LoginPayload } from '../actionTypes/authActionTypes';
import BaseAction from '../actions/BaseAction';

export type Token = {
    refreshToken: string;
    accessToken: string;
    expiresIn: number;
    tokenType: string;
};

export type State = {
    isAuthLoginPageDisplayed: boolean;
    authLoginPageReloadable: boolean;
    reloadingLoginPage: boolean;
    loadingLoginPage: boolean;
    refreshingToken: boolean;
    token: string | null;
    isLoggedIn: boolean;
    authUrl: string | null;
    authState: string | null;
    forceCallApi: boolean;
};

export const INITIAL_STATE: State = {
    isAuthLoginPageDisplayed: false,
    authLoginPageReloadable: false,
    reloadingLoginPage: false,
    loadingLoginPage: false,
    refreshingToken: false,
    isLoggedIn: true,
    token: null,
    authUrl: null,
    authState: null,
    forceCallApi: false
};

type AuthActions =
    | BaseAction<AuthActionTypes.LOGIN, LoginPayload>
    | BaseAction<AuthActionTypes.REDIRECT_TO_LOGIN, LoginPayload>
    | BaseAction<AuthActionTypes.USER_CANCELLED_LOGIN, null>
    | BaseAction<AuthActionTypes.LOGOUT, null>
    | BaseAction<AuthActionTypes.LOGIN_SCREEN_DISPLAYED, null>
    | BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN, string>
    | BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN_FULFILLED, Token>
    | BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR, null>
    | BaseAction<AuthActionTypes.REFRESH_TOKEN, string>
    | BaseAction<AuthActionTypes.REFRESH_TOKEN_FULFILLED, Token>
    | BaseAction<AuthActionTypes.REFRESH_TOKEN_ERROR, null>;

export default (state: State = INITIAL_STATE, action: AuthActions) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                authUrl: action.payload ? action.payload.authUrl : null,
                authState: action.payload ? action.payload.authState : null,
                isAuthLoginPageDisplayed: false
            };
        case AuthActionTypes.USER_CANCELLED_LOGIN:
            return {
                ...state,
                reloadingLoginPage: false,
                loadingLoginPage: false
            };
        case AuthActionTypes.REDIRECT_TO_LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                authUrl: action.payload ? action.payload.authUrl : null,
                authState: action.payload ? action.payload.authState : null,
                isAuthLoginPageDisplayed: false,
                reloadingLoginPage: true,
                authLoginPageReloadable: true
            };
        case AuthActionTypes.LOGIN_SCREEN_DISPLAYED:
            return {
                ...state,
                isAuthLoginPageDisplayed: true,
                authLoginPageReloadable: true,
                loadingLoginPage: true,
                forceCallApi: false
            };
        case AuthActionTypes.FETCH_ACCESS_TOKEN:
            return {
                ...state,
                authLoginPageReloadable: false
            };
        case AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR:
            return {
                ...state,
                token: null,
                isLoggedIn: false,
                isAuthLoginPageDisplayed: false
            };
        case AuthActionTypes.FETCH_ACCESS_TOKEN_FULFILLED:
            return {
                ...state,
                token: JSON.stringify(action.payload),
                isLoggedIn: true,
                isAuthLoginPageDisplayed: false,
                loadingLoginPage: false,
                reloadingLoginPage: false
            };
        case AuthActionTypes.REFRESH_TOKEN:
            return {
                ...state,
                refreshingToken: true,
                authUrl: action.payload
            };
        case AuthActionTypes.LOGOUT:
        case AuthActionTypes.REFRESH_TOKEN_ERROR:
            return {
                ...INITIAL_STATE,
                forceCallApi: true
            };
        case AuthActionTypes.REFRESH_TOKEN_FULFILLED:
            return {
                ...state,
                token: JSON.stringify(action.payload),
                refreshingToken: false,
                loadingLoginPage: false,
                reloadingLoginPage: false
            };
        default:
            return state;
    }
};
