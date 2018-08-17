import { 
    PaymentBalanceActionTypes
 } from '../actionTypes/paymentBalanceActionTypes';
 import BaseAction from '../actions/BaseAction';
 import _ from 'lodash';
 import Models = Lowco.Models;
 import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    hasMobileAccountBalance: boolean | null,
    isAvailable: boolean | null,
    isOneBill: boolean | null,
    totalBalance: number | null,
    totalMobile: number | null,
    totalPack: number | null,
    totalTelevision: number | null,
    unPaidInvoices: number | null,
    unPaidMobileInvoices: number | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    hasMobileAccountBalance: null,
    isAvailable: null,
    isOneBill: null,
    totalBalance: null,
    totalMobile: null,
    totalPack: null,
    totalTelevision: null,
    unPaidInvoices: null,
    unPaidMobileInvoices: null
};

type PaymentBalanceReducerActions =
BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE, null> |
BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, KeyResponse<Models.PaymentBalance>> |
BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, object> |
BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED, object>;

export default (state : State = INITIAL_STATE, action : PaymentBalanceReducerActions) => {
    switch (action.type) {
        case PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE:
            return {
                ...state,
                loading: true
            };
        case PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED:
            return {
                loading: false,
                error: null,
                hasMobileAccountBalance: action.payload && action.payload.response ? action.payload.response.hasMobileAccountBalance : null,
                isAvailable: action.payload && action.payload.response ? action.payload.response.isAvailable : null,
                isOneBill: action.payload && action.payload.response ? action.payload.response.isOneBill : null,
                totalBalance: action.payload && action.payload.response ? action.payload.response.totalBalance : null,
                totalMobile: action.payload && action.payload.response ? action.payload.response.totalMobile : null,
                totalPack: action.payload && action.payload.response ? action.payload.response.totalPack : null,
                totalTelevision: action.payload && action.payload.response ? action.payload.response.totalTelevision : null,
                unPaidInvoices: action.payload && action.payload.response ? action.payload.response.unPaidInvoices : null,
                unPaidMobileInvoices: action.payload && action.payload.response ? action.payload.response.unPaidMobileInvoices : null
            };
        case PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
