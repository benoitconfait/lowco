import { Observable } from 'rxjs/Observable';
import { buildAccessTokenRequestBody } from '../helpers/authHelper';
import { ErrorActionTypes } from '../actionTypes/errorActionTypes';
import * as authActions from '../actions/AuthAction';
import * as errorActions from '../actions/errorActions';
import { post } from './ajaxObservable';
import config from '../config';

const logErrorEpic = (action$: any, store, { ajax }) =>
    action$.ofType(ErrorActionTypes.LOG_ERROR)
        .mergeMap((action: any) => {
            return ajax.post(`${config.api}/error/log`, action.payload)
                .timeout(15000)
                .catch((error) => {
                    return Observable.of(
                        authActions.fetchAccessTokenError(error)
                    );
                });
        });
