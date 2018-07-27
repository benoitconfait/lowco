'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from '../../../helpers/scaleHelper';

import Bar  from './Bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: scale(1),
    paddingLeft: scale(10),
  },
});

interface Props {
  data: any;
  options:any;
  style: any;
}

class BarChartColumnBasic extends Component {
  props : any;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Bar (Column) - Basic`,
  });
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Bar data={this.props.data} options={this.props.options} accessorKey='v'/>
      </View>
    )
  }
}

export default BarChartColumnBasic;
