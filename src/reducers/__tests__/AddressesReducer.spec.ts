import AddressesReducer, { State, INITIAL_STATE } from '../AddressesReducer';
import BaseAction from '../../actions/BaseAction';
import { CustomerActionTypes } from '../../actionTypes/customerActionTypes';
import { AddressActionTypes } from '../../actionTypes/addressActionTypes';
import { Reducer } from 'redux-testkit';
import Models = VOO.Mobile.App.Models;
import AddressType = VOO.Domain.Views.Customer.AddressType;

describe('reducers/AddressesReducer', () => {

  it('should set loading property to true on fetch of customer', () => {
    const fetchCustomerAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER, null> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER, null>>{
        type: CustomerActionTypes.FETCH_CUSTOMER
      };
    const expectedResult = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(AddressesReducer).expect(fetchCustomerAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and addresses on fetch of customer success', () => {
    const billingAddress= <Models.Address>{
      addressType: AddressType.Billing,
      boxNumber: '100',
      city: 'FORCHIES-LA-MARCHE',
      cityIds: [<Models.Identifier>{
        "system": "esb",
        "value": "200000000056"
      }],
      countryCode: "BE",
      houseNumber: "358",
      id: -1613842695,
      productAvailability: {},
      productPresence: {},
      street: 'RUE DE PIETON',
      streetId: 88857,
      zipCode: '6141'
    };
    const contactAddress= <Models.Address>{
      addressType: AddressType.Contact,
      boxNumber: '100',
      city: 'FORCHIES-LA-MARCHE',
      cityIds: [<Models.Identifier>{
        "system": "esb",
        "value": "200000000056"
      }],
      countryCode: "BE",
      houseNumber: "358",
      id: -1613842695,
      productAvailability: {},
      productPresence: {},
      street: 'RUE DE PIETON',
      streetId: 88857,
      zipCode: '6141'
    };
    const usageAddress1= <Models.Address>{
      addressType: AddressType.Usage,
      boxNumber: '100',
      city: 'FORCHIES-LA-MARCHE',
      cityIds: [<Models.Identifier>{
        "system": "esb",
        "value": "200000000056"
      }],
      countryCode: "BE",
      houseNumber: "358",
      id: -1613842695,
      productAvailability: {},
      productPresence: {},
      street: 'RUE DE PIETON',
      streetId: 88857,
      zipCode: '6141',
      pointOfDelivery: '001122334455'
    };
    const usageAddress2= <Models.Address>{
      addressType: AddressType.Usage,
      boxNumber: '100',
      city: 'FORCHIES-LA-MARCHE',
      cityIds: [<Models.Identifier>{
        "system": "esb",
        "value": "200000000056"
      }],
      countryCode: "BE",
      houseNumber: "360",
      id: -1613842695,
      productAvailability: {},
      productPresence: {},
      street: 'RUE DE PIETON',
      streetId: 88857,
      zipCode: '6141',
      pointOfDelivery: '001122334456'
    };
    const fetchCustomerFulfilledAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, Models.Customer> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, Models.Customer>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_FULFILLED,
        payload: <Models.Customer>{
          addresses: [billingAddress, contactAddress, usageAddress1, usageAddress2]
        }
      };
    const existingState: State = {
      loading: true,
      error: null,
      billingAddress: null,
      contactAddress: null,
      usageAddresses: null,
      selectedPodId: null
    };
    const expectedResult = {
      ...existingState,
      loading: false,
      billingAddress,
      contactAddress,
      usageAddresses: [usageAddress1, usageAddress2],
      selectedPodId: '001122334455'
    };
    Reducer(AddressesReducer).expect(fetchCustomerFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch customer error', () => {
    const httpError: Error = new Error('http error');
    const fetchCustomerErrorAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_ERROR,
        payload: httpError
      };

    const existingState: State = {
      loading: true,
      error: null,
      billingAddress: null,
      contactAddress: null,
      usageAddresses: null,
      selectedPodId: null
    };

    const expectedResult = {
      ...existingState,
      loading: false,
      error: httpError
    };
    Reducer(AddressesReducer).withState(existingState).expect(fetchCustomerErrorAction).toReturnState(expectedResult);
  });

  it('should set loading property to false on fetch of customer cancellation', () => {
    const fetchCustomerCancelledAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, null> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, null>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_CANCELLED
      };
    const existingState: State = {
      loading: true,
      error: null,
      billingAddress: null,
      contactAddress: null,
      usageAddresses: null,
      selectedPodId: null
    };
    const expectedResult = {
      ...existingState,
      loading: false
    };
    Reducer(AddressesReducer).withState(existingState).expect(fetchCustomerCancelledAction).toReturnState(expectedResult);
  });

  it('should set selected pod id on set selected pod id action', () => {
    const setSelectedPodIdAction: BaseAction<AddressActionTypes.SET_SELECTED_POD_ID, string> =
      <BaseAction<AddressActionTypes.SET_SELECTED_POD_ID, string>>{
        type: AddressActionTypes.SET_SELECTED_POD_ID,
        payload: '0011224455'
      };
    const existingState: State = {
      loading: false,
      error: null,
      billingAddress: null,
      contactAddress: null,
      usageAddresses: null,
      selectedPodId: null
    };
    const expectedResult = {
      ...existingState,
      selectedPodId: '0011224455'
    };
    Reducer(AddressesReducer).withState(existingState).expect(setSelectedPodIdAction).toReturnState(expectedResult);
  });

});