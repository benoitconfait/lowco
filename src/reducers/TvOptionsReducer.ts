import {
    TvOptionsActionTypes
} from '../actionTypes/tvOptionsActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = VOO.Mobile.App.Models;
var optionsData = require('../../assets/data/options.json');

export type State = {
    loading: boolean,
    error?: object | null,
    parentalControlMinAgeRating: string | null,
    parentalControlPinCode: string | null,
    vodPurchaseCode: string | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    parentalControlMinAgeRating: null,
    parentalControlPinCode: null,
    vodPurchaseCode: null
};

type TvOptionsReducerActions =
    BaseAction<TvOptionsActionTypes.FETCH_TV_OPTIONS, null> |
    BaseAction<TvOptionsActionTypes.FETCH_TV_OPTIONS_FULFILLED, Models.TvParameters> |
    BaseAction<TvOptionsActionTypes.FETCH_TV_OPTIONS_ERROR, object> |
    BaseAction<TvOptionsActionTypes.FETCH_TV_OPTIONS_CANCELLED, object> |
    BaseAction<TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_AGE, string> |
    BaseAction<TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_PIN, string> |
    BaseAction<TvOptionsActionTypes.UPDATE_VOD_PURCHASE_CODE, string> |
    BaseAction<TvOptionsActionTypes.ACTIVATE_TV_OPTIONS, Models.TvParameters> |
    BaseAction<TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_FULFILLED, any> |
    BaseAction<TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_ERROR, object> |
    BaseAction<TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: TvOptionsReducerActions) => {
    const addOptionMetaData = (option) => {
        let result = { ...option };
        const foundOption = optionsData.find(x => x.key === option.externalId);
        if (foundOption) {
            result.name = (foundOption.name && foundOption.name.fr) || foundOption.key;
            result.description = (foundOption.description && foundOption.description.fr) || '';
            result.priority = foundOption.priority || 0;
        }
        return result;
    };

    switch (action.type) {
        case TvOptionsActionTypes.FETCH_TV_OPTIONS:
            return {
                ...state,
                error: null,
                loading: true
            };
        case TvOptionsActionTypes.FETCH_TV_OPTIONS_FULFILLED:
            return {
                loading: false,
                error: null,
                parentalControlMinAgeRating: action.payload && action.payload.parentalControlMinAgeRating,
                parentalControlPinCode: action.payload && action.payload.parentalControlPinCode,
                vodPurchaseCode: action.payload && action.payload.vodPurchaseCode
            };
        case TvOptionsActionTypes.FETCH_TV_OPTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case TvOptionsActionTypes.FETCH_TV_OPTIONS_CANCELLED:
            return {
                ...state,
                loading: false
            };
        case TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_AGE:
            return {
                ...state,
                parentalControlMinAgeRating: action.payload
            }
        case TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_PIN:
            return {
                ...state,
                parentalControlPinCode: action.payload
            }
        case TvOptionsActionTypes.UPDATE_VOD_PURCHASE_CODE:
            return {
                ...state,
                vodPurchaseCode: action.payload
            }
        case TvOptionsActionTypes.ACTIVATE_TV_OPTIONS:
            return {
                ...state,
                error: null,
                loading: true
            }
        case TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_FULFILLED:
            return {
                ...state,
                loading: false,
                error: null
            };
        case TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_ERROR:
            const error = JSON.parse(JSON.stringify(action.payload));
            error.customMessage = 'UPDATE_FAILED';
            return {
                ...state,
                loading: false,
                error
            };
        case TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
