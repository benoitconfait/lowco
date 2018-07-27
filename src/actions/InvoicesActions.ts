import * as invoicesActionTypes from '../actionTypes/invoicesActionTypes';
import BaseAction from './BaseAction';
import KeyResponse from './KeyResponse';
import Models = VOO.Mobile.App.Models;

export const fetchInvoices = (): BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES, null> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES, null>>{
        type: invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES,
        payload: null
    };

export const fetchInvoicesFulfilled = (payload: KeyResponse<Models.InvoiceCollection>): BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_FULFILLED, KeyResponse<Models.InvoiceCollection>> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_FULFILLED, KeyResponse<Models.InvoiceCollection>>>{
        type: invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_FULFILLED,
        payload
    };

export const fetchInvoicesError = (error): BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_ERROR, object> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_ERROR, object>>{
        type: invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_ERROR,
        payload: error
    };

export const fetchInvoicesCancelled = (): BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_CANCELLED, null> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_CANCELLED, null>>{
        type: invoicesActionTypes.InvoicesActionTypes.FETCH_INVOICES_CANCELLED,
        payload: null
    };

export const downloadInvoice = (key: string): BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE, string> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE, string>>{
        type: invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE,
        payload: key
    };

export const downloadInvoiceFulfilled = (payload: string): BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_FULFILLED, string> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_FULFILLED, string>>{
        type: invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_FULFILLED,
        payload: payload
    };

export const downloadInvoiceError = (error): BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_ERROR, object> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_ERROR, object>>{
        type: invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_ERROR,
        payload: error
    };

export const downloadInvoiceCancelled = (): BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_CANCELLED, null> =>
    <BaseAction<invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_CANCELLED, null>>{
        type: invoicesActionTypes.InvoicesActionTypes.DOWNLOAD_INVOICE_CANCELLED,
        payload: null
    };