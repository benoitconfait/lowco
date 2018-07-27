import React from 'react';
import { View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import translate from '../../../lang/translate';
import {
    COLOR_DEFAULT_PACK
} from '../../../styles/commonStyles';
import BarChartColumnBasic from './BarChartColumnBasic';
import { scale } from '../../../helpers/scaleHelper';
import moment from 'moment';
import Icon = VOO.Mobile.App.Enums.Icon;


function BarChart({ style, usage, yearlyUsagesForPod, selectedPodId, navigation, showDailyChart = false, showMonthlyChart = false }) {
    let usageTexts;
    let limited = false;
    let progress = 1;
    let barChartData: any[][] = [];

    let barChartOptions = {
        width: scale(3000),
        height: scale(210),
        margin: {
            top: scale(20),
            left: scale(25),
            bottom: scale(50),
            right: scale(50)
        },
        color: '#2980B9',
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition: 3
        },
        axisX: {
            showAxis: false,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            label: {
                fontFamily: 'Arial',
                fontSize: scale(8),
                fontWeight: true,
                fill: '#34495E',
                rotate: 45
            }
        },
        axisY: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            label: {
                fontFamily: 'Arial',
                fontSize: scale(8),
                fontWeight: true,
                fill: '#34495E'
            }
        }
    };

    if (usage) {
        // create bar chart data
        if (showDailyChart && usage.dailyUsages && usage.dailyUsages.length > 0) {
            barChartData.push([]);
            usage.dailyUsages.forEach(daily => {
                barChartData[0].push({
                    "v": daily.totalVolumeAsUnit,
                    "name": daily.day,
                    "unit": daily.usageUnit
                });
            });
            barChartOptions.width = usage.dailyUsages.length * scale(27);
        }
    }
    
    if (showMonthlyChart && yearlyUsagesForPod && yearlyUsagesForPod.length > 0) {
        barChartData.push([]);
        yearlyUsagesForPod.forEach(yearly => {
            barChartData[0].push({
                "v": yearly.totalVolumeAsUnit,
                "name": moment(yearly.period).format('MMM'),
                "unit": yearly.usageUnit
            });
        });
        barChartOptions.width = yearlyUsagesForPod.length * scale(27);
    }

    if (!barChartData || barChartData.length === 0) return null;

    return (
        <View style={style}>
            <Card>
                <BarChartColumnBasic data={barChartData} options={barChartOptions} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    packName: {
        fontFamily: 'Roboto-Regular',
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default BarChart;
