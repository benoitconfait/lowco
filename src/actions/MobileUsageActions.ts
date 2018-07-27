import * as mobileUsageActionTypes from '../actionTypes/mobileUsageActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchAverageMobileUsage = (): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE, null> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE, null>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE,
        payload: null
    };

export const fetchAverageMobileUsageFulfilled = (payload: KeyResponse<Models.NetMonthlyUsageCollection>): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED,
        payload
    };

export const fetchAverageMobileUsageError = (error): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, object> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, object>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR,
        payload: error
    };

export const fetchAverageMobileUsageCancelled = (): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED, null> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED, null>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED,
        payload: null
    };

export const fetchMobileCDR = (): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR, null> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR, null>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR,
        payload: null
    };

export const fetchMobileCDRFulfilled = (payload: KeyResponse<any>): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_FULFILLED, KeyResponse<any>> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_FULFILLED, KeyResponse<any>>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_FULFILLED,
        payload
    };

export const fetchMobileCDRError = (error): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_ERROR, object> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_ERROR, object>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_ERROR,
        payload: error
    };

export const fetchMobileCDRCancelled = (): BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_CANCELLED, null> =>
    <BaseAction<mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_CANCELLED, null>>{
        type: mobileUsageActionTypes.MobileUsageActionTypes.FETCH_MOBILE_CDR_CANCELLED,
        payload: null
    };