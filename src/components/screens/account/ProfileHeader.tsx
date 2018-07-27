import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { COLOR_WHITE } from '../../../styles/commonStyles';
import { scale } from '../../../helpers/scaleHelper';
import translate from '../../../lang/translate';
import IconImage from '../../common/IconImage';
import Icon = VOO.Mobile.App.Enums.Icon;
interface Props {
    clientNumber: string,
    clientName: string;
    showBackButton?: boolean;
    navigation?: any;
}

export function ProfileHeader({ clientName, clientNumber, showBackButton, navigation }: Props) {

    return (
        <ImageBackground
            resizeMode='cover'
            style={ styles.backgroundImage}
            source={require('../../../../assets/img/my-account-bg.png')}>
            {showBackButton ? 
            <View>
                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={{ marginLeft: scale(10) }}
                    onPress={() => navigation.goBack()}>
                    <IconImage color={ COLOR_WHITE } icon={Icon.ARROW_LEFT} style={styles.backButton} />
                </TouchableHighlight>
            </View>
            : null }
            <View style={showBackButton ? [styles.containerWithBack]:  [styles.container]} >
                <Text style={styles.clientName}>{clientName}</Text>
                <Text style={styles.clientNumberTitle}>{clientNumber ? `${translate('CLIENT_NUMBER_TITLE').toUpperCase()} :` : ''}</Text>
                <Text style={styles.clientNumber}>{clientNumber}</Text>
            </View>
        </ImageBackground>
    );
}

const textStyle = {
    color: '#fff'
};
const styles = StyleSheet.create({
    backButton: { 
        marginLeft: scale(10), 
        marginTop: scale(29),
        width: scale(9.5),
        height: scale(9.5)
    },
    container: {
        marginTop: scale(106.5),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerWithBack: {
        marginTop: scale(68),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        height: 235,
        margin: 0,
        padding: 0
    },
    text: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    clientNumberTitle: {
        ...textStyle,
        fontSize: scale(10),
        marginTop: scale(8),
        color: '#d3d3d3'
    },
    clientName: {
        ...textStyle,
        fontSize: scale(14)
    },
    clientNumber: {
        ...textStyle,
        fontSize: scale(10),
        fontWeight: 'bold'
    }
});
