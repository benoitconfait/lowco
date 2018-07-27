import * as mobileSubscriptionsActionTypes from '../actionTypes/mobileSubscriptionsActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchMobileSubscriptions = (): BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS, null> =>
    <BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS, null>>{
        type: mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS,
        payload: null
    };

export const fetchMobileSubscriptionsFulfilled = (payload: KeyResponse<Models.MobileInformation>): BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, KeyResponse<Models.MobileInformation>> =>
    <BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, KeyResponse<Models.MobileInformation>>>{
        type: mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED,
        payload
    };

export const fetchMobileSubscriptionsError = (error): BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, object> =>
    <BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, object>>{
        type: mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR,
        payload: error
    };

export const fetchMobileSubscriptionsCancelled = (): BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED, null> =>
    <BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED, null>>{
        type: mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED,
        payload: null
    };

    export const setSelectedMSISDN = (msisdn): BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN, number> =>
    <BaseAction<mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN, number>>{
        type: mobileSubscriptionsActionTypes.MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN,
        payload: msisdn
    };