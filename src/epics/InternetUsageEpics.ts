import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { InternetUsageActionTypes } from '../actionTypes/internetUsageActionTypes';
import { InternetYearlyUsageActionTypes } from '../actionTypes/internetYearlyUsageActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/InternetUsageActions';
import * as yearlyActions from '../actions/InternetYearlyUsageActions';

const fetchInternetUsageApiUrl = `${config.api}/usage/net`;
const fetchInternetYearlyUsageApiUrl = `${config.api}/usage/net/yearly`;

const fetchInternetUsageTriggers = [
    InternetUsageActionTypes.FETCH_INTERNET_USAGE
];

const fetchInternetYearlyUsageTriggers = [
    InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE
];
const fetchInternetUsageEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchInternetUsageTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchInternetUsage, key, store)) {
                return ajax.get(fetchInternetUsageApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchInternetUsageFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchInternetUsageError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchInternetUsageCancelled()
            );
        });

const fetchInternetYearlyUsageEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchInternetYearlyUsageTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchInternetYearlyUsage, key, store)) {
                return ajax.get(fetchInternetYearlyUsageApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return yearlyActions.fetchInternetYearlyUsageFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            yearlyActions.fetchInternetYearlyUsageError(error)
                        );
                    });
            }
            return Observable.of(
                yearlyActions.fetchInternetYearlyUsageCancelled()
            );
        });

export {
    fetchInternetUsageEpic,
    fetchInternetYearlyUsageEpic
};
