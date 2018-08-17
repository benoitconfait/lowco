import {
    CustomerOptionsActionTypes
} from '../actionTypes/customerOptionsActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = Lowco.Models;
var optionsData = require('../../assets/data/options.json');
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    options: Models.OptionViewResource[] | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    options: null
};

type CustomerOptionsReducerActions =
    BaseAction<CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS, null> |
    BaseAction<CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_FULFILLED, KeyResponse<Models.OptionViewCollectionResource>> |
    BaseAction<CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_ERROR, object> |
    BaseAction<CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_CANCELLED, object> |
    BaseAction<CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS, Models.OptionViewCollectionResource> |
    BaseAction<CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_FULFILLED, any> |
    BaseAction<CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_ERROR, object> |
    BaseAction<CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: CustomerOptionsReducerActions) => {
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
        case CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS:
            return {
                ...state,
                error: null,
                loading: true
            };
        case CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_FULFILLED:
            return {
                loading: false,
                error: null,
                options: action.payload && action.payload.response && action.payload.response.options ? 
                    action.payload.response.options.map((option) => addOptionMetaData(option)) : null
            };
        case CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_CANCELLED:
            return {
                ...state,
                loading: false
            };
        case CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS:
            return {
                ...state,
                error: null,
                loading: true
            };
        case CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_ERROR:
            const error = JSON.parse(JSON.stringify(action.payload));
            error.customMessage = 'UPDATE_FAILED';
            return {
                ...state,
                loading: false,
                error
            };
        case CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
