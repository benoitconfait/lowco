import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { VodUsageActionTypes } from '../actionTypes/vodUsageActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/VodUsageActions';
import Models = Lowco.Models;
import VodMonthUsage from '../components/screens/consumption/vod/VodMonthUsage';
import { AjaxResponse, AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';

const fetchVodUsageApiUrl = `${config.api}/usage/vod`;

const fetchVodUsageTriggers = [
    VodUsageActionTypes.FETCH_VOD_USAGE
];

const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;

    if (month < 10) {
        return `0${month}`;
    }
    return month;
};

const getLast12MonthsApiUrls = (selectedPodId) => {
    const apiUrls = [`${fetchVodUsageApiUrl}/${selectedPodId}/${new Date().getFullYear()}/${getCurrentMonth()}`];
    for (let i = 1; i < 12; i++) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const month = d.getMonth() + 1;
        apiUrls.push(`${fetchVodUsageApiUrl}/${selectedPodId}/${d.getFullYear()}/${month < 10 ? `0${month}` : month}`);
    }
    return apiUrls;
}

const fetchVodUsageEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchVodUsageTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const state = store.getState();
            const selectedPodId = state.addresses && state.addresses.selectedPodId;

            const params = { selectedPodId };
            const key = getKeyForParams(params);

            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchVodUsage, key, store) && selectedPodId) {
                const apiUrls = getLast12MonthsApiUrls(selectedPodId);
                return Observable.forkJoin(apiUrls.map((url) => ajax.get(url, {},
                    getTokenFromStore(store))))
                    .map((results: AjaxResponse[]) => {
                        const usages = results.map((result: AjaxResponse) =>
                        result && result.response && result.response.items && result.response.items[0]);
                        return actions.fetchVodUsageFulfilled({ key, response: usages.filter((usage) => usage) });
                    })
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchVodUsageError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchVodUsageCancelled()
            );
        });

export {
    fetchVodUsageEpic
};
