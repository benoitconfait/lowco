import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoColumnLine from '../../common/TwoColumnLine';
import ProgressBar from '../../common/ProgressBar';
import DropDown from '../../common/DropDown';
import translate from '../../../lang/translate';
import { getDataUsageTexts, getSMSUsageTexts, getVoiceUsageTexts } from '../../../helpers/usageTextHelper';
import { scale } from '../../../helpers/scaleHelper';
import Icon = VOO.Mobile.App.Enums.Icon;
import {
    COLOR_WHITE
} from '../../../styles/commonStyles';
import { formatNumber } from 'libphonenumber-js';

function MobileOffer({ style, subscriptions, selectedMSISDN, onMobileChange }) {
    if (!subscriptions || Object.keys(subscriptions).length === 0) {
        return null;
    }

    const msisdns = Object.keys(subscriptions).map((msisdn) => ({
        key: msisdn,
        value: formatNumber(`+${msisdn}`, 'National')
    }));

    const subscription = subscriptions[selectedMSISDN];
    const simCardNumber = subscription && subscription.simCard && subscription.simCard.iccid;
    const cardHolder = subscription &&
        subscription.holder &&
        subscription.holder.firstname &&
        subscription.holder.lastname ?
        `${subscription.holder.firstname} ${subscription.holder.lastname}` : '';

    const monthlyPrice = subscription && subscription.offer && subscription.offer.price;


    return (
        <View style={style}>
   
        </View >
    );
};

const styles = StyleSheet.create({
    packName: {
        fontFamily: 'Roboto-Regular',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(22)
    },
    cardHeader: {
        paddingTop: scale(10),
        paddingBottom: scale(17),
        borderBottomLeftRadius: scale(3),
        borderBottomRightRadius: scale(3)
    },
    label: {
        marginTop: scale(22),
        marginBottom: scale(10),
        marginHorizontal: scale(22),
        fontFamily: 'Roboto-Medium',
        fontSize: scale(10),
        letterSpacing: scale(1)
    },
    value: {
        marginHorizontal: scale(9),
        fontFamily: 'Roboto',
        fontSize: scale(14),
        lineHeight: scale(22)
    },
    monthlyPrice: {
        color: COLOR_WHITE
    }
});

export default MobileOffer;
