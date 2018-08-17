import {
    InvoicesActionTypes
} from '../actionTypes/invoicesActionTypes';
import BaseAction from '../actions/BaseAction';
import Models = Lowco.Models;
import KeyResponse from '../actions/KeyResponse';

export type State = {
    loading: boolean,
    error?: object | null,
    invoices: Array<Models.Invoice> | null
};

export const INITIAL_STATE: State = {
    loading: false,
    error: null,
    invoices: null
};

type PhonesReducerActions =
    BaseAction<InvoicesActionTypes.FETCH_INVOICES, null> |
    BaseAction<InvoicesActionTypes.FETCH_INVOICES_FULFILLED, KeyResponse<Models.InvoiceCollection>> |
    BaseAction<InvoicesActionTypes.FETCH_INVOICES_ERROR, object> |
    BaseAction<InvoicesActionTypes.FETCH_INVOICES_CANCELLED, object>;


export default (state: State = INITIAL_STATE, action: PhonesReducerActions) => {
    switch (action.type) {
        case InvoicesActionTypes.FETCH_INVOICES:
            return {
                ...state,
                loading: true
            };
        case InvoicesActionTypes.FETCH_INVOICES_FULFILLED:
            return {
                ...state,
                loading: false,
                error: null,
                invoices: action.payload && action.payload.response && action.payload.response.items ?
                    action.payload.response.items : null
            };
        case InvoicesActionTypes.FETCH_INVOICES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case InvoicesActionTypes.FETCH_INVOICES_CANCELLED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};
