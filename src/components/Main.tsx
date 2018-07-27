import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Linking } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'remote-redux-devtools';
import 'rxjs/Rx';
import TabsWrapper from './TabsWrapper';
import { reducers } from '../reducers';
import { rootEpic } from '../epics';
import { initLocal as initializeLanguage } from '../lang/translate';
import { post, get, put } from '../epics/ajaxObservable';
import authMiddleware from '../middlewares/authMiddleware';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import LinkRoutes from './LinkRoutes';

const ajax = {
    post: post,
    put: put,
    get: get,
};

const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: { ajax: ajax }
});

const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.tabNavigation,
);

const configureStore = () => {

    let store = createStore(reducers, {}, composeWithDevTools(
        applyMiddleware(reactNavigationMiddleware, epicMiddleware, authMiddleware)
    ));

    let persistor = persistStore(store);

    return { persistor, store };
};

export const reduxStore = configureStore();

interface Props {
}
interface State {
}

const prefix = Platform.OS == 'android' ? 'lowco://lowco/' : 'lowco://';

class Main extends React.Component<Props, State> {
    componentDidMount() {
        Linking.addEventListener('url', event => this.handleOpenURL(event.url));
        Linking.getInitialURL().then(url => url && this.handleOpenURL(url));
    }

    componentWillMount() {
        initializeLanguage();
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL(url) {
        const path = url.split(':/')[1];
        LinkRoutes(path, reduxStore.store);
    }

    render() {
        return (
            <Provider store={reduxStore.store} >
                <TabsWrapper dispatch={reduxStore.store.dispatch} />
            </Provider>
        );
    }
}

export default Main;