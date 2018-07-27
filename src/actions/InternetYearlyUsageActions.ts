import * as internetYearlyUsageActionTypes from '../actionTypes/internetYearlyUsageActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchInternetYearlyUsage = (): BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE, null> =>
    <BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE, null>>{
        type: internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE,
        payload: null
    };


export const fetchInternetYearlyUsageFulfilled = (payload: KeyResponse<Models.NetMonthlyUsageCollection>): BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>> =>
    <BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>>>{
        type: internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_FULFILLED,
        payload
    };


export const fetchInternetYearlyUsageError = (error): BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_ERROR, object> =>
    <BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_ERROR, object>>{
        type: internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_ERROR,
        payload: error
    };

export const fetchInternetYearlyUsageCancelled = (): BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_CANCELLED, null> =>
    <BaseAction<internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_CANCELLED, null>>{
        type: internetYearlyUsageActionTypes.InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_CANCELLED,
        payload: null
    };