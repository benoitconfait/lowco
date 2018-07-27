import { Observable } from 'rxjs/Observable';
import { ConnectionInfoActionTypes } from '../actionTypes/connectionInfoActionTypes';


import * as actions from '../actions/ConnectionInfoActions';

const fetchCustomerTriggers = [
    ConnectionInfoActionTypes.SET_CONNECTION_INFO
];

const setConnectionInfo = (connectionInfo) => Observable.of(actions.setConnectionInfo(connectionInfo));

export {
    setConnectionInfo
};
