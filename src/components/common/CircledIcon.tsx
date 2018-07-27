import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_GRAY_60 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';
import IconImage from '../common/IconImage';
import IconSize = VOO.Mobile.App.Enums.IconSize;
import Icon = VOO.Mobile.App.Enums.Icon;

interface Props {
    icon: any;
}

function CircledIcon({icon}: Props) {
    const { iconStyle, iconTextStyle } = styles;

    return (
        <View style={iconStyle}>
            <IconImage size={IconSize.GIANT} icon={icon} />
        </View>
        );
};

const styles = StyleSheet.create({
    iconStyle: {
        width: scale(120),
        height: scale(120),
        borderRadius: scale(60),
        backgroundColor: '#ffffff',
        shadowColor: COLOR_GRAY_60,
        shadowOffset: { width: 0, height: scale(10) },
        shadowOpacity: 0.5,
        shadowRadius: scale(8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconTextStyle: {
        color: COLOR_PRIMARY,
        fontFamily: 'iconesVOO',
        fontSize: scale(80)
    }
});

export default CircledIcon;
