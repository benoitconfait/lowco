export enum AuthActionTypes {
    TOKEN_INVALID = 'TOKEN_INVALID',
    LOGIN = 'LOGIN',
    REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN',
    USER_CANCELLED_LOGIN = 'USER_CANCELLED_LOGIN',
    LOGIN_SCREEN_DISPLAYED = 'LOGIN_SCREEN_DISPLAYED',
    FETCH_ACCESS_TOKEN = 'FETCH_ACCESS_TOKEN',
    FETCH_ACCESS_TOKEN_ERROR = 'FETCH_ACCESS_TOKEN_ERROR',
    FETCH_ACCESS_TOKEN_FULFILLED = 'FETCH_ACCESS_TOKEN_FULFILLED',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR',
    REFRESH_TOKEN_FULFILLED = 'REFRESH_TOKEN_FULFILLED',
    LOGOUT = 'LOGOUT'
}

export interface LoginPayload {
    authUrl: string,
    authState: string
}