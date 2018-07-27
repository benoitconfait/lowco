import _ from 'lodash';
import { Reducer } from 'redux-testkit';
import MobileUsageReducer, { State, INITIAL_STATE } from '../MobileUsageReducer';
import BaseAction from '../../actions/BaseAction';
import { MobileUsageActionTypes } from '../../actionTypes/mobileUsageActionTypes';
import Models = VOO.Mobile.App.Models;

describe('reducers/MobileUsageReducer', () => {

  it('should set loading property to true on fetch of mobile usage', () => {
    const fetchMobileUsageAction: BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE, null> =
      <BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE, null>>{
        type: MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE
      };
    const expectedResult: State = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(MobileUsageReducer).expect(fetchMobileUsageAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and list mobile usages on fetch of mobile usage success', () => {
    const mobileUsage = <Models.NetMonthlyUsageCollection>{
      items: [<Models.NetMonthlyUsage> {  
        connectionId: '0011122244545'      
      }],
      relations: []
    };
    const fetchMobileUsageFulfilledAction: BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, Models.NetMonthlyUsageCollection> =
      <BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, Models.NetMonthlyUsageCollection>>{
        type: MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED,
        payload: mobileUsage
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };

    const expectedResult: State = {
      ...existingState,
      loading: false,
      error: null,
      mobileUsages: _.reduce(mobileUsage.items, function (obj, item) {
        obj[item.connectionId] = item
        return obj;
      }, {})
    };
    Reducer(MobileUsageReducer).expect(fetchMobileUsageFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch mobile usage error', () => {
    const httpError: Error = new Error('http error');
    const fetchMobileUsageErrorAction: BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, Error> =
      <BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, Error>>{
        type: MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR,
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
    Reducer(MobileUsageReducer).withState(existingState).expect(fetchMobileUsageErrorAction).toReturnState(expectedResult);
  });

  it('should set loading property to false on fetch of mobile usage cancellation', () => {
    const fetchMobileUsageCancelledAction: BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED, null> =
      <BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED, null>>{
        type: MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false
    };
    Reducer(MobileUsageReducer).withState(existingState).expect(fetchMobileUsageCancelledAction).toReturnState(expectedResult);
  });
});