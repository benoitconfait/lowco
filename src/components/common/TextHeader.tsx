import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_40 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    text: string;
    style?: any;
}

function TextHeader({ text, style }: Props) {
    const { headerStyle, headerTextStyle } = styles;

    return (
        <View style={[headerStyle, style]}>
            <Text style={[headerTextStyle]}>{text.toUpperCase()}</Text>
        </View>
        );
};

const styles = StyleSheet.create({
    headerStyle: {
        paddingHorizontal: scale(20),
        paddingVertical: scale(3),
    },
    headerTextStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: scale(9.7),
        letterSpacing: scale(1)
    }
});

export default TextHeader;
