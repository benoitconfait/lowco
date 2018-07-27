import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_60 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    text: string;
    style: object;
    textStyle: object;
}

function TextLabel({ text, style, textStyle }: Props) {
    const { headerStyle, headerTextStyle } = styles;

    return (
        <View style={[headerStyle, style]}>
            <Text style={[headerTextStyle, textStyle]}>{text}</Text>
        </View>
        );
};

const styles = StyleSheet.create({
    headerStyle: {
        paddingHorizontal: scale(25),
        paddingVertical: scale(5),
    },
    headerTextStyle: {
        textAlign: 'center',
        fontSize: scale(14),
        lineHeight: scale(20),
        color: COLOR_GRAY_60,
        fontWeight: 'bold'
    }
});

export default TextLabel;
