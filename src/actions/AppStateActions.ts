import { AppStateActionTypes } from '../actionTypes/appStateActionTypes';
import BaseAction from './BaseAction';

export const appActive = (): BaseAction<AppStateActionTypes.ACTIVE, null> =>
    <BaseAction<AppStateActionTypes.ACTIVE, null>>{
        type: AppStateActionTypes.ACTIVE
    };

    export const appInactive = (): BaseAction<AppStateActionTypes.INACTIVE, null> =>
    <BaseAction<AppStateActionTypes.INACTIVE, null>>{
        type: AppStateActionTypes.INACTIVE
    };

    export const appBackground = (): BaseAction<AppStateActionTypes.BACKGROUND, null> =>
    <BaseAction<AppStateActionTypes.BACKGROUND, null>>{
        type: AppStateActionTypes.BACKGROUND
    };
