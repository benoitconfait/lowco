import * as connectionInfoActionTypes from '../actionTypes/connectionInfoActionTypes';
import BaseAction from './BaseAction';
import Models = VOO.Mobile.App.Models;

export const setConnectionInfo = (connectionInfo: Models.ConnectionInfo): BaseAction<connectionInfoActionTypes.ConnectionInfoActionTypes.SET_CONNECTION_INFO, Models.ConnectionInfo> =>
    <BaseAction<connectionInfoActionTypes.ConnectionInfoActionTypes.SET_CONNECTION_INFO, Models.ConnectionInfo>>{
        type: connectionInfoActionTypes.ConnectionInfoActionTypes.SET_CONNECTION_INFO,
        payload: connectionInfo
    };
