import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_70 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    style?: any;
    text: string;
}

function SectionHeader({ style, text }: Props) {
    const { headerStyle, headerTextStyle } = styles;

    return (
        <View style={[headerStyle, style]}>
            <Text style={headerTextStyle}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        alignItems: 'center',
        paddingHorizontal: scale(25),
        paddingTop: scale(3),
        marginBottom: scale(2)
    },
    headerTextStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_GRAY_70
    }
});

export default SectionHeader;
