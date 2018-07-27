import { ajax } from 'rxjs/observable/dom/ajax';
import { retry } from 'rxjs/operators/retry';
import { from } from 'rxjs/observable/from';
import { buildHeader } from '../helpers/authHelper';
import { Token } from '../reducers/AuthReducer';

const defaultConfig = {
    method: 'GET',
    crossDomain: true,
    withCredentials: true
};

const config = (httpVerb: string, body: object, token?: Token, header?: object | null) => {
    return {
        ...defaultConfig,
        method: httpVerb,
        body: body,
        headers: buildHeader(token, header)
    };
};

export const get = (url: string, options: object, token?: Token) => (
    ajax(Object.assign({}, {
        ...defaultConfig,
    }, { url }, {
            ...options,
            headers: buildHeader(token)
        }))
);

export const post = (url: string, body: object, token?: Token, headers?: object | null) => (
    ajax(Object.assign({}, config('POST', body, token, headers), { url }, {}))
);

export const put = (url: string, body: object, token?: Token, headers?: object | null) => {
    return ajax(Object.assign({}, config('PUT', body, token, headers), { url }, {}));
};