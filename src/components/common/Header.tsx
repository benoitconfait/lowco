import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { COLOR_GRAY_30, COLOR_GRAY_100 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';
import IconImage from './IconImage';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;

interface Props {
    text: string;
    hasBackButton?: boolean;
    navigation?: any;
}

function Header({ text, hasBackButton, navigation }: Props) {
    const { headerStyle, headerTextStyle } = styles;

    return (
        <View style={headerStyle}>
            {hasBackButton && navigation ?
                (<TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <IconImage color={COLOR_GRAY_100} size={IconSize.XSMALL} icon={Icon.ARROW_LEFT} />
                </TouchableHighlight>) : null}
            <Text style={headerTextStyle}>{text.toUpperCase()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? scale(25) : scale(17),
        paddingBottom: scale(15),
        borderBottomWidth: scale(0.5),
        borderBottomColor: COLOR_GRAY_30
    },
    headerTextStyle: {
        fontFamily: 'Roboto-Bold',
        fontSize: scale(10),
        fontWeight: 'bold',
        letterSpacing: scale(1),
        color: COLOR_GRAY_100
    },
    backButton: {
        position: 'absolute',
        left: scale(20),
        top: scale(27)
    }
});

export default Header;
