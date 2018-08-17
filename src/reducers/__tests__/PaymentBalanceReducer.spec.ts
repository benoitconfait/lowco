import _ from 'lodash';
import { Reducer } from 'redux-testkit';
import PaymentBalanceReducer, { State, INITIAL_STATE } from '../PaymentBalanceReducer';
import BaseAction from '../../actions/BaseAction';
import { PaymentBalanceActionTypes } from '../../actionTypes/paymentBalanceActionTypes';
import Models = Lowco.Models;

describe('reducers/PaymentBalanceReducer', () => {

  it('should set loading property to true on fetch of payment balance', () => {
    const fetchPaymentBalanceAction: BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE, null> =
      <BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE, null>>{
        type: PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(PaymentBalanceReducer).expect(fetchPaymentBalanceAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set payment balance on fetch of payment balance success', () => {
    const paymentBalance = <Models.PaymentBalance>{
      hasMobileAccountBalance: true,
      isAvailable: true,
      isOneBill: true,
      totalBalance: 10,
      totalMobile: 5,
      totalPack: 5,
      totalTelevision: 0,
      unPaidInvoices: 0,
      unPaidMobileInvoices: 0,
      relations: []
    };
    const fetchPaymentBalanceFulfilledAction: BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, Models.PaymentBalance> =
      <BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, Models.PaymentBalance>>{
        type: PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED,
        payload: paymentBalance
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };

    const expectedResult: State = {
      ...existingState,
      loading: false,
      error: null,
      hasMobileAccountBalance: paymentBalance.hasMobileAccountBalance,
      isAvailable: paymentBalance.isAvailable,
      isOneBill: paymentBalance.isOneBill,
      totalBalance: paymentBalance.totalBalance,
      totalMobile: paymentBalance.totalMobile,
      totalPack: paymentBalance.totalPack,
      totalTelevision: paymentBalance.totalTelevision,
      unPaidInvoices: paymentBalance.unPaidInvoices,
      unPaidMobileInvoices: paymentBalance.unPaidMobileInvoices
    };
    Reducer(PaymentBalanceReducer).expect(fetchPaymentBalanceFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch payment balance error', () => {
    const httpError: Error = new Error('http error');
    const fetchPaymentBalanceErrorAction: BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, Error> =
      <BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, Error>>{
        type: PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };

    const expectedResult = {
      ...existingState,
      loading: false,
      error: httpError
    };
    Reducer(PaymentBalanceReducer).withState(existingState).expect(fetchPaymentBalanceErrorAction).toReturnState(expectedResult);
  });

  it('should set loading property to false on fetch of payment balance cancellation', () => {
    const fetchPaymentBalanceCancelledAction: BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED, null> =
      <BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED, null>>{
        type: PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_CANCELLED
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false
    };
    Reducer(PaymentBalanceReducer).withState(existingState).expect(fetchPaymentBalanceCancelledAction).toReturnState(expectedResult);
  });
});