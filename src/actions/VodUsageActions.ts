import * as vodUsageActionTypes from '../actionTypes/vodUsageActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = Lowco.Models;

export const fetchVodUsage = (): BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE, null> =>
    <BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE, null>>{
        type: vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE,
        payload: null
    };

export const fetchVodUsageFulfilled = (payload: KeyResponse<Models.VodMonthlyUsage[]>): BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, KeyResponse<Models.VodMonthlyUsage[]>> =>
    <BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, KeyResponse<Models.VodMonthlyUsage[]>>>{
        type: vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED,
        payload
    };

export const fetchVodUsageError = (error): BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, object> =>
    <BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, object>>{
        type: vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_ERROR,
        payload: error
    };

export const fetchVodUsageCancelled = (): BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED, null> =>
    <BaseAction<vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED, null>>{
        type: vodUsageActionTypes.VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED,
        payload: null
    };