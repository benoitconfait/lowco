import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { CustomerOptionsActionTypes } from '../actionTypes/customerOptionsActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/CustomerOptionsActions';

const fetchCustomerOptionsApiUrl = `${config.api}/customer/options`;
const activateCustomerOptionsUrl = `${config.api}/customer/options`;

const fetchCustomerOptionsTriggers = [
    CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS,
];

const activateCustomerOptionsTriggers = [
    CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS
];

const fetchCustomerOptionsEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchCustomerOptionsTriggers.indexOf(action.type) >= 0)
        .mergeMap((action: any) => {
            const forceRefresh = action.payload;
            const key = getKeyForParams({});
            if (forceRefresh || canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchCustomerOptions, key, store)) {

                return ajax.get(fetchCustomerOptionsApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchCustomerOptionsFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchCustomerOptionsError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchCustomerOptionsCancelled()
            );
        });

const activateCustomerOptionsEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => activateCustomerOptionsTriggers.indexOf(action.type) >= 0)
        .mergeMap((action: any) => {

            const activationOriginHeader = { 'X-ACTIVATION-ORIGIN': action.payload.origin };
            const optionsToActivate = action.payload.options;

            return ajax.put(activateCustomerOptionsUrl, optionsToActivate, getTokenFromStore(store), activationOriginHeader)
                .map((data) => {
                    // success so fetch updated options
                    const force = true;
                    return actions.fetchCustomerOptions(force);
                })
                .catch((error) => {
                    return Observable.of(
                        actions.activateCustomerOptionsError(error)
                    );
                });
        });
export {
    fetchCustomerOptionsEpic,
    activateCustomerOptionsEpic
};
