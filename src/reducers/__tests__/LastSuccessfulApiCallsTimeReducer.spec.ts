import { Reducer } from 'redux-testkit';
import LastSuccessfulApiCallsTimeReducer, { State, INITIAL_STATE } from '../LastSuccessfulApiCallsTimeReducer';
import BaseAction from '../../actions/BaseAction';
import {
  CustomerActionTypes
} from '../../actionTypes/customerActionTypes';
import {
  InternetUsageActionTypes
} from '../../actionTypes/internetUsageActionTypes';
import {
  MobileSubscriptionsActionTypes
} from '../../actionTypes/mobileSubscriptionsActionTypes';
import {
  MobileUsageActionTypes
} from '../../actionTypes/mobileUsageActionTypes';
import {
  PaymentBalanceActionTypes
} from '../../actionTypes/paymentBalanceActionTypes';
import {
  VodUsageActionTypes
} from '../../actionTypes/vodUsageActionTypes';
import Models = Lowco.Models;

describe('reducers/LastSuccessfulApiCallsTimeReducer', () => {
  const RealDate = Date;

  beforeAll(() => {
    const constantDate = new Date('2017-06-13T04:41:20')

    /*eslint no-global-assign:off*/
    const constDate = class extends Date {
      constructor() {
        super();
        return constantDate;
      }
    }

    spyOn(global, 'Date').and.callFake(function() {
      return constDate;
    });
  });

  it('should set time of successful call on fetch of customer', () => {
    const customer = <Models.Customer>{};
    const fetchLastSuccessfulApiCallsTimeFulfilledAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, Models.Customer> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, Models.Customer>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_FULFILLED,
        payload: customer
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      fetchCustomer: new Date(),
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).expect(fetchLastSuccessfulApiCallsTimeFulfilledAction).toReturnState(expectedResult);
  });

  it('should set to null the last successful time on fetch customer error', () => {
    const httpError: Error = new Error('http error');
    const fetchLastSuccessfulApiCallsTimeErrorAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      fetchCustomer: new Date()
    };

    const expectedResult = {
      ...existingState,
      fetchCustomer: null
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).withState(existingState).expect(fetchLastSuccessfulApiCallsTimeErrorAction).toReturnState(expectedResult);
  });



  it('should set time of successful call on fetch of internet usage', () => {
    const internetUsage = <Models.NetMonthlyUsageCollection>{};
    const fetchLastSuccessfulApiCallsTimeFulfilledAction: BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, Models.NetMonthlyUsageCollection> =
      <BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, Models.NetMonthlyUsageCollection>>{
        type: InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED,
        payload: internetUsage
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      fetchInternetUsage: new Date(),
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).expect(fetchLastSuccessfulApiCallsTimeFulfilledAction).toReturnState(expectedResult);
  });

  it('should set to null the last successful time on fetch internet usage error', () => {
    const httpError: Error = new Error('http error');
    const fetchLastSuccessfulApiCallsTimeErrorAction: BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, Error> =
      <BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, Error>>{
        type: InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      fetchInternetUsage: new Date()
    };

    const expectedResult = {
      ...existingState,
      fetchInternetUsage: null
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).withState(existingState).expect(fetchLastSuccessfulApiCallsTimeErrorAction).toReturnState(expectedResult);
  });


  it('should set time of successful call on fetch of mobile subscriptions', () => {
    const mobileInfo = <Models.MobileInformation>{};
    const fetchLastSuccessfulApiCallsTimeFulfilledAction: BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, Models.MobileInformation> =
      <BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, Models.MobileInformation>>{
        type: MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED,
        payload: mobileInfo
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      fetchMobileSubscriptions: new Date(),
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).expect(fetchLastSuccessfulApiCallsTimeFulfilledAction).toReturnState(expectedResult);
  });

  it('should set to null the last successful time on fetch mobile subscriptions error', () => {
    const httpError: Error = new Error('http error');
    const fetchLastSuccessfulApiCallsTimeErrorAction: BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, Error> =
      <BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, Error>>{
        type: MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      fetchMobileSubscriptions: new Date()
    };

    const expectedResult = {
      ...existingState,
      fetchMobileSubscriptions: null
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).withState(existingState).expect(fetchLastSuccessfulApiCallsTimeErrorAction).toReturnState(expectedResult);
  });


  it('should set time of successful call on fetch of average mobile usage', () => {
    const monthlyUsage = <Models.NetMonthlyUsageCollection>{};
    const fetchLastSuccessfulApiCallsTimeFulfilledAction: BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, Models.NetMonthlyUsageCollection> =
      <BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, Models.NetMonthlyUsageCollection>>{
        type: MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED,
        payload: monthlyUsage
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      fetchAverageMobileUsage: new Date(),
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).expect(fetchLastSuccessfulApiCallsTimeFulfilledAction).toReturnState(expectedResult);
  });

  it('should set to null the last successful time on fetch average mobile usage error', () => {
    const httpError: Error = new Error('http error');
    const fetchLastSuccessfulApiCallsTimeErrorAction: BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, Error> =
      <BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, Error>>{
        type: MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      fetchAverageMobileUsage: new Date()
    };

    const expectedResult = {
      ...existingState,
      fetchAverageMobileUsage: null
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).withState(existingState).expect(fetchLastSuccessfulApiCallsTimeErrorAction).toReturnState(expectedResult);
  });


  it('should set time of successful call on fetch of payment balance', () => {
    const monthlyUsage = <Models.NetMonthlyUsageCollection>{};
    const fetchLastSuccessfulApiCallsTimeFulfilledAction: BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, Models.NetMonthlyUsageCollection> =
      <BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED, Models.NetMonthlyUsageCollection>>{
        type: PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_FULFILLED,
        payload: monthlyUsage
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      fetchPaymentBalance: new Date(),
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).expect(fetchLastSuccessfulApiCallsTimeFulfilledAction).toReturnState(expectedResult);
  });

  it('should set to null the last successful time on fetch payment balance error', () => {
    const httpError: Error = new Error('http error');
    const fetchLastSuccessfulApiCallsTimeErrorAction: BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, Error> =
      <BaseAction<PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR, Error>>{
        type: PaymentBalanceActionTypes.FETCH_PAYMENT_BALANCE_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      fetchPaymentBalance: new Date()
    };

    const expectedResult = {
      ...existingState,
      fetchPaymentBalance: null
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).withState(existingState).expect(fetchLastSuccessfulApiCallsTimeErrorAction).toReturnState(expectedResult);
  });


  it('should set time of successful call on fetch of vod usage', () => {
    const vodMonthlyUsage = <Models.VodMonthlyUsage>{};
    const fetchLastSuccessfulApiCallsTimeFulfilledAction: BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, Models.VodMonthlyUsage[]> =
      <BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, Models.VodMonthlyUsage[]>>{
        type: VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED,
        payload: [vodMonthlyUsage]
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      fetchVodUsage: new Date(),
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).expect(fetchLastSuccessfulApiCallsTimeFulfilledAction).toReturnState(expectedResult);
  });

  it('should set to null the last successful time on fetch vod usage error', () => {
    const httpError: Error = new Error('http error');
    const fetchLastSuccessfulApiCallsTimeErrorAction: BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, Error> =
      <BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, Error>>{
        type: VodUsageActionTypes.FETCH_VOD_USAGE_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      fetchVodUsage: new Date()
    };

    const expectedResult = {
      ...existingState,
      fetchVodUsage: null
    };
    Reducer(LastSuccessfulApiCallsTimeReducer).withState(existingState).expect(fetchLastSuccessfulApiCallsTimeErrorAction).toReturnState(expectedResult);
  });


  afterAll(() => {

  });

});