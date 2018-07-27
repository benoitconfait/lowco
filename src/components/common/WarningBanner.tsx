import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_WARNING, COLOR_WHITE } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';
import ArrowRetryIcon from './icons/ArrowRetryIcon';
import translate from '../../lang/translate';

interface Props {
    style?: any;
    text?: string;
    offline: boolean;
    error?: any;
}

function WarningBanner({ style, offline, error }: Props) {
    const { banner, bannerText, retryIcon } = styles;
    let message = offline ? 'Hors connexion' : 'Impossible de charger vos données';

    if (error && error.customMessage && error.customMessage.length > 0) {
        message = translate(error.customMessage);
    } else if (error && error.name === 'TimeoutError') {
        message = 'Chargement expiré';
    }

    return (
        <View style={banner}>
            <Text style={bannerText}>{message}</Text>
            <ArrowRetryIcon style={retryIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_WARNING,
        paddingVertical: scale(11),
        marginBottom: scale(10)
    },
    bannerText: {
        color: COLOR_WHITE,
        fontSize: scale(11),
        fontFamily: 'Roboto'
    },
    retryIcon: {
        position: 'absolute',
        right: scale(32),
        width: scale(14),
        height: scale(14)
    }
});

export default WarningBanner;
