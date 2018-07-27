import { ErrorActionTypes } from '../actionTypes/errorActionTypes';
import BaseAction from './BaseAction';
import { LogData } from '../helpers/errorHelper';

export const throwHttp401Error = (): BaseAction<ErrorActionTypes.EMULATE_401_ERROR, object> =>
    <BaseAction<ErrorActionTypes.EMULATE_401_ERROR, object>>{
        type: ErrorActionTypes.EMULATE_401_ERROR,
        payload: {
            xhr: {
                status: 401
            },
            type: 'UNAUTHORIZED'
        }
    };

export const throwGeneralError = (): BaseAction<ErrorActionTypes.THROW_ERROR, object> =>
    <BaseAction<ErrorActionTypes.THROW_ERROR, object>>{
        type: ErrorActionTypes.THROW_ERROR,
        payload: {
            type: 'GENERAL'
        }
    };

export const throwNoWifiError = (): BaseAction<ErrorActionTypes.THROW_ERROR, object> =>
    <BaseAction<ErrorActionTypes.THROW_ERROR, object>>{
        type: ErrorActionTypes.THROW_ERROR,
        payload: {
            type: 'NO_WIFI'
        }
    };

export const clearError = (): BaseAction<ErrorActionTypes.CLEAR_ERROR, null> =>
    <BaseAction<ErrorActionTypes.CLEAR_ERROR, null>>{
        type: ErrorActionTypes.CLEAR_ERROR,
        payload: null
    };

export const logError = (error: LogData): BaseAction<ErrorActionTypes.LOG_ERROR, LogData> =>
    <BaseAction<ErrorActionTypes.LOG_ERROR, LogData>>{
        type: ErrorActionTypes.LOG_ERROR,
        payload: error
    };