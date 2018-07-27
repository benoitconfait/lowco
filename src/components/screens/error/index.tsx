import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { COLOR_GRAY_20, COLOR_GRAY_80 } from '../../../styles/commonStyles';
import * as actions from '../../../actions/errorActions';
import ErrorIcon from '../../common/ErrorIcon';
import TextLabel from '../../common/TextLabel';
import Icon = VOO.Mobile.App.Enums.Icon;

import { Dispatch } from 'redux';
import { RootState } from '../../../reducers';
import { scale } from '../../../helpers/scaleHelper';

type ConnectedState = {
};

type ConnectedDispatch = {
  throwHttp401Error: () => void;
  clearError: () => void;
};

interface Props {
  throwHttp401Error: () => void;
  clearError: () => void;
  processOpenUrl: () => void;
  errorType: string;
  errorText: string;
}

interface State {
}

export class Summary extends React.Component<ConnectedState & ConnectedDispatch, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = {};
    this.props = props;
  }

  _throwHttp401Error() {
    console.log('401');
    this.props.throwHttp401Error();
  }

  _clearError() {
    this.props.clearError();
  }

  render() {
    const { errorType, errorText } = this.props;

    const text = errorText || `error type: ${errorType}`;
    if (errorType === 'UNAUTHORIZED') {
      return (
        <View style={styles.body}>
          <ErrorIcon icon={Icon.EXCLAMATION} />
          <TextLabel style={styles.errorTextWrapper} textStyle={styles.errorText} text={ text } />
          <Button onPress={this._throwHttp401Error.bind(this)} title="Login" />
        </View>
      );
    }
    if (errorType === 'WARNING') {
      return (
        <View style={styles.body}>
          <ErrorIcon icon={Icon.EXCLAMATION} />
          <TextLabel style={styles.errorTextWrapper} textStyle={styles.errorText} text={ text } />
        </View>
      );
    }
    if (errorType === 'NODATA') {
      return (
        <View style={styles.body}>
          <ErrorIcon icon={Icon.FACE_SMILE} />
          <TextLabel style={styles.errorTextWrapper} textStyle={styles.errorText} text={ text } />
        </View>
      );
    }
    return (
      <View style={styles.body}>
        <ErrorIcon icon={Icon.EXCLAMATION} />
        <TextLabel style={styles.errorTextWrapper} textStyle={styles.errorText} text={ text } />
        <Button onPress={this._clearError.bind(this)} title="Restart" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorTextWrapper: {
    alignItems: 'center',
    marginTop: scale(25),
    marginBottom: scale(25),
    paddingHorizontal: scale(50),
  },
  errorText: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    color: COLOR_GRAY_80
  }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
  throwHttp401Error: () => dispatch(actions.throwHttp401Error()),
  clearError: () => dispatch(actions.clearError())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
