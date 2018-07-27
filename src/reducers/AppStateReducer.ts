import { APP_RUNNING_STATE, AppStateActionTypes } from '../actionTypes/appStateActionTypes';
export interface State {
    current: APP_RUNNING_STATE;
    previous: APP_RUNNING_STATE;
}

export const INITIAL_STATE: State = {
    current: APP_RUNNING_STATE.INACTIVE,
    previous: APP_RUNNING_STATE.INACTIVE
};

export default (state = INITIAL_STATE, action) => {
    const previous = state.current;

    switch (action.type) {
        case AppStateActionTypes.ACTIVE:
            return {
                current: APP_RUNNING_STATE.ACTIVE,
                previous: previous
            };
        case AppStateActionTypes.BACKGROUND:
            return {
                current: APP_RUNNING_STATE.BACKGROUND,
                previous: previous
            };
        case AppStateActionTypes.INACTIVE:
            return {
                current: APP_RUNNING_STATE.INACTIVE,
                previous: previous
            };
        default:
            return state;
    }
};