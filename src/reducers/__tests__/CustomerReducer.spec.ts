import CustomerReducer, { State, INITIAL_STATE } from '../CustomerReducer';
import BaseAction from '../../actions/BaseAction';
import { CustomerActionTypes } from '../../actionTypes/customerActionTypes';
import { Reducer } from 'redux-testkit';
import Models = VOO.Mobile.App.Models;
import AddressType = VOO.Domain.Views.Customer.AddressType;

describe('reducers/CustomerReducer', () => {

  it('should set loading property to true on fetch of customer', () => {
    const fetchCustomerAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER, null> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER, null>>{
        type: CustomerActionTypes.FETCH_CUSTOMER
      };
    const expectedResult = {
      ...INITIAL_STATE,
      loading: true
    };
    Reducer(CustomerReducer).expect(fetchCustomerAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and customer properties on fetch of customer success', () => {
    const customer = <Models.Customer>{
      addresses: [],
      birthdate: new Date(),
      customerId: '0123456',
      emailAddress: 'john.doe@gmail.com',
      firstname: 'John',
      gsmNumber: '+32477889944',
      invoiceDeliveryType: VOO.Domain.Views.Billing.Account.invoiceDeliveryType.Nothing,
      isEligibleForEBilling: false,
      isEligibleForFixDomiciliation: false,
      isSMSNotificationRequired: false,
      language: 'FR',
      lastname: 'Doe',
      login: 'johndoe',
      telephoneNumber: '+3223547788',
      title: 'Mr',
      relations: []
    };
    const fetchCustomerFulfilledAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, Models.Customer> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_FULFILLED, Models.Customer>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_FULFILLED,
        payload: customer
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false,
      error: null,
      birthdate: customer.birthdate,
      customerId: customer.customerId,
      emailAddress: customer.emailAddress,
      firstname: customer.firstname,
      gsmNumber: customer.gsmNumber,
      invoiceDeliveryType: customer.invoiceDeliveryType,
      isEligibleForEBilling: customer.isEligibleForEBilling,
      isEligibleForFixDomiciliation: customer.isEligibleForFixDomiciliation,
      isSMSNotificationRequired: customer.isSMSNotificationRequired,
      language: customer.language,
      lastname: customer.lastname,
      login: customer.login,
      telephoneNumber: customer.telephoneNumber,
      title: customer.title
    };
    Reducer(CustomerReducer).expect(fetchCustomerFulfilledAction).toReturnState(expectedResult);
  });

  it('should set loading property to false and set the error property on fetch customer error', () => {
    const httpError: Error = new Error('http error');
    const fetchCustomerErrorAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_ERROR, Error>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_ERROR,
        payload: httpError
      };

    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };

    const expectedResult = {
      ...existingState,
      loading: false,
      error: httpError
    };
    Reducer(CustomerReducer).withState(existingState).expect(fetchCustomerErrorAction).toReturnState(expectedResult);
  });

  it('should set loading property to false on fetch of customer cancellation', () => {
    const fetchCustomerCancelledAction: BaseAction<CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, null> =
      <BaseAction<CustomerActionTypes.FETCH_CUSTOMER_CANCELLED, null>>{
        type: CustomerActionTypes.FETCH_CUSTOMER_CANCELLED
      };
    const existingState: State = {
      ...INITIAL_STATE,
      loading: true
    };
    const expectedResult = {
      ...existingState,
      loading: false
    };
    Reducer(CustomerReducer).withState(existingState).expect(fetchCustomerCancelledAction).toReturnState(expectedResult);
  });
});