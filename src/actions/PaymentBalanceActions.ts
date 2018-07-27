import * as paymentBalanceActionTypes from '../actionTypes/paymentBalanceActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchPaymentBalance = (): BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE, null> =>
    <BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE, null>>{
        type: paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE,
        payload: null
    };

export const fetchPaymentBalanceFulfilled = (payload: KeyResponse<Models.PaymentBalance>): BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, KeyResponse<Models.PaymentBalance>> =>
    <BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, KeyResponse<Models.PaymentBalance>>>{
        type: paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED,
        payload
    };

export const fetchPaymentBalanceError = (error): BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, object> =>
    <BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, object>>{
        type: paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR,
        payload: error
    };

export const fetchPaymentBalanceCancelled = (): BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED, null> =>
    <BaseAction<paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED, null>>{
        type: paymentBalanceActionTypes.PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED,
        payload: null
    };