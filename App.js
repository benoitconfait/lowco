import React from 'react';
import Main from './build/components/Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  render() {
    return (
      <Main />
    );
  }
}