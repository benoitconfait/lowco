import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from '../../../styles/commonStyles';
import { scale } from '../../../helpers/scaleHelper';


interface Props {
    style?: any;
    children: any;
}

function Card({ style, children }: Props) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.shadow}></View>
            {children}            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: scale(10),
        marginHorizontal: scale(22),
        borderRadius: scale(3),
        elevation: 2
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        left: scale(20),
        height: scale(10),
        width: scale(230),
        shadowColor: COLOR_PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: scale(9),
        elevation: 1
    }
});

export default Card;