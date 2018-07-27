import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_100, COLOR_PRIMARY } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    style?: any;
    label: string;
    value: string;
    unit: string;
}

function FeaturedLabelValueUnit({ style, label, value, unit }: Props) {
    const { labelValueStyle, labelTextStyle, valueStyle, valueTextStyle, unitTextStyle } = styles;
    return (
        <View style={[labelValueStyle, style]}>
            <Text style={labelTextStyle}>{label}</Text>
            <View>
                <View style={valueStyle}>
                    <Text style={valueTextStyle}>{value}</Text>
                    <Text style={unitTextStyle}>{unit}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    labelValueStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    labelTextStyle: {
        fontFamily: 'Roboto-Regular',
        alignItems: 'center',
        fontSize: scale(14),
        color: COLOR_GRAY_100,
    },
    valueStyle: {
        flexDirection: 'row',
        paddingTop: scale(4),
    },
    valueTextStyle: {
        fontFamily: 'Roboto-Regular',
        color: COLOR_PRIMARY,
        alignItems: 'center',
        fontSize: scale(24),
    },
    unitTextStyle: {
        fontFamily: 'Roboto-Regular',
        color: COLOR_PRIMARY,
        alignItems: 'center',
        fontSize: scale(18),
        paddingTop: scale(5.5)
    }
});

export default FeaturedLabelValueUnit;
