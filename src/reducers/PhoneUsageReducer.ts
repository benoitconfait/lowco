import {
    PhoneUsageActionTypes
} from '../actionTypes/phoneUsageActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import moment from 'moment';
import translate from '../lang/translate';
import { callDeviceTypeToString, callLocalisationToString } from '../helpers/phoneCallHelper';
import Models = VOO.Mobile.App.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    phoneUsageCollection: Models.PhoneDailyUsageCollection | null,
    perDayUsages: Models.PerDayUsage[] | null,
    outOfBundle: any | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    phoneUsageCollection: null,
    perDayUsages: null,
    outOfBundle: null
};

type PhoneUsageReducerActions =
    BaseAction<PhoneUsageActionTypes.FETCH_PHONE_USAGE, null> |
    BaseAction<PhoneUsageActionTypes.FETCH_PHONE_USAGE_FULFILLED, KeyResponse<any>> |
    BaseAction<PhoneUsageActionTypes.FETCH_PHONE_USAGE_ERROR, object> |
    BaseAction<PhoneUsageActionTypes.FETCH_PHONE_USAGE_CANCELLED, object>;

const groupByDay = (phoneUsageCollection) => {
    if (phoneUsageCollection && phoneUsageCollection.items && phoneUsageCollection.items.length > 0) {
        const sortedCallRecords = phoneUsageCollection.items.sort((cdr1, cdr2) => cdr1.crCallBegin - cdr2.crCallBegin).reverse();
        let groupedRecords: Models.PerDayUsage[] = [];

        let cr = sortedCallRecords[0];
        let savedDate = moment(cr.crCallBegin).format(translate('LONG_DATE_FORMAT'));
        let dayUsage = <Models.PerDayUsage>{
            date: savedDate,
            totalTVAC: 0,
            items: []
        };
        for (let i = 0; i < sortedCallRecords.length; i++) {
            cr = sortedCallRecords[i];
            if (savedDate !== moment(cr.crCallBegin).format(translate('LONG_DATE_FORMAT'))) {

                groupedRecords.push(dayUsage);

                savedDate = moment(cr.crCallBegin).format(translate('LONG_DATE_FORMAT'));
                dayUsage = <Models.PerDayUsage>{
                    date: savedDate,
                    totalTVAC: 0,
                    items: []
                };
            }

            dayUsage.totalTVAC += sortedCallRecords[i].crPriceTVAC;
            dayUsage.items.push(<Models.PhoneCallRecord>{
                callDeviceType: translate(callDeviceTypeToString(cr.callDeviceType)),
                callLocalisation: translate(callLocalisationToString(cr.callLocalisation)),
                crCallBegin: cr.crCallBegin,
                crDest: cr.crDest,
                crDuration: cr.crDuration,
                crPriceTVAC: cr.crPriceTVAC,
                isIncluded: cr.isIncluded
            });
        }
        groupedRecords.push(dayUsage);

        return groupedRecords;
    }

    return null;
};

const getOutOfBundleTotals = (phoneUsageCollection) => {
    let nationalSeconds = 0;
    let nationalCost = 0;
    let internationalSeconds = 0;
    let internationalCost = 0;

    if (phoneUsageCollection && phoneUsageCollection.items && phoneUsageCollection.items.length > 0) {
        const national = phoneUsageCollection.items.filter(item => item.callLocalisation === 'National' && !item.isIncluded);
        const international = phoneUsageCollection.items.filter(item => item.callLocalisation !== 'National' && !item.isIncluded);

        const reducer = (accumulator, currentValue) => {
            return accumulator + currentValue;
        };

        if (national.length > 0) {
            nationalSeconds = national.map(i => i.crDuration).reduce(reducer);
            nationalCost = national.map(i => i.crPriceTVAC).reduce(reducer);
        }

        if (international.length > 0) {
            internationalSeconds = international.map(i => i.crDuration).reduce(reducer);
            internationalCost = international.map(i => i.crPriceTVAC).reduce(reducer);
        }
    }

    return {
        total: nationalCost + internationalCost,
        national: {
            minutes: Math.ceil(nationalSeconds / 60),
            cost: nationalCost
        },
        international: {
            minutes: Math.ceil(internationalSeconds / 60),
            cost: internationalCost
        }
    };
}

export default (state: State = INITIAL_STATE, action: PhoneUsageReducerActions) => {
    switch (action.type) {
        case PhoneUsageActionTypes.FETCH_PHONE_USAGE:
            return {
                ...state,
                loading: true
            };
        case PhoneUsageActionTypes.FETCH_PHONE_USAGE_FULFILLED:
            if (action.payload && action.payload.response) {
                const perDayUsages = groupByDay(action.payload.response);
                const outOfBundle = getOutOfBundleTotals(action.payload.response);
                return {
                    ...state,
                    loading: false,
                    error: null,
                    phoneUsageCollection: action.payload.response,
                    perDayUsages,
                    outOfBundle
                };
            }
            return state;
        case PhoneUsageActionTypes.FETCH_PHONE_USAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PhoneUsageActionTypes.FETCH_PHONE_USAGE_CANCELLED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
