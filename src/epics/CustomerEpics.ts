import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { CustomerActionTypes } from '../actionTypes/customerActionTypes';
import { canCallApi, forceCallApi, getKeyForParams } from '../helpers/apiCallThrottle';


import * as actions from '../actions/CustomerActions';

const fetchCustomerApiUrl = `${config.api}/customer`;

const fetchCustomerTriggers = [
    CustomerActionTypes.FETCH_CUSTOMER
];

const fetchCustomerEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchCustomerTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (forceCallApi(store) || canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchCustomer, key, store)) {
                return ajax.get(fetchCustomerApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchCustomerFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchCustomerError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchCustomerCancelled()
            );
        });

export {
    fetchCustomerEpic
};
