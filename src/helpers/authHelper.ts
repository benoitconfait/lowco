import { Token } from '../reducers/AuthReducer';
import config from '../config';
import uuidV4 from 'uuid/v4';

export const buildAtesLoginUrl = (authServer: string, state: string): string => {

    const url = [
        authServer,
        `?response_type=${config.auth.responseType}`,
        `&scope=${config.auth.scope}`,
        `&client_id=${config.auth.clientID}`,
        `&redirect_uri=${config.auth.loginCallbackURL}`,
        `&state=${state}`
    ].join('');

    return url;
};

// Generate a Guid as auth state
export const generateAuthState = (): string => {
    const guid = uuidV4();

    return guid.toString();
};

export const buildAccessTokenRequestBody = (authorizationCode: string): object => {

    return {
        AutorizationCode: authorizationCode
    };
};

export const buildHeader = (token?: Token | null, header?: object | null) => {
    const tokenType = token ? token.tokenType : null;
    const accessToken = token ? token.accessToken : null;

    if (header === null) {
        header = {};
    }

    header = {
        ...header,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (accessToken != null) {
        header = {
            ...header,
            'Authorization': `${tokenType} ${accessToken}`
        };
    }

    return header;
};

export const getTokenFromStore = (store: any) => {

    const state = store.getState();
    const token = state.auth.token ? JSON.parse(state.auth.token) : null;

    return token;
};