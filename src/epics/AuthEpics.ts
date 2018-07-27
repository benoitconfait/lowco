import { Observable } from 'rxjs/Observable';
import { buildAccessTokenRequestBody } from '../helpers/authHelper';
import { AuthActionTypes } from '../actionTypes/authActionTypes';
import * as authActions from '../actions/AuthAction';
import * as errorActions from '../actions/errorActions';
import { post } from './ajaxObservable';
import { Token } from '../reducers/AuthReducer';
import config from '../config';

const fetchAccessTokenEpic = (action$: any, store, { ajax }) =>
    action$.ofType(AuthActionTypes.FETCH_ACCESS_TOKEN)
        .mergeMap((action: any) => {

            const accessTokenRequestBody = {
                authorizationCode: action.payload
            };

            return ajax.post(`${config.api}/token`, accessTokenRequestBody)
                .mergeMap((data) => [errorActions.clearError(), authActions.fetchAccessTokenFulFilled(data.response)])
                .timeout(15000)
                .catch((error) => {
                    return Observable.of(
                        authActions.fetchAccessTokenError(error)
                    );
                });
        });

const refreshTokenEpic = (action$: any, store, { ajax }) =>
    action$.ofType(AuthActionTypes.REFRESH_TOKEN)
        .mergeMap((action: any) => {

            const refreshTokenRequestBody = {
                refreshToken: action.payload
            };

            return ajax.post(`${config.api}/token/refresh`, refreshTokenRequestBody)
                .mergeMap((data) => [errorActions.clearError(), authActions.refreshTokenFulFilled(data.response)])
                .timeout(15000)
                .catch((error) => {
                    return Observable.of(
                        authActions.refreshTokenError(error)
                    );
                });
        });

export {
    fetchAccessTokenEpic,
    refreshTokenEpic
};