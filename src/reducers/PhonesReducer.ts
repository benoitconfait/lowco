import {
    PhoneUsageActionTypes
} from '../actionTypes/phoneUsageActionTypes';
import BaseAction from '../actions/BaseAction';
import Models = VOO.Mobile.App.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    phones: Array<Models.Phone> | null,
    selectedPhoneNumber: string | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    phones: null,
    selectedPhoneNumber: null
};

type PhonesReducerActions =
    BaseAction<PhoneUsageActionTypes.FETCH_PHONES, null> |
    BaseAction<PhoneUsageActionTypes.FETCH_PHONES_FULFILLED, KeyResponse<Models.PhonesCollection>> |
    BaseAction<PhoneUsageActionTypes.FETCH_PHONES_ERROR, object> |
    BaseAction<PhoneUsageActionTypes.FETCH_PHONES_CANCELLED, object> |
    BaseAction<PhoneUsageActionTypes.SET_SELECTED_PHONE_NUMBER, null>;


export default (state: State = INITIAL_STATE, action: PhonesReducerActions) => {
    switch (action.type) {
        case PhoneUsageActionTypes.FETCH_PHONES:
            return {
                ...state,
                loading: true
            };
        case PhoneUsageActionTypes.FETCH_PHONES_FULFILLED:
            return {
                ...state,
                loading: false,
                error: null,
                phones: action.payload && action.payload.response && action.payload.response.items ? action.payload.response.items : null,
                selectedPhoneNumber: action.payload 
                    && action.payload.response
                    && action.payload.response.items
                    && action.payload.response.items[0] ? action.payload.response.items[0].esId : null
            };
        case PhoneUsageActionTypes.FETCH_PHONES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PhoneUsageActionTypes.FETCH_PHONES_CANCELLED:
            return {
                ...state,
                loading: false
            }
        case PhoneUsageActionTypes.SET_SELECTED_PHONE_NUMBER:
            return {
                ...state,
                selectedPhoneNumber: action.payload
            };
        default:
            return state;
    }
};
