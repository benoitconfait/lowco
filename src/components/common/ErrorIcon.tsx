import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_ERROR, COLOR_GRAY_20, COLOR_GRAY_60 } from '../../styles/commonStyles';
import CircledIcon from './CircledIcon';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    icon: any;
}

function ErrorIcon({icon}: Props) {
    //const { sadFaceStyle, sadFaceTextStyle } = styles;

    return (
        <View>
            <CircledIcon icon={icon} />
            {/* <View style={sadFaceStyle}>
                <Text style={sadFaceTextStyle}>s</Text>
            </View> */}
        </View>
        );
};

// const styles = StyleSheet.create({
//     sadFaceStyle: {
//         position: 'absolute',
//         top: scale(-10),
//         left: scale(85),
//         width: scale(44),
//         height: scale(44),
//         borderRadius: scale(22),
//         borderColor: COLOR_GRAY_20,
//         borderWidth: scale(4),
//         backgroundColor: '#ffffff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     sadFaceTextStyle: {
//         color: COLOR_ERROR,
//         fontFamily: 'iconesVOO',
//         fontSize: scale(40),
//         backgroundColor: '#000',
//         height: scale(40),
//         lineHeight: scale(40)
//     }
// });

export default ErrorIcon;
