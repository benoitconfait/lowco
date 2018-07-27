import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { MobileUsageActionTypes } from '../actionTypes/mobileUsageActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/MobileUsageActions';

const fetchMobileUsageApiUrl = `${config.api}/usage/mobile`;

const fetchAverageMobileUsageTriggers = [
    MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE,
];

const fetchAverageMobileUsageEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchAverageMobileUsageTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchAverageMobileUsage, key, store)) {

                return ajax.get(`${fetchMobileUsageApiUrl}/average`, {},
                    getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchAverageMobileUsageFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchAverageMobileUsageError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchAverageMobileUsageCancelled()
            );
        });

export {
    fetchAverageMobileUsageEpic
};
