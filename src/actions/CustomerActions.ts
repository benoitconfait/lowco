import * as customerActionTypes from '../actionTypes/customerActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchCustomer = (): BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER, null> =>
    <BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER, null>>{
        type: customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER,
        payload: null
    };

export const fetchCustomerFulfilled = (payload: KeyResponse<Models.Customer>): BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, KeyResponse<Models.Customer>> =>    
    <BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, KeyResponse<Models.Customer>>>{
        type: customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_FULFILLED,
        payload
    };

export const fetchCustomerError = (error): BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_ERROR, object> =>
    <BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_ERROR, object>>{
        type: customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_ERROR,
        payload: error
    };

export const fetchCustomerCancelled = (): BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, null> =>
    <BaseAction<customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, null>>{
        type: customerActionTypes.CustomerActionTypes.FETCH_CUSTOMER_CANCELLED,
        payload: null
    };