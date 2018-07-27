import { Observable } from 'rxjs/Observable';
import config from '../config';
import { getTokenFromStore, buildHeader } from '../helpers/authHelper';
import { InvoicesActionTypes } from '../actionTypes/invoicesActionTypes';
import { canCallApi, getKeyForParams } from '../helpers/apiCallThrottle';
import * as actions from '../actions/InvoicesActions';
import { Platform, Alert } from 'react-native';
import { download } from '../helpers/invoiceHelper';

const fetchInvoicesApiUrl = `${config.api}/customer/billing/invoices`;
const downloadInvoiceApiUrl = `${config.api}/customer/document?documentid=`;

const fetchInvoicesTriggers = [
    InvoicesActionTypes.FETCH_INVOICES
];
const downloadInvoiceEpicTriggers = [
    InvoicesActionTypes.DOWNLOAD_INVOICE
];
const fetchInvoicesEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => fetchInvoicesTriggers.indexOf(action.type) >= 0)
        .mergeMap(() => {
            const key = getKeyForParams({});
            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.FetchInvoices, key, store)) {
                return ajax.get(fetchInvoicesApiUrl, {}, getTokenFromStore(store))
                    .map((data) => {
                        return actions.fetchInvoicesFulfilled({ key, response: data.response });
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.fetchInvoicesError(error)
                        );
                    });
            }
            return Observable.of(
                actions.fetchInvoicesCancelled()
            );
        });


const downloadInvoiceEpic = (action$: any, store, { ajax }) =>
    action$.filter((action: any) => downloadInvoiceEpicTriggers.indexOf(action.type) >= 0)
        .mergeMap((action: any) => {
            const key = getKeyForParams({});
            const url = `${downloadInvoiceApiUrl}${action.payload}`;
            const token = getTokenFromStore(store);

            if (canCallApi(VOO.Mobile.App.Enums.ApiEndPoint.DownloadInvoice, key, store)) {
                return ajax.get(url, {}, token)
                    .map((data) => {
                        const downloadUrl = data.xhr.responseURL;
                        const downloadSuccess = download(downloadUrl);
                        return actions.downloadInvoiceFulfilled('');
                    })
                    .timeout(15000)
                    .catch((error) => {
                        return Observable.of(
                            actions.downloadInvoiceError(error)
                        );
                    });
            }
            return Observable.of(
                actions.downloadInvoiceCancelled()
            );
        });

export {
    downloadInvoiceEpic,
    fetchInvoicesEpic
};
