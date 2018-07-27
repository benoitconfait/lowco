import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_100 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    style: any;
    label: string;
    value: string;
}

function SmallLabelValue({ style, label, value }: Props) {
    const { labelValueStyle, labelTextStyle, valueTextStyle } = styles;

    return (
        <View style={[labelValueStyle, style]}>
            <Text style={labelTextStyle}>{label}</Text>
            <Text style={valueTextStyle}>{value}</Text>
        </View>
        );
};

const styles = StyleSheet.create({
    labelValueStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: scale(6),
    },
    labelTextStyle: {
        fontFamily: 'Roboto-Bold',
        alignItems: 'center',
        fontSize: scale(10.5),
        color: COLOR_GRAY_100,
    },
    valueTextStyle: {
        fontFamily: 'Roboto-Regular',
        alignItems: 'center',
        fontSize: scale(10.5),
        color: COLOR_GRAY_100,
        marginTop: scale(4)
    }
});

export default SmallLabelValue;
