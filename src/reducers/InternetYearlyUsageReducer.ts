import {
    InternetYearlyUsageActionTypes
} from '../actionTypes/internetYearlyUsageActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = Lowco.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    internetYearlyUsages: Models.NetMonthlyUsage[] | null,
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    internetYearlyUsages: null
};

type InternetUsageReducerActions =
    BaseAction<InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE, null> |
    BaseAction<InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_FULFILLED, KeyResponse<Models.NetMonthlyUsageCollection>> |
    BaseAction<InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_ERROR, object> |
    BaseAction<InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: InternetUsageReducerActions) => {
    switch (action.type) {
        case InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE:
            return {
                ...state,
                loading: true
            };
        case InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_FULFILLED:
            return {
                ...state,
                loading: false,
                error: null,
                internetYearlyUsages: action.payload && action.payload.response && action.payload.response.items ?
                    action.payload.response.items : null
            };
        case InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case InternetYearlyUsageActionTypes.FETCH_INTERNET_YEARLY_USAGE_CANCELLED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};
