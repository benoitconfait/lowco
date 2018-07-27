import {
    CustomerActionTypes
} from '../actionTypes/customerActionTypes';
import {
    CustomerOptionsActionTypes
} from '../actionTypes/customerOptionsActionTypes';
import {
    InternetUsageActionTypes
} from '../actionTypes/internetUsageActionTypes';
import {
    MobileSubscriptionsActionTypes
} from '../actionTypes/mobileSubscriptionsActionTypes';
import {
    MobileUsageActionTypes
} from '../actionTypes/mobileUsageActionTypes';
import {
    PaymentBalanceActionTypes
} from '../actionTypes/paymentBalanceActionTypes';
import {
    InvoicesActionTypes
} from '../actionTypes/invoicesActionTypes';
import {
    VodUsageActionTypes
} from '../actionTypes/vodUsageActionTypes';
import {
    PhoneUsageActionTypes
} from '../actionTypes/phoneUsageActionTypes';
import { fetchCustomer } from '../actions/CustomerActions';

export type State = {
    fetchCustomer: any,
    fetchCustomerOptions: any,
    fetchInternetUsage: any,
    fetchMobileSubscriptions: any,
    fetchAverageMobileUsage: any,
    fetchMobileCDR: any,
    fetchPaymentBalance: any,
    fetchInvoices: any,
    fetchVodUsage: any,
    fetchPhoneUsage: any,
    fetchPhones: any
};

export const INITIAL_STATE: State = {
    fetchCustomer: {},
    fetchCustomerOptions: {},
    fetchInternetUsage: {},
    fetchMobileSubscriptions: {},
    fetchAverageMobileUsage: {},
    fetchMobileCDR: {},
    fetchPaymentBalance: {},
    fetchInvoices: {},
    fetchVodUsage: {},
    fetchPhoneUsage: {},
    fetchPhones: {}
};

const lastSuccessfulApiCallsTime = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CustomerActionTypes.FETCH_CUSTOMER_FULFILLED:

            return {
                ...state,
                fetchCustomer: { ...state.fetchCustomer, [action.payload.key]: new Date() }
            };
        case CustomerActionTypes.FETCH_CUSTOMER_ERROR:
            return {
                ...state,
                fetchCustomer: null
            };
        case CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_FULFILLED:
            return {
                ...state,
                fetchCustomerOptions: { ...state.fetchCustomerOptions, [action.payload.key]: new Date() }
            };
        case CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_ERROR:
            return {
                ...state,
                fetchCustomerOptions: null
            };
        case InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED:
            return {
                ...state,
                fetchInternetUsage: { ...state.fetchInternetUsage, [action.payload.key]: new Date() }
            };
        case InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR:
            return {
                ...state,
                fetchInternetUsage: null
            };
        case MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED:
            return {
                ...state,
                fetchMobileSubscriptions: { ...state.fetchMobileSubscriptions, [action.payload.key]: new Date() }
            };
        case MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR:
            return {
                ...state,
                fetchMobileSubscriptions: null
            };
        case MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED:
            return {
                ...state,
                fetchAverageMobileUsage: { ...state.fetchAverageMobileUsage, [action.payload.key]: new Date() }
            };
        case MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR:
            return {
                ...state,
                fetchAverageMobileUsage: null
            };
        case MobileUsageActionTypes.FETCH_MOBILE_CDR_FULFILLED:
            return {
                ...state,
                fetchMobileCDR: { ...state.fetchMobileCDR, [action.payload.key]: new Date() }
            };
        case MobileUsageActionTypes.FETCH_MOBILE_CDR_ERROR:
            return {
                ...state,
                fetchMobileCDR: null
            };
        case PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED:
            return {
                ...state,
                fetchPaymentBalance: { ...state.fetchPaymentBalance, [action.payload.key]: new Date() }
            };
        case PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR:
            return {
                ...state,
                fetchPaymentBalance: null
            };
        case InvoicesActionTypes.FETCH_INVOICES_FULFILLED:
            return {
                ...state,
                fetchInvoices: { ...state.fetchInvoices, [action.payload.key]: new Date() }
            };
        case InvoicesActionTypes.FETCH_INVOICES_ERROR:
            return {
                ...state,
                fetchInvoices: null
            };
        case VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED:
            return {
                ...state,
                fetchVodUsage: { ...state.fetchVodUsage, [action.payload.key]: new Date() }
            };
        case VodUsageActionTypes.FETCH_VOD_USAGE_ERROR:
            return {
                ...state,
                fetchVodUsage: null
            };
        case PhoneUsageActionTypes.FETCH_PHONE_USAGE_FULFILLED:
            return {
                ...state,
                fetchPhoneUsage: { ...state.fetchPhoneUsage, [action.payload.key]: new Date() }
            };
        case PhoneUsageActionTypes.FETCH_PHONE_USAGE_ERROR:
            return {
                ...state,
                fetchPhoneUsage: null
            };
        case PhoneUsageActionTypes.FETCH_PHONES_FULFILLED:
            return {
                ...state,
                fetchPhones: { ...state.fetchPhones, [action.payload.key]: new Date() }
            };
        case PhoneUsageActionTypes.FETCH_PHONES_ERROR:
            return {
                ...state,
                fetchPhones: null
            };
        default:
            return state;
    }
};
export default lastSuccessfulApiCallsTime;