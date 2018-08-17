import * as addressActionTypes from '../actionTypes/addressActionTypes';
import BaseAction from './BaseAction';
import Models = Lowco.Models;

export const setSelectedPodId = (podId): BaseAction<addressActionTypes.AddressActionTypes.SET_SELECTED_POD_ID, string> =>
    <BaseAction<addressActionTypes.AddressActionTypes.SET_SELECTED_POD_ID, string>>{
        type: addressActionTypes.AddressActionTypes.SET_SELECTED_POD_ID,
        payload: podId
    };
