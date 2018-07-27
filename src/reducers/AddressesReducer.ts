import {
    CustomerActionTypes
} from '../actionTypes/customerActionTypes';
import {
    AddressActionTypes
} from '../actionTypes/addressActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = VOO.Mobile.App.Models;
import AddressType = VOO.Domain.Views.Customer.AddressType;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: Error | null,
    billingAddress: Models.Address | null,
    contactAddress: Models.Address | null,
    usageAddresses: Models.Address[] | null,
    selectedPodId: string | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    billingAddress: null,
    contactAddress: null,
    usageAddresses: null,
    selectedPodId: null
};

export type AddressesReducerActions =
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER, null> |
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, KeyResponse<Models.Customer>> |
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error> |
    BaseAction<CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, object> |
    BaseAction<AddressActionTypes.SET_SELECTED_POD_ID, string>;

export default (state: State = INITIAL_STATE, action: AddressesReducerActions) => {
    switch (action.type) {
        case CustomerActionTypes.FETCH_CUSTOMER:
            return {
                ...state,
                loading: true
            };
        case CustomerActionTypes.FETCH_CUSTOMER_FULFILLED:
            const firstUsageAddress = action.payload && action.payload.response && action.payload.response.addresses ?
                action.payload.response.addresses.find((address) => address.addressType.toString() === 'Usage' || address.addressType === AddressType.Usage) : null;
            const billingAddress = action.payload && action.payload.response && action.payload.response.addresses ?
                action.payload.response.addresses.find((address) => address.addressType.toString() === 'Billing' || address.addressType === AddressType.Billing) || null : null;
            const contactAddress = action.payload && action.payload.response && action.payload.response.addresses ?
                action.payload.response.addresses.find((address) => address.addressType.toString() === 'Contact' || address.addressType === AddressType.Contact) || null : null;
            const usageAddresses = action.payload && action.payload.response && action.payload.response.addresses ?
                action.payload.response.addresses.filter((address) => address.addressType.toString() === 'Usage' || address.addressType === AddressType.Usage) : null;

            const selectedPodId = !state.selectedPodId && firstUsageAddress ? firstUsageAddress.pointOfDelivery : state.selectedPodId;
            return {
                loading: false,
                error: null,
                billingAddress,
                contactAddress,
                usageAddresses: usageAddresses && usageAddresses.length > 0 ? usageAddresses : null,
                selectedPodId
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
        case AddressActionTypes.SET_SELECTED_POD_ID:
            return {
                ...state,
                selectedPodId: action.payload
            };
        default:
            return state;
    }
};
