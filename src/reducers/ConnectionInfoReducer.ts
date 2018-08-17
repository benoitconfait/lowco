import {
    ConnectionInfoActionTypes
} from '../actionTypes/connectionInfoActionTypes';
import BaseAction from '../actions/BaseAction';
import _ from 'lodash';
import Models = Lowco.Models;

export type State = {
    connectionType: string;
    effectiveType: string;
    offline: boolean;
};

export const INITIAL_STATE: State = {
    connectionType: 'unknown',
    effectiveType: 'unknown',
    offline: false
};

type ConnectionInfoReducerActions =
    BaseAction<ConnectionInfoActionTypes.SET_CONNECTION_INFO, Models.ConnectionInfo>;

export default (state: State = INITIAL_STATE, action: ConnectionInfoReducerActions) => {
    switch (action.type) {
        case ConnectionInfoActionTypes.SET_CONNECTION_INFO:
            return {
                connectionType: action.payload && action.payload.type,
                effectiveType: action.payload && action.payload.effectiveType,
                offline: action.payload && action.payload.type === 'none'
            };
        default:
            return state;
    }
};
