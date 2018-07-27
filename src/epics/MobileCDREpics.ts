import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { MobileUsageActionTypes } from '../actionTypes/mobileUsageActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/MobileUsageActions';

const fetchMobileCDRApiUrl = `${config.api}/subscriptions/mobile/cdr`;

const fetchMobileCDRTriggers = [
    MobileUsageActionTypes.FETCH_MOBILE_CDR
];

const fetchMobileCDREpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchMobileCDRTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const state = store.getState();
            const selectedMSISDN = state && state.mobileSubscriptions && state.mobileSubscriptions.selectedMSISDN;
            const params = { selectedMSISDN };
            const key = getKeyForParams(params);
            if (selectedMSISDN && canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchMobileCDR, key, store)) {
                return ajax.get(`${fetchMobileCDRApiUrl}/${selectedMSISDN}`, {},
                    getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchMobileCDRFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchMobileCDRError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchMobileCDRCancelled()
            );
        });

export {
    fetchMobileCDREpic
};
