import * as tvOptionsActionTypes from '../actionTypes/tvOptionsActionTypes';
import BaseAction from './BaseAction';
import Models = VOO.Mobile.App.Models;

export const fetchTvOptions = (): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS, null> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS, null>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS,
        payload: null
    };

export const fetchTvOptionsFulfilled = (response: Models.OptionViewCollectionResource): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_FULFILLED, Models.OptionViewCollectionResource> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_FULFILLED, Models.OptionViewCollectionResource>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_FULFILLED,
        payload: response
    };

export const fetchTvOptionsError = (error): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_ERROR, object> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_ERROR, object>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_ERROR,
        payload: error
    };

export const fetchTvOptionsCancelled = (): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_CANCELLED, null> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_CANCELLED, null>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.FETCH_TV_OPTIONS_CANCELLED,
        payload: null
    };


export const updateParentalControlAge = (age: string): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_AGE, string> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_AGE, string>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_AGE,
        payload: age
    };

export const updateParentalControlPin = (pin: string): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_PIN, string> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_PIN, string>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_PARENTAL_CONTROL_PIN,
        payload: pin
    };

export const updateVODPurchaseCode = (code: string): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_VOD_PURCHASE_CODE, string> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_VOD_PURCHASE_CODE, string>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.UPDATE_VOD_PURCHASE_CODE,
        payload: code
    };

export const activateTvOptions = (data: any): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS, any> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS, any>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS,
        payload: data
    };

export const activateTvOptionsFulfilled = (response: any): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_FULFILLED, any> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_FULFILLED, any>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_FULFILLED,
        payload: response
    };

export const activateTvOptionsError = (error): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_ERROR, object> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_ERROR, object>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_ERROR,
        payload: error
    };

export const activateTvOptionsCancelled = (): BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_CANCELLED, null> =>
    <BaseAction<tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_CANCELLED, null>>{
        type: tvOptionsActionTypes.TvOptionsActionTypes.ACTIVATE_TV_OPTIONS_CANCELLED,
        payload: null
    };