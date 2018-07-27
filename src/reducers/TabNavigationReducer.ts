import {
    NavigationActions
} from 'react-navigation';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import RootStackNavigator from '../components/RootStackNavigator';

export type State = any;

const INITIAL_STATE: State = RootStackNavigator.router.getStateForAction(NavigationActions.init(), null);
export default (state: State = INITIAL_STATE, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(action, state);

    return nextState || state;
};
