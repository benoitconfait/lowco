import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_20, COLOR_GRAY_30, COLOR_GRAY_40, COLOR_GRAY_50, COLOR_GRAY_100 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';
import IconImage from '../common/IconImage';
import { ListItem } from 'react-native-elements';
import IconSize = VOO.Mobile.App.Enums.IconSize;
import Icon = VOO.Mobile.App.Enums.Icon;

interface Props {
    title: string,
    rightTitle?: string,
    rightTitleStyle?: any,
    onPress: any,
    transparent?: boolean
}

function MyListItem({ title, rightTitle, rightTitleStyle, onPress, transparent }: Props) {
    const { listItemContainer, listItem, transparentStyle, rightStyle, iconStyle } = styles;

    return (
        <ListItem
            underlayColor={COLOR_GRAY_30}
            containerStyle={[listItemContainer, transparent ? transparentStyle : null]}
            titleStyle={listItem}
            title={title}
            rightTitle={rightTitle}
            rightTitleStyle={[rightStyle, rightTitleStyle]}
            onPress={onPress}
            rightIcon={(<IconImage color={ COLOR_GRAY_50 } icon={Icon.ARROW_RIGHT} style={iconStyle} />)}
        />
    );
};

const styles = StyleSheet.create({
    transparentStyle: {
        backgroundColor: COLOR_GRAY_20,
        borderBottomColor: COLOR_GRAY_40
    },
    iconStyle: {
        paddingRight: scale(27),
        width: scale(10),
        height: scale(10)
    },
    listItemContainer: {
        borderTopWidth: 0,
        borderBottomWidth: scale(1),
        borderBottomColor: COLOR_GRAY_20
    },
    listItem: {
        paddingVertical: scale(5.5),
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_GRAY_100
    },
    rightStyle: {
        fontFamily: 'Roboto-Regular',
        marginRight: scale(-3)
    }
});

export default MyListItem;
