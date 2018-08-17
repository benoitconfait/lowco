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
    callDetailRecordsHistory: Models.CallDetailRecordsHistory | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    callDetailRecordsHistory: null
};

type MobileUsageReducerActions =
    BaseAction<MobileUsageActionTypes.FETCH_MOBILE_CDR, null> |
    BaseAction<MobileUsageActionTypes.FETCH_MOBILE_CDR_FULFILLED, KeyResponse<any>> |
    BaseAction<MobileUsageActionTypes.FETCH_MOBILE_CDR_ERROR, object> |
    BaseAction<MobileUsageActionTypes.FETCH_MOBILE_CDR_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: MobileUsageReducerActions) => {
    switch (action.type) {
        case MobileUsageActionTypes.FETCH_MOBILE_CDR:
            return {
                ...state,
                loading: true
            };
        case MobileUsageActionTypes.FETCH_MOBILE_CDR_FULFILLED:
            return {
                loading: false,
                error: null,
                callDetailRecordsHistory: action.payload && action.payload.response ? action.payload.response : null
            };
        case MobileUsageActionTypes.FETCH_MOBILE_CDR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MobileUsageActionTypes.FETCH_MOBILE_CDR_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
