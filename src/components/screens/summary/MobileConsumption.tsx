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
import { getPackMetadata } from '../../../helpers/packMetadata';
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

    const { packImage, packName, packColor } = getPackMetadata(subscription && subscription.offer && subscription.offer.name);
    const hasHeader = showCardHeader && (packImage || packName);

    return (
        <View style={style}>
            {showSectionHeader ? <SectionHeader text={translate('MOBILE_USAGE')} /> : null}
            <DropDown readOnly={Object.keys(subscriptions).length === 1 && subscription} style={{ marginBottom: scale(7) }} defaultText={'Selectionner un plan mobile'} options={msisdns} selectedKey={selectedMSISDN.toString()} onChange={onMobileChange} />
            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => {
                navigation.navigate('MobileConsumption');
            }} disabled={!linkToLandingScreen}>
                <Card>
                    {hasHeader ?
                        <CardHeader style={{ paddingVertical: scale(10) }} backgroundColor={packColor}>
                            {!packImage && packName ? <Text style={styles.packName}>{packName}</Text> : null}
                            {packImage ? <Image
                                resizeMode="contain"
                                source={packImage}
                                style={{ height: scale(60) }}
                            /> : null}
                        </CardHeader> : null}
                    {voiceUsageTexts ?
                        <Section style={[styles.usageSection, hasHeader ? null : styles.cardWithoutHeaderStyle]}>
                            <TwoColumnLine
                                style={{ paddingBottom: scale(4) }}
                                column1Icon={Icon.PHONE}
                                column1Text={voiceUsageTexts.usageLabel}
                            />
                            <TwoColumnLine
                                style={{ paddingBottom: voice && !voice.unlimited ? scale(7) : 0 }}
                                column1Text={voiceUsageTexts.usageCurrentLabel}
                                column1Type={voiceUsageTexts.usageCurrentLabelType}
                                column1Text2={voiceUsageTexts.usageLimitLabel}
                                column1Text2Type={voiceUsageTexts.usageLimitLabelType}
                                column2Icon={voiceUsageTexts.usageTextIcon}
                                column2Text={voiceUsageTexts.usageText}
                                column2Type={voiceUsageTexts.usageTextType}
                            />
                            {voice && !voice.unlimited ? <ProgressBar progress={voiceProgress} /> : null}
                        </Section> : null}
                    {smsUsageTexts ?
                        <Section style={styles.usageSection}>
                            <TwoColumnLine
                                style={{ paddingBottom: scale(4) }}
                                column1Icon={Icon.SMS}
                                column1Text={smsUsageTexts.usageLabel}
                            />
                            <TwoColumnLine
                                style={{ paddingBottom: sms && !sms.unlimited ? scale(7) : 0 }}
                                column1Text={smsUsageTexts.usageCurrentLabel}
                                column1Type={smsUsageTexts.usageCurrentLabelType}
                                column1Text2={smsUsageTexts.usageLimitLabel}
                                column1Text2Type={smsUsageTexts.usageLimitLabelType}
                                column2Icon={smsUsageTexts.usageTextIcon}
                                column2Text={smsUsageTexts.usageText}
                                column2Type={smsUsageTexts.usageTextType}
                            />
                            {sms && !sms.unlimited ? <ProgressBar progress={smsProgress} /> : null}
                        </Section> : null}
                    {voiceSmsUsageTexts ?
                        <Section style={[styles.usageSection, hasHeader ? null : styles.cardWithoutHeaderStyle]}>
                            <TwoColumnLine
                                style={{ paddingBottom: scale(4) }}
                                column1Icon={Icon.SMARTPHONE}
                                column1Text={voiceSmsUsageTexts.usageLabel}
                            />
                            <TwoColumnLine
                                style={{ paddingBottom: voiceSms && !voiceSms.unlimited ? scale(7) : 0 }}
                                column1Text={voiceSmsUsageTexts.usageCurrentLabel}
                                column1Type={voiceSmsUsageTexts.usageCurrentLabelType}
                                column1Text2={voiceSmsUsageTexts.usageLimitLabel}
                                column1Text2Type={voiceSmsUsageTexts.usageLimitLabelType}
                                column2Icon={voiceSmsUsageTexts.usageTextIcon}
                                column2Text={voiceSmsUsageTexts.usageText}
                                column2Type={voiceSmsUsageTexts.usageTextType}
                            />
                            {voiceSms && !voiceSms.unlimited ? <ProgressBar progress={voiceSmsProgress} /> : null}
                        </Section> : null}
                    {dataUsageTexts ?
                        <Section noBorderBottom={true} style={[styles.usageSection, styles.cardBottomStyle]}>
                            <TwoColumnLine
                                style={{ paddingBottom: scale(4) }}
                                column1Icon={Icon.WORLD_GLOBE}
                                column1Text={dataUsageTexts.usageLabel}
                            />
                            <TwoColumnLine
                                style={{ paddingBottom: data && !data.unlimited ? scale(7) : 0 }}
                                column1Text={dataUsageTexts.usageCurrentLabel}
                                column1Type={dataUsageTexts.usageCurrentLabelType}
                                column1Text2={dataUsageTexts.usageLimitLabel}
                                column1Text2Type={dataUsageTexts.usageLimitLabelType}
                                column2Icon={dataUsageTexts.usageTextIcon}
                                column2Text={dataUsageTexts.usageText}
                                column2Type={dataUsageTexts.usageTextType}
                            />
                            {data && !data.unlimited ? <ProgressBar progress={dataProgress} /> : null}
                        </Section> : null}
                </Card>
            </TouchableHighlight>
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
