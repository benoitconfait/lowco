import AppStateReducer from '../AppStateReducer';
import {
  appActive,
  appBackground,
  appInactive
} from '../../actions/AppStateActions';
import { Reducer } from 'redux-testkit';
import { APP_RUNNING_STATE } from '../../actionTypes/appStateActionTypes';

describe('reducers/AppStateReducer', () => {

  it('should set current state to active when app is launches', () => {

    const expectedResult = {
      current: APP_RUNNING_STATE.ACTIVE,
      previous: APP_RUNNING_STATE.INACTIVE
    };

    Reducer(AppStateReducer).expect(appActive()).toReturnState(expectedResult);
  });

  it('should set current state to active when app is launches from background', () => {

    const previousReduxSate = {
      current: APP_RUNNING_STATE.BACKGROUND,
      previous: APP_RUNNING_STATE.ACTIVE
    };

    const expectedResult = {
      current: APP_RUNNING_STATE.ACTIVE,
      previous: APP_RUNNING_STATE.BACKGROUND
    };

    Reducer(AppStateReducer).withState(previousReduxSate).expect(appActive()).toReturnState(expectedResult);
  });

  it('should set the correct state when app is background', () => {

    const previousReduxSate = {
      current: APP_RUNNING_STATE.ACTIVE,
      previous: APP_RUNNING_STATE.INACTIVE
    };

    const expectedResult = {
      current: APP_RUNNING_STATE.BACKGROUND,
      previous: APP_RUNNING_STATE.ACTIVE
    };

    Reducer(AppStateReducer).withState(previousReduxSate).expect(appBackground()).toReturnState(expectedResult);
  });

});