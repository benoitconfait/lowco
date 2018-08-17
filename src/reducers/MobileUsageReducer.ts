import {
    MobileUsageActionTypes
} from '../actionTypes/mobileUsageActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = Lowco.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    mobileUsages: Models.NetMonthlyUsage[] | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    mobileUsages: null
};

type MobileUsageReducerActions =
    BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE, null> |
    BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>> |
    BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR, object> |
    BaseAction<MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: MobileUsageReducerActions) => {
    switch (action.type) {
        case MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE:
            return {
                ...state,
                loading: true
            };
        case MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_FULFILLED:
            return {
                loading: false,
                error: null,
                mobileUsages: action.payload && action.payload.response && action.payload.response.items ?
                    _.reduce(action.payload.response.items, function (obj, item) {
                        obj[item.connectionId] = item
                        return obj;
                    }, {}) : null
            };
        case MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MobileUsageActionTypes.FETCH_AVERAGE_MOBILE_USAGE_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
