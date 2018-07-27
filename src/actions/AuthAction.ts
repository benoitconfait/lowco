import { AuthActionTypes, LoginPayload } from '../actionTypes/authActionTypes';
import BaseAction from './BaseAction';
import { Token } from '../reducers/AuthReducer';

export const displayLoginSreen = (loginArgs: LoginPayload): BaseAction<AuthActionTypes.LOGIN, LoginPayload> =>
    <BaseAction<AuthActionTypes.LOGIN, LoginPayload>>{
        type: AuthActionTypes.LOGIN,
        payload: {
            authUrl: loginArgs.authUrl,
            authState: loginArgs.authState
        }
    };

export const redirectToLoginSreen = (loginArgs: LoginPayload): BaseAction<AuthActionTypes.REDIRECT_TO_LOGIN, LoginPayload> =>
    <BaseAction<AuthActionTypes.REDIRECT_TO_LOGIN, LoginPayload>>{
        type: AuthActionTypes.REDIRECT_TO_LOGIN,
        payload: {
            authUrl: loginArgs.authUrl,
            authState: loginArgs.authState
        }
    };
export const userCancelledLogin = (): BaseAction<AuthActionTypes.USER_CANCELLED_LOGIN, null> =>
    <BaseAction<AuthActionTypes.USER_CANCELLED_LOGIN, null>>{
        type: AuthActionTypes.USER_CANCELLED_LOGIN
    };

export const tokenInvalid = (authUrl: string): BaseAction<AuthActionTypes.TOKEN_INVALID, string> =>
    <BaseAction<AuthActionTypes.TOKEN_INVALID, string>>{
        type: AuthActionTypes.TOKEN_INVALID,
        payload: authUrl
    };

export const loginScreenDisplayed = (): BaseAction<AuthActionTypes.LOGIN_SCREEN_DISPLAYED, null> =>
    <BaseAction<AuthActionTypes.LOGIN_SCREEN_DISPLAYED, null>>{
        type: AuthActionTypes.LOGIN_SCREEN_DISPLAYED
    };

export const fetchAccessToken = (authorizationCode: string): BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN, string> =>
    <BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN, string>>{
        type: AuthActionTypes.FETCH_ACCESS_TOKEN,
        payload: authorizationCode
    };

export const fetchAccessTokenFulFilled = (data: Token): BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN_FULFILLED, Token> =>
    <BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN_FULFILLED, Token>>{
        type: AuthActionTypes.FETCH_ACCESS_TOKEN_FULFILLED,
        payload: data
    };

export const fetchAccessTokenError = (error: object): BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR, object> =>
    <BaseAction<AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR, object>>{
        type: AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR,
        payload: error
    };

export const refreshToken = (refreshToken: string): BaseAction<AuthActionTypes.REFRESH_TOKEN, string> =>
    <BaseAction<AuthActionTypes.REFRESH_TOKEN, string>>{
        type: AuthActionTypes.REFRESH_TOKEN,
        payload: refreshToken
    };

export const refreshTokenFulFilled = (token: Token): BaseAction<AuthActionTypes.REFRESH_TOKEN_FULFILLED, Token> =>
    <BaseAction<AuthActionTypes.REFRESH_TOKEN_FULFILLED, Token>>{
        type: AuthActionTypes.REFRESH_TOKEN_FULFILLED,
        payload: token
    };

export const refreshTokenError = (error: object): BaseAction<AuthActionTypes.REFRESH_TOKEN_ERROR, object> =>
    <BaseAction<AuthActionTypes.REFRESH_TOKEN_ERROR, object>>{
        type: AuthActionTypes.REFRESH_TOKEN_ERROR,
        payload: error
    };

    export const logout = (): BaseAction<AuthActionTypes.LOGOUT, null> =>
    <BaseAction<AuthActionTypes.LOGOUT, null>>{
        type: AuthActionTypes.LOGOUT
    };