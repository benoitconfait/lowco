import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { TvOptionsActionTypes } from '../actionTypes/tvOptionsActionTypes';
import { canCallApi } from '../helpers/apiCallThrottle';

import * as actions from '../actions/TvOptionsActions';

const tvOptionsApiUrl = `${config.api}/customer/configuration/television`;

const fetchTvOptionsTriggers = [
    TvOptionsActionTypes.FETCH_TV_OPTIONS,
];

const activateTvOptionsTriggers = [
    TvOptionsActionTypes.ACTIVATE_TV_OPTIONS
];

const fetchTvOptionsEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchTvOptionsTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            // if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchCustomerOptions, store)) {

            return ajax.get(tvOptionsApiUrl, {}, getTokenFromStore(store))
                .map((data) => {
                    return actions.fetchTvOptionsFulfilled(data.response);
                })
                .timeout(15000)
                .catch((error) => {
                    return Observable.of(
                        actions.fetchTvOptionsError(error)
                    );
                });
        });

const activateTvOptionsEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => activateTvOptionsTriggers.indexOf(action.type) >= 0)
        .mergeMap((action: any) => {
            return ajax.post(tvOptionsApiUrl, action.payload, getTokenFromStore(store))
                .map((data) => {
                    // success so fetch updated options
                    return actions.activateTvOptionsFulfilled(data.response);
                })
                .timeout(15000)
                .catch((error) => {
                    return Observable.of(
                        actions.activateTvOptionsError(error)
                    );
                });
        });
export {
    fetchTvOptionsEpic,
    activateTvOptionsEpic
};
