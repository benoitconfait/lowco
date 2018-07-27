import * as internetUsageActionTypes from '../actionTypes/internetUsageActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchInternetUsage = (): BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE, null> =>
    <BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE, null>>{
        type: internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE,
        payload: null
    };

export const fetchInternetUsageFulfilled = (payload: KeyResponse<Models.NetMonthlyUsageCollection>): BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>> =>
    <BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>>>{
        type: internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED,
        payload
    };

export const fetchInternetUsageError = (error): BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, object> =>
    <BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, object>>{
        type: internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR,
        payload: error
    };

export const fetchInternetUsageCancelled = (): BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED, null> =>
    <BaseAction<internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED, null>>{
        type: internetUsageActionTypes.InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED,
        payload: null
    };