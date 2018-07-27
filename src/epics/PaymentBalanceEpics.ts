import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore } from '../helpers/authHelper';
import { PaymentBalanceActionTypes } from '../actionTypes/paymentBalanceActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';

import * as actions from '../actions/PaymentBalanceActions';

const fetchPaymentBalanceApiUrl = `${config.api}/customer/billing/balance`;

const fetchPaymentBalanceTriggers = [
    PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE
];

const fetchPaymentBalanceEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchPaymentBalanceTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchPaymentBalance, key, store)) {

                return ajax.get(fetchPaymentBalanceApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchPaymentBalanceFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchPaymentBalanceError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchPaymentBalanceCancelled()
            );
        });

export {
    fetchPaymentBalanceEpic
};
