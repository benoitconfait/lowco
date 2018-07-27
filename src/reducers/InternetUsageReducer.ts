import {
    InternetUsageActionTypes
} from '../actionTypes/internetUsageActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = VOO.Mobile.App.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    internetUsages: Models.NetMonthlyUsage[] | null,
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    internetUsages: null,
};

type InternetUsageReducerActions =
    BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE, null> |
    BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>> |
    BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR, object> |
    BaseAction<InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: InternetUsageReducerActions) => {
    switch (action.type) {
        case InternetUsageActionTypes.FETCH_INTERNET_USAGE:
            return {
                ...state,
                loading: true
            };
        case InternetUsageActionTypes.FETCH_INTERNET_USAGE_FULFILLED:
            return {
                ...state,
                loading: false,
                error: null,
                internetUsages: action.payload && action.payload.response && action.payload.response.items ?
                    _.reduce(action.payload.response.items, function (obj, item) {
                        obj[item.connectionId] = item
                        return obj;
                    }, {}) : null
            };
        case InternetUsageActionTypes.FETCH_INTERNET_USAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case InternetUsageActionTypes.FETCH_INTERNET_USAGE_CANCELLED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};
