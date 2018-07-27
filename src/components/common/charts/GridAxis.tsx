import React, { Component } from 'react'
import { G, Path } from 'react-native-svg'
import _ from 'lodash'
import { AxisStruct } from './Axis'

interface Props{
  chartArea:any;
  options:any;
  scale:any;
}

export default class GridAxis extends Component<Props> {

  render() {
    const { chartArea, options, scale } = this.props
    const horizontal = options.orient ==='top' || options.orient ==='bottom'

    const axis = new AxisStruct(scale,options,chartArea,horizontal).axis()

    if (typeof options.gridColor !== 'string') {
      options.gridColor = '#cccccc'
    }

    if (typeof options.opacity !== 'number') {
      options.opacity = 0.5
    }

    const gridLines = options.showLines ? _.map(axis.lines, function (c, i) {
      return (
               <Path key={'gridLines' + i} d={c.print()} strokeOpacity={options.opacity} stroke={options.gridColor} fill="none"/>
            )
    }) : []

    let offset = {
      x: chartArea.margin.left * -1,
      y: chartArea.margin.top * -1
    };

    let returnV = <G x={offset.x} y={offset.y}>
      {gridLines}
    </G>;

    return returnV

  }
}
