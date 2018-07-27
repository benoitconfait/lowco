import {
    CustomerActionTypes
} from '../actionTypes/customerActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = VOO.Mobile.App.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    birthdate: Date | null,
    customerId: string | null,
    emailAddress: string | null,
    firstname: string | null,
    gsmNumber: string | null,
    invoiceDeliveryType: VOO.Domain.Views.Billing.Account.invoiceDeliveryType | null,
    isEligibleForEBilling: boolean | null,
    isEligibleForFixDomiciliation: boolean | null,
    isSMSNotificationRequired: boolean | null,
    language: string | null,
    lastname: string | null,
    login: string | null,
    telephoneNumber: string | null,
    title: string | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    birthdate: null,
    customerId: null,
    emailAddress: null,
    firstname: null,
    gsmNumber: null,
    invoiceDeliveryType: null,
    isEligibleForEBilling: null,
    isEligibleForFixDomiciliation: null,
    isSMSNotificationRequired: null,
    language: null,
    lastname: null,
    login: null,
    telephoneNumber: null,
    title: null,
};

type CustomerReducerActions =
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER, null> |
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, KeyResponse<Models.Customer>> |
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, object> |
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, object>;

export default (state: State = INITIAL_STATE, action: CustomerReducerActions) => {
    switch (action.type) {
        case CustomerActionTypes.FETCH_CUSTOMER:
            return {
                ...state,
                loading: true
            };
        case CustomerActionTypes.FETCH_CUSTOMER_FULFILLED:
            return {
                loading: false,
                error: null,
                birthdate: action.payload && action.payload.response ? action.payload.response.birthdate : null,
                customerId: action.payload && action.payload.response ? action.payload.response.customerId : null,
                emailAddress: action.payload && action.payload.response ? action.payload.response.emailAddress : null,
                firstname: action.payload && action.payload.response ? action.payload.response.firstname : null,
                gsmNumber: action.payload && action.payload.response ? action.payload.response.gsmNumber : null,
                invoiceDeliveryType: action.payload && action.payload.response ? action.payload.response.invoiceDeliveryType : null,
                isEligibleForEBilling: action.payload && action.payload.response ? action.payload.response.isEligibleForEBilling : null,
                isEligibleForFixDomiciliation: action.payload && action.payload.response ? action.payload.response.isEligibleForFixDomiciliation : null,
                isSMSNotificationRequired: action.payload && action.payload.response ? action.payload.response.isSMSNotificationRequired : null,
                language: action.payload && action.payload.response ? action.payload.response.language : null,
                lastname: action.payload && action.payload.response ? action.payload.response.lastname : null,
                login: action.payload && action.payload.response ? action.payload.response.login : null,
                telephoneNumber: action.payload && action.payload.response ? action.payload.response.telephoneNumber : null,
                title: action.payload && action.payload.response ? action.payload.response.title : null
            };
        case CustomerActionTypes.FETCH_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CustomerActionTypes.FETCH_CUSTOMER_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
