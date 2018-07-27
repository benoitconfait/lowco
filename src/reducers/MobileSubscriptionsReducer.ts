import {
    MobileSubscriptionsActionTypes
} from '../actionTypes/mobileSubscriptionsActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = VOO.Mobile.App.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    mobileSubscriptions: Models.MobileSubscription[] | null,
    selectedMSISDN: number | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    mobileSubscriptions: null,
    selectedMSISDN: null
};

type MobileSubscriptionsReducerActions =
    BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS, null> |
    BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED, KeyResponse<Models.MobileInformation>> |
    BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR, object> |
    BaseAction<MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED, object> |
    BaseAction<MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN, number>;

export default (state: State = INITIAL_STATE, action: MobileSubscriptionsReducerActions) => {
    switch (action.type) {
        case MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS:
            return {
                ...state,
                loading: true
            };
        case MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_FULFILLED:
            const activeSubscriptions = action.payload && action.payload.response &&
                action.payload.response.subscriptions &&
                action.payload.response.subscriptions.length > 0 ?
                action.payload.response.subscriptions.filter((subscription) => subscription.simCard.status.toString() === 'Active') : [];
            return {
                loading: false,
                error: null,
                mobileSubscriptions: action.payload ? _.reduce(activeSubscriptions, function (obj, item) {
                    obj[item.msisdn] = item
                    return obj;
                }, {}) : null,
                selectedMSISDN: activeSubscriptions && activeSubscriptions.length > 0 ? activeSubscriptions[0].msisdn : null
            };
        case MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MobileSubscriptionsActionTypes.FETCH_MOBILE_SUBSCRIPTIONS_CANCELLED:
            return {
                ...state,
                loading: false
            };
        case MobileSubscriptionsActionTypes.SET_SELECTED_MSISDN:
            return {
                ...state,
                selectedMSISDN: action.payload
            };
        default:
            return state;
    }
};
