import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoColumnLine from '../../common/TwoColumnLine';
import ProgressBar from '../../common/ProgressBar';
import DropDown from '../../common/DropDown';
import translate from '../../../lang/translate';
import { getDataUsageTexts, getSMSUsageTexts, getVoiceUsageTexts, getVoiceSmsUsageTexts } from '../../../helpers/usageTextHelper';
import { scale } from '../../../helpers/scaleHelper';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { formatNumber } from 'libphonenumber-js';

function MobileConsumption({ style, showSectionHeader, showCardHeader, subscriptions, selectedMSISDN, onMobileChange, linkToLandingScreen, navigation }) {
    if (!subscriptions || Object.keys(subscriptions).length === 0) {
        return null;
    }

    const msisdns = Object.keys(subscriptions).map((msisdn) => ({
        key: msisdn,
        value: formatNumber(`+${msisdn}`, 'National')
    }));

    const subscription = subscriptions[selectedMSISDN];
    let data;
    let sms;
    let voice;
    let voiceSms;
    let dataUsageTexts;
    let smsUsageTexts;
    let voiceUsageTexts;
    let voiceSmsUsageTexts;
    let dataProgress;
    let smsProgress;
    let voiceProgress;
    let voiceSmsProgress;

    if (subscription.usage && subscription.usage.main) {
        data = subscription.usage.main.data;
        sms = subscription.usage.main.sms;
        voice = subscription.usage.main.voice;
        voiceSms = subscription.usage.main.voisms;
        const { boostData } = subscription.usage;
        const boostDataLimit = boostData && boostData.data && boostData.data.limit ? boostData.data.limit : 0;
        const boostDataCurrent = boostData && boostData.data && boostData.data.current ? boostData.data.current : 0;
        const dataCurrent = (data ? data.current : 0) + boostDataCurrent;
        const dataLimit = (data ? data.limit : 0) + boostDataLimit;

        if (data) {
            dataUsageTexts = getDataUsageTexts(parseFloat(dataCurrent.toFixed(2)), data.unlimited ? null : dataLimit);
            dataProgress = data.unlimited ? 1 : dataCurrent / dataLimit;
        }

        if (sms) {
            smsUsageTexts = getSMSUsageTexts(sms.current, sms.unlimited ? null : sms.limit);
            smsProgress = sms.unlimited ? 1 : sms.current / sms.limit;
        }

        if (voice) {
            voiceUsageTexts = getVoiceUsageTexts(Math.round(voice.current), voice.unlimited ? null : voice.limit);
            voiceProgress = voice.unlimited ? 1 : voice.current / voice.limit;
        }

        if (voiceSms) {
            voiceSmsUsageTexts = getVoiceSmsUsageTexts(Math.round(voiceSms.current), voiceSms.unlimited ? null : voiceSms.limit);
            voiceSmsProgress = voiceSms.unlimited ? 1 : voiceSms.current / voiceSms.limit;
        }
    }

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
    usageSection: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardWithoutHeaderStyle: {
        borderTopLeftRadius: scale(3),
        borderTopRightRadius: scale(3)
    },
    cardBottomStyle: {
        borderBottomLeftRadius: scale(3),
        borderBottomRightRadius: scale(3)
    }
});

export default MobileConsumption;
