import _ from 'lodash';
import { Reducer } from 'redux-testkit';
import InternetUsageReducer, { State, INITIAL_STATE } from '../InternetUsageReducer';
import BaseAction from '../../actions/BaseAction';
import { InternetUsageActionTypes } from '../../actionTypes/internetUsageActionTypes';
import Models = Lowco.Models;

describe('reducers/InternetUsageReducer', () => {

  it('should set loading property to true on fetch of internet usage', () => {
    const fetchInternetUsageAction: BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE, null> =
      <BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE, null>>{
        type: InternetUsageActionTypes.FETCH_INTERNET_USAGE
      };
    const expectedResult = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(InternetUsageReducer).expect(fetchInternetUsageAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and internet usage properties on fetch of internet usage success', () => {
    const internetUsage = <Models.NetMonthlyUsageCollection>{
      items: [<Models.NetMonthlyUsage>{
        connectionId: '001122334455',
        dailyUsages: [<Models.NetDailyUsage>{}],
        dailyUsageUnit: Lowco.Domain.Views.Usage.Net.NetUsageUnit.UnitType.Gb,
        overPriceDownloadAsEuro: 0,
        overPriceUploadAsEuro: 0,
        overQuotaDownloadAsBytes: 0,
        overQuotaUploadAsBytes: 0,
        period: new Date(),
        periodStartDate: '',
        quotaAsBytes: 0,
        totalOverPriceAsEuro: 0,
        totalOverQuotaAsBytes: 0,
        downloadVolumeAsBytes: 0,
        totalVolumeAsBytes: 0,
        totalVolumeAsUnit: 0,
        uploadVolumeAsBytes: 0,
        usageUnit: Lowco.Domain.Views.Usage.Net.NetUsageUnit.UnitType.Gb,
        volumeMultiplicator: 0,
        relations: []
      }],
      relations: []
    };
    const fetchInternetUsageFulfilledAction: BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, Models.NetMonthlyUsageCollection> =
      <BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, Models.NetMonthlyUsageCollection>>{
        type: InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED,
        payload: internetUsage
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false,
      error: null,
      internetUsages: _.reduce(internetUsage.items, function (obj, item) {
        obj[item.connectionId] = item
        return obj;
      }, {})
    };
    Reducer(InternetUsageReducer).expect(fetchInternetUsageFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch internet usage error', () => {
    const httpError: Error = new Error('http error');
    const fetchInternetUsageErrorAction: BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, Error> =
      <BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, Error>>{
        type: InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR,
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
    Reducer(InternetUsageReducer).withState(existingState).expect(fetchInternetUsageErrorAction).toReturnState(expectedResult);
  });

    it('should set loading property to false on fetch of internet usage cancellation', () => {
      const fetchInternetUsageCancelledAction: BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED, null> =
        <BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED, null>>{
          type: InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED
        };
      const existingState: State = {
        ...INITIAL_STATE,
        loading: true
      };
      const expectedResult = {
        ...existingState,
        loading: false
      };
      Reducer(InternetUsageReducer).withState(existingState).expect(fetchInternetUsageCancelledAction).toReturnState(expectedResult);
    });
});