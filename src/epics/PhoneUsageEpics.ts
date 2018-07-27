import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { PhoneUsageActionTypes } from '../actionTypes/phoneUsageActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';
import * as actions from '../actions/PhoneUsageActions';
import moment from 'moment';

// "sap14": "/customer/phones -> items[0] -> serviceId",
// "esId": "/customer/phones -> items[0] -> esId",
// "acbisNumber": "/customer/phones -> items[0] -> acbisNumber",
// /usage/phone/[sap14]/[esid]/[year]/[month]?an=[acbisNumber]
const fetchPhonesApiUrl = `${config.api}/customer/phones`;
const fetchPhoneUsageApiUrl = `${config.api}/usage/phone`;

const fetchPhonesTriggers = [
    PhoneUsageActionTypes.FETCH_PHONES
];

const fetchPhoneUsageTriggers = [
    PhoneUsageActionTypes.FETCH_PHONE_USAGE
];


const fetchPhonesEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchPhonesTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchPhones, key, store)) {
                return ajax.get(fetchPhonesApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchPhonesFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchPhonesError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchPhonesCancelled()
            );
        });

const fetchPhoneUsageEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchPhoneUsageTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const state = store.getState();
            if (state.phones && state.phones.phones) {
                var phone = state.phones.phones.filter(x => x.esId === state.phones.selectedPhoneNumber);
                if (!phone || phone.length == 0) {
                    return Observable.of(
                        actions.fetchPhoneUsageCancelled()
                    );
                }
                const params = {
                    serviceId: phone[0].serviceId,
                    esId: phone[0].esId,
                    year: moment().year(),
                    month: moment().month() + 1,
                    acbisNumber: phone[0].acbisNumber
                };
                const key = getKeyForParams(params);

                var phoneUsageUrl = `${fetchPhoneUsageApiUrl}/${phone[0].serviceId}/${phone[0].esId}/${moment().year()}/${("0" + (moment().month() + 1)).slice(-2)}?an=${phone[0].acbisNumber}`;
                if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchPhoneUsage, key, store)) {
                    return ajax.get(phoneUsageUrl, {}, getTokenFromStore(store))
                        .map((data) => {
                            return actions.fetchPhoneUsageFulfilled({ key, response: data.response });
                        })
                        .timeout(15000)
                        .catch((error) => {
                            return Observable.of(
                                actions.fetchPhoneUsageError(error)
                            );
                        });
                }
            }
            return Observable.of(
                actions.fetchPhoneUsageCancelled()
            );
        });

export {
    fetchPhonesEpic,
    fetchPhoneUsageEpic
};
