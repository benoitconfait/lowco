import * as phoneUsageActionTypes from '../actionTypes/phoneUsageActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const setSelectedPhoneNumber = (phoneNumber): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.SET_SELECTED_PHONE_NUMBER, string> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.SET_SELECTED_PHONE_NUMBER, string>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.SET_SELECTED_PHONE_NUMBER,
        payload: phoneNumber
    };


export const fetchPhones = (): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES, null> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES, null>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES,
        payload: null
    };

export const fetchPhonesFulfilled = (payload: KeyResponse<Models.PhonesCollection>): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_FULFILLED, KeyResponse<Models.PhonesCollection>> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_FULFILLED, KeyResponse<Models.PhonesCollection>>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_FULFILLED,
        payload
    };

export const fetchPhonesError = (error): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_ERROR, object> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_ERROR, object>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_ERROR,
        payload: error
    };

export const fetchPhonesCancelled = (): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_CANCELLED, null> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_CANCELLED, null>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONES_CANCELLED,
        payload: null
    };

export const fetchPhoneUsage = (): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE, null> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE, null>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE,
        payload: null
    };

export const fetchPhoneUsageFulfilled = (payload: KeyResponse<any>): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_FULFILLED, KeyResponse<any>> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_FULFILLED, KeyResponse<any>>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_FULFILLED,
        payload
    };

export const fetchPhoneUsageError = (error): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_ERROR, object> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_ERROR, object>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_ERROR,
        payload: error
    };

export const fetchPhoneUsageCancelled = (): BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_CANCELLED, null> =>
    <BaseAction<phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_CANCELLED, null>>{
        type: phoneUsageActionTypes.PhoneUsageActionTypes.FETCH_PHONE_USAGE_CANCELLED,
        payload: null
    };
