import {
    VodUsageActionTypes
} from '../actionTypes/vodUsageActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = VOO.Mobile.App.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    vodMonthlyUsages: Models.VodMonthlyUsage[] | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    vodMonthlyUsages: null
};

type VodUsageReducerActions =
    BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE, null> |
    BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED, KeyResponse<Models.VodMonthlyUsage[]>> |
    BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_ERROR, object> |
    BaseAction<VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: VodUsageReducerActions) => {
    switch (action.type) {
        case VodUsageActionTypes.FETCH_VOD_USAGE:
            return {
                ...state,
                loading: true
            };
        case VodUsageActionTypes.FETCH_VOD_USAGE_FULFILLED:
            return {
                loading: false,
                error: null,
                vodMonthlyUsages: action.payload && action.payload.response
            };
        case VodUsageActionTypes.FETCH_VOD_USAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case VodUsageActionTypes.FETCH_VOD_USAGE_CANCELLED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};
