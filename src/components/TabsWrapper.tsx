import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import StackNavigator from './RootStackNavigator';
import ErrorHandler from './ErrorHandler';
import * as actions from '../actions/errorActions';
import Authorize from './Authorize';
import {
    createReduxBoundAddListener
  } from 'react-navigation-redux-helpers';

type ConnectedState = {
    tabNavigation: any
};

type ConnectedDispatch = {
};

interface Props {
    dispatch: any;
    tabNavigation: any;
}

interface State {

}



export class TabsWrapper extends React.Component<ConnectedState & ConnectedDispatch, State> {
    props: Props;
    constructor(props: Props) {
        super(props);
        this.props = props;
    }

    render() {
        const { dispatch, tabNavigation } = this.props;
        const addListener = createReduxBoundAddListener('root');
        return (
            <ErrorHandler>
                <Authorize>
                    <StackNavigator navigation={
                        addNavigationHelpers({
                            dispatch,
                            state: tabNavigation,
                            // @ts-ignore: addlistener not in typings file
                            addListener
                        })} />
                </Authorize>
            </ErrorHandler>

        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    clearError: () => dispatch(actions.clearError())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        tabNavigation: state.tabNavigation
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsWrapper);