import React, { Component } from 'react';
import { Circle, G, Path, Text } from 'react-native-svg';
import { fontAdapt } from './util';
import _ from 'lodash';
import { scale } from '../../../helpers/scaleHelper';
const Pathjs = require('paths-js/path');

interface Props {
  chartArea;
  options;
  chartScale;
  unit;
}

export class AxisStruct {
  chartScale;
  options;
  chartArea;
  margin;
  horizontal;

  constructor(chartScale, options, chartArea, horizontal) {
    this.chartScale = chartScale
    this.options = options
    this.chartArea = chartArea
    this.margin = chartArea.margin
    this.horizontal = horizontal
  }

  static calcStepSize(range, targetSteps) {
    const tempStep = range / targetSteps
    const mag = Math.floor(Math.log(tempStep) / Math.log(10))
    const magPow = Math.pow(10, mag)
    let magMsd = Math.round(tempStep / magPow + 0.5)

    if (magMsd > 5.0)
      magMsd = 10.0
    else if (magMsd > 2.0)
      magMsd = 5.0
    else if (magMsd > 1.0)
      magMsd = 2.0

    return magMsd * magPow
  }

  static roundFloat(floatVal, decimalPlaces) {
    return Math.round(parseFloat((floatVal * Math.pow(10, decimalPlaces)).toFixed(decimalPlaces))) / Math.pow(10, decimalPlaces)
  }

  static getTickValues(axis, tickCount, decimalPlaces) {
    const tickStep = AxisStruct.calcStepSize((axis.maxValue - axis.minValue), tickCount)
    const maxTick = axis.minValue + (tickCount * tickStep)
    let tickValues = _.range(axis.minValue, maxTick, tickStep)
    tickValues = tickValues.map(tickValue => {
      return AxisStruct.roundFloat(tickValue, decimalPlaces)
    })
    return tickValues
  }

  axis() {
    const horizontal = this.horizontal
    const xAxis = this.chartArea.x
    const yAxis = this.chartArea.y
    const currentAxis = horizontal ? xAxis : yAxis
    const tickInterval = this.options.tickCount || 6
    const decimalPlaces = this.options.decimalPlaces || 2
    const ticks = this.options.tickValues !== undefined && this.options.tickValues.length !== 0 ? _.map(this.options.tickValues, function (v) { return v.value }) : AxisStruct.getTickValues(currentAxis, tickInterval, decimalPlaces)
    const fixed = this.options.zeroAxis ? this.chartScale(0) : horizontal ? yAxis.min : xAxis.min
    const start = { x: horizontal ? xAxis.min : fixed, y: horizontal ? fixed : yAxis.min }
    const end = { x: horizontal ? xAxis.max : fixed, y: horizontal ? fixed : yAxis.max }
    const tailLength = this.options.tailLength || 10

    const margin = this.margin
    if (margin !== undefined) {
      if (horizontal) {
        start.x += (margin.left - tailLength) || 0
        start.y += margin.top || 0
        end.x += (margin.left) || 0
        end.y += margin.top || 0
      }
      else {
        start.x += margin.left || 0
        start.y += (margin.top + tailLength) || 0
        end.x += margin.left || 0
        end.y += (margin.top - tailLength) || 0
      }
    }
    return {

      item: currentAxis,
      path: Pathjs().moveto(start).lineto(end).closepath(),
      ticks: ticks,
      lines: ticks.map((c, i) => {
        let scaleBase = isNaN(c) ? i : c
        const lineStart = { x: horizontal ? this.chartScale(scaleBase) + margin.left : xAxis.min + margin.left, y: horizontal ? yAxis.min + margin.top : this.chartScale(scaleBase) + margin.top }
        return Pathjs().moveto(lineStart).lineto(horizontal ? lineStart.x : xAxis.max + margin.left, horizontal ? yAxis.max + (margin.top - tailLength) : lineStart.y)
      }, this)
    }
  }
}

export default class Axis extends Component<Props> {

  render() {
    const { chartArea, options, chartScale } = this.props
    const horizontal = options.orient === 'top' || options.orient === 'bottom'

    const axis = new AxisStruct(chartScale, options, chartArea, horizontal).axis()

    let textAnchor = 'start'
    if (options.orient === 'top' || options.orient === 'bottom') textAnchor = 'middle'
    if (options.orient === 'left') textAnchor = 'end'
    if (options.orient === 'right') textAnchor = 'start'

    let xy = [0, 0]
    if (options.orient === 'top') xy = [0, -5]
    if (options.orient === 'bottom') xy = [0, 5]
    if (options.orient === 'left') xy = [-5, -10]
    if (options.orient === 'right') xy = [5, 5]

    if (typeof options.color !== 'string') {
      options.color = '#f7f7f7'
    }

    if (typeof options.opacity !== 'number') {
      options.opacity = 0.5
    }

    if (typeof options.strokeWidth !== 'number') {
      options.strokeWidth = 3
    }

    if (typeof options.tickSize !== 'number') {
      options.tickSize = 2
    }

    if (typeof options.tickColor !== 'string') {
      options.tickColor = 'grey'
    }

    const textStyle = fontAdapt(options.label)
    const ticks = _.map(axis.ticks, (c, i) => {
      const label = options.labelFunction !== undefined ? options.labelFunction.apply(this, [c]) : c
      let scaleBase = isNaN(c) ? i : c
      let gxy = horizontal ? [chartScale(scaleBase), chartArea.y.min] : [chartArea.x.min, chartScale(scaleBase)]

      let returnValue
      if (label !== undefined && label !== null) {
        returnValue =
          <G key={i} x={scale(-24)} y={gxy[1] + scale(17)} rotate={"270"}>
            {options.showLabels &&
              <Text fontFamily={textStyle.fontFamily}
              fontSize={textStyle.fontSize} fontWeight={textStyle.fontWeight} fontStyle={textStyle.fontStyle}>
                {label}{this.props.unit}
              </Text>}
          </G>
      }

      return returnValue
    })

    let offset = {
      x: chartArea.margin.left * -3,
      y: chartArea.margin.top * -1
      // x: 0,
      // y: 0
    }

    let returnV = <G>
      <G x={offset.x} y={offset.y}>
        {options.showAxis ? <Path d={axis.path.print()} strokeOpacity={options.opacity} stroke={options.color} strokeWidth={0} fill="none" /> : null}
      </G>
      {ticks}
    </G>

    return returnV

  }
}
