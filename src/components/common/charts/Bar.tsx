import React, { Component } from 'react';
import { Text as ReactText } from 'react-native';
import Svg, { G, Path, Text, Rect } from 'react-native-svg';
import { Colors, Options, fontAdapt, cyclic, color, identity } from './util';
import _ from 'lodash';
import Axis from './Axis';
import GridAxis from './GridAxis';
import { scale } from '../../../helpers/scaleHelper';
const Bar = require('paths-js/bar');



interface Props {
  data: any;
  options: any;
  accessorKey: string;
}

export default class BarChart extends Component<Props> {
  color(i) {
    let color = this.props.options.color
    if (!_.isString(this.props.options.color)) color = color.color
    const pallete = '#83b603';
    return pallete;
    //return Colors.string(cyclic(pallete, i))
  }

  getMaxAndMin(values, chartScale) {
    const axisY = this.props.options.axisY
    let maxValue = axisY.max || 0
    let minValue = axisY.min || 0

    let max = _.max(values)
    if (max > maxValue) maxValue = max
    let min = _.min(values)
    if (min < minValue) minValue = min

    return {
      minValue: minValue,
      maxValue: maxValue,
      min: chartScale(minValue),
      max: chartScale(maxValue)
    }
  }

  render() {
    const noDataMsg = 'No data available'
    if (!this.props.data) return (<ReactText>{noDataMsg}</ReactText>)

    let options = new Options(this.props)
    let accessor = identity(this.props.accessorKey)
    let chart = Bar({
      data: this.props.data,
      gutter: scale(20),
      width: options.chartWidth,
      height: options.chartHeight,
      accessor: accessor,
      min: this.props.options.axisY.min || undefined,
      max: this.props.options.axisY.max || undefined
    })

    let values = chart.curves.map((curve) => accessor(curve.item))
    let chartArea = {
      x: { minValue: 0, maxValue: 200, min: 0, max: options.chartWidth },
      y: this.getMaxAndMin(values, chart.scale),
      margin: options.margin
    }

    let textStyle = fontAdapt(options.axisX.label)
    let labelOffset = this.props.options.axisX.label.offset || 20

    let lines = chart.curves.map((c, i) => {
      let numDataGroups = this.props.data.length || 0
      let colorVariationVal = numDataGroups > 1 ? numDataGroups : 3
      let color = this.color(i % colorVariationVal)
      let stroke = Colors.darkenColor(color)
      return (
        <G key={'lines' + i}>
          <Path d={c.line.path.print()} stroke={stroke} fill={color} />
          <Text fontFamily={textStyle.fontFamily}
              fontSize={textStyle.fontSize} fontWeight={textStyle.fontWeight} fontStyle={textStyle.fontStyle}
              fill={textStyle.fill} textAnchor="middle"   x={c.line.centroid[0] + scale(40)} y={labelOffset + chartArea.y.min + scale(10)}  originX={c.line.centroid[0]} originY={labelOffset + chartArea.y.min + scale(5)} rotate={"270"}>
          {this.props.data[0][i].v ? this.props.data[0][i].v : '0.00' }{this.props.data[0][i].unit}
          </Text>
          {options.axisX.showLabels ?
            <Text fontFamily={textStyle.fontFamily}
              fontSize={textStyle.fontSize} fontWeight={textStyle.fontWeight} fontStyle={textStyle.fontStyle}
              fill={textStyle.fill} x={c.line.centroid[0]} y={labelOffset + chartArea.y.min}
              originX={c.line.centroid[0]} originY={labelOffset + chartArea.y.min} rotate={"270"}
              textAnchor="middle">
              {c.item.name}
            </Text>
            : null}
        </G>
      )
    }, this)

    const canvasWidth = options.height - scale(15);
    const canvasHeight = options.width - scale(10);

    return (<Svg width={canvasWidth} height={canvasHeight}>
      <G x={canvasWidth - options.margin.left} y={options.margin.top + scale(15)} rotate="90" >
        <GridAxis scale={chart.scale} options={options.axisY} chartArea={chartArea} />
        {lines}
        <Axis chartScale={chart.scale} options={options.axisY} chartArea={chartArea} unit={this.props.data[0][0].unit} />
      </G>
    </Svg>)
  }
}


