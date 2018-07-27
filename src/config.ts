import config from 'react-native-config';

export default {
    api: config.API_URL,
    auth: {
        clientID: config.AUTH_CLIENT_ID,
        loginCallbackURL: config.AUTH_LOGIN_CALLBACK_URL,
        responseType: config.AUTH_RESPONSE_TYPE,
        scope: config.AUTH_SCOPE,
        state: config.AUTH_STATE,
        loginEnabled: config.AUTH_LOGIN_ENABLED
    },
    ignoredOptions: [
        'MOBILE_DATA_CLASS_1',
        'MOBILE_DATA_CLASS_2',
        'MOBILE_DATA_CLASS_3'
    ]
};