import _ from 'lodash';
import { Reducer } from 'redux-testkit';
import MobileSubscriptionsReducer, { State, INITIAL_STATE } from '../MobileSubscriptionsReducer';
import BaseAction from '../../actions/BaseAction';
import { MobileSubscriptionsActionTypes } from '../../actionTypes/mobileSubscriptionsActionTypes';
import Models = VOO.Mobile.App.Models;

describe('reducers/MobileSubscriptionsReducer', () => {

  it('should set loading property to true on fetch of mobile subscriptions', () => {
    const fetchMobileSubscriptionsAction: BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS, null> =
      <BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS, null>>{
        type: MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(MobileSubscriptionsReducer).expect(fetchMobileSubscriptionsAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and list active mobile subscriptions on fetch of mobile subscriptions success', () => {
    const mobileInformation = <Models.MobileInformation>{
      contractor: <Models.Contractor>{},
      subscriptions: [<Models.MobileSubscription>{
        balance: 1,
        holder: <Models.MobileCardHolder>{},
        id: '001114455',
        msisdn: 123456456,
        offer: <Models.MobileOffer>{},
        simCard: <Models.SimCard>{
          status: VOO.Domain.Views.Product.Mobile.SimCardStatus.Active
        },
        usage: <Models.MobileUsage>{},
        validTill: new Date(),
        relations: []
      }],
      relations: []
    };
    const fetchMobileSubscriptionsFulfilledAction: BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, Models.MobileInformation> =
      <BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, Models.MobileInformation>>{
        type: MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED,
        payload: mobileInformation
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };

    const activeSubscriptions = mobileInformation.subscriptions.filter((subscription) => subscription.simCard.status.toString() === 'Active');
    const expectedResult = {
      ...existingState,
      loading: false,
      error: null,
      mobileSubscriptions: _.reduce(activeSubscriptions, function (obj, item) {
        obj[item.msisdn] = item
        return obj;
      }, {}),
      selectedMSISDN: activeSubscriptions && activeSubscriptions.length > 0 ? activeSubscriptions[0].msisdn : null
    };
    Reducer(MobileSubscriptionsReducer).expect(fetchMobileSubscriptionsFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch mobile subscriptions error', () => {
    const httpError: Error = new Error('http error');
    const fetchMobileSubscriptionsErrorAction: BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, Error> =
      <BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, Error>>{
        type: MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR,
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
    Reducer(MobileSubscriptionsReducer).withState(existingState).expect(fetchMobileSubscriptionsErrorAction).toReturnState(expectedResult);
  });

  it('should set loading property to false on fetch of mobile subscriptions cancellation', () => {
    const fetchMobileSubscriptionsCancelledAction: BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED, null> =
      <BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED, null>>{
        type: MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false
    };
    Reducer(MobileSubscriptionsReducer).withState(existingState).expect(fetchMobileSubscriptionsCancelledAction).toReturnState(expectedResult);
  });

  it('should set selected msisdn on set selected msisdn action', () => {
    const selectedMSISDN = 32477887788;
    const setSelectedMSISDNAction: BaseAction<MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN, number> =
      <BaseAction<MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN, number>>{
        type: MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN,
        payload: selectedMSISDN
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      selectedMSISDN
    };
    Reducer(MobileSubscriptionsReducer).expect(setSelectedMSISDNAction).toReturnState(expectedResult);
  });
});