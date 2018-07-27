import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR_DEFAULT_PACK } from '../../../styles/commonStyles';
import { scale } from '../../../helpers/scaleHelper';

interface Props {
    backgroundColor?: string | null,
    children: object;
    style?: any;
}

function CardHeader({ children, backgroundColor, style }: Props) {
    return (
        <View style={[styles.container, { backgroundColor : backgroundColor || COLOR_DEFAULT_PACK }, style]} >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_DEFAULT_PACK,
        borderTopLeftRadius: scale(3),
        borderTopRightRadius: scale(3),
        alignItems: 'center',
        paddingVertical: scale(24)
    }
});

export default CardHeader;
