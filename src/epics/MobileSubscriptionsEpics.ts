import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { MobileSubscriptionsActionTypes } from '../actionTypes/mobileSubscriptionsActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/MobileSubscriptionsActions';

const fetchMobileSubscriptionsApiUrl = `${config.api}/subscriptions/mobile`;

const fetchMobileSubscriptionsTriggers = [
    MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS
];

const fetchMobileSubscriptionsEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchMobileSubscriptionsTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchMobileSubscriptions, key, store)) {

                return ajax.get(fetchMobileSubscriptionsApiUrl, {},
                    getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchMobileSubscriptionsFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchMobileSubscriptionsError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchMobileSubscriptionsCancelled()
            );
        });

export {
    fetchMobileSubscriptionsEpic
};
