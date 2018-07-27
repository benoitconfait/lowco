import * as customerOptionsActionTypes from '../actionTypes/customerOptionsActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;
import { OptionActivationOrigins } from '../actionTypes/customerOptionsActionTypes';

export interface OptionActivationPayload {
    options: Models.OptionViewResource[],
    origin: OptionActivationOrigins
}

export const fetchCustomerOptions = (force?: boolean): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS, boolean> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS, boolean>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS,
        payload: force
    };

export const fetchCustomerOptionsFulfilled = (payload: KeyResponse<Models.OptionViewCollectionResource>): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_FULFILLED, KeyResponse<Models.OptionViewCollectionResource>> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_FULFILLED, KeyResponse<Models.OptionViewCollectionResource>>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_FULFILLED,
        payload
    };

export const fetchCustomerOptionsError = (error): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_ERROR, object> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_ERROR, object>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_ERROR,
        payload: error
    };

export const fetchCustomerOptionsCancelled = (): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_CANCELLED, null> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_CANCELLED, null>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.FETCH_CUSTOMER_OPTIONS_CANCELLED,
        payload: null
    };

export const activateCustomerOptions = (data: any, activationOrigin: OptionActivationOrigins): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS, OptionActivationPayload> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS, OptionActivationPayload>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS,
        payload: {
            options: data,
            origin: activationOrigin
        }
    };

export const activateCustomerOptionsFulfilled = (response: any): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_FULFILLED, any> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_FULFILLED, any>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_FULFILLED,
        payload: response
    };

export const activateCustomerOptionsError = (error): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_ERROR, object> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_ERROR, object>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_ERROR,
        payload: error
    };

export const activateCustomerOptionsCancelled = (): BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_CANCELLED, null> =>
    <BaseAction<customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_CANCELLED, null>>{
        type: customerOptionsActionTypes.CustomerOptionsActionTypes.ACTIVATE_CUSTOMER_OPTIONS_CANCELLED,
        payload: null
    };