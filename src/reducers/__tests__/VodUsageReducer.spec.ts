import _ from 'lodash';
import { Reducer } from 'redux-testkit';
import VodUsageReducer, { State, INITIAL_STATE } from '../VodUsageReducer';
import BaseAction from '../../actions/BaseAction';
import { VodUsageActionTypes } from '../../actionTypes/vodUsageActionTypes';
import Models = Lowco.Models;

describe('reducers/VodUsageReducer', () => {

  it('should set loading property to true on fetch of vod usage', () => {
    const fetchVodUsageAction: BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE, null> =
      <BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE, null>>{
        type: VodUsageActionTypes.FETCH_VOD_USAGE
      };
    const expectedResult = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(VodUsageReducer).expect(fetchVodUsageAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and vod usage properties on fetch of vod usage success', () => {
    const vodMonthlyUsage = <Models.VodMonthlyUsage>{};
    const fetchVodUsageFulfilledAction: BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, Models.VodMonthlyUsage[]> =
      <BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, Models.VodMonthlyUsage[]>>{
        type: VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED,
        payload: [vodMonthlyUsage]
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false,
      error: null,
      vodMonthlyUsages: [vodMonthlyUsage]
    };
    Reducer(VodUsageReducer).expect(fetchVodUsageFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch vod usage error', () => {
    const httpError: Error = new Error('http error');
    const fetchVodUsageErrorAction: BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, Error> =
      <BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, Error>>{
        type: VodUsageActionTypes.FETCH_VOD_USAGE_ERROR,
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
    Reducer(VodUsageReducer).withState(existingState).expect(fetchVodUsageErrorAction).toReturnState(expectedResult);
  });

    it('should set loading property to false on fetch of vod usage cancellation', () => {
      const fetchVodUsageCancelledAction: BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED, null> =
        <BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED, null>>{
          type: VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED
        };
      const existingState: State = {
        ...INITIAL_STATE,
        loading: true
      };
      const expectedResult = {
        ...existingState,
        loading: false
      };
      Reducer(VodUsageReducer).withState(existingState).expect(fetchVodUsageCancelledAction).toReturnState(expectedResult);
    });
});