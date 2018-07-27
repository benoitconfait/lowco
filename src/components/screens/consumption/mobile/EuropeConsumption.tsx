import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import { getSMSUsageTexts, getVoiceUsageTexts } from '../../../../helpers/usageTextHelper';
import { scale } from '../../../../helpers/scaleHelper';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import Models = VOO.Mobile.App.Models;

interface Props {
    europeUsage?: Models.EuropeUsage | null,
}

function EuropeConsumption(europeUsage) {
    if (europeUsage && europeUsage.europeUsage) {
        const { sms, voice } = europeUsage.europeUsage;

        const smsUsageTexts = getSMSUsageTexts(sms.current, sms.unlimited ? null : sms.limit);
        let smsProgress = sms && sms.unlimited ? 1 : sms.current / sms.limit;

        const voiceUsageTexts = getVoiceUsageTexts(Math.round(voice.current), voice.unlimited ? null : voice.limit);
        let voiceProgress = voice && voice.unlimited ? 1 : voice.current / voice.limit;

        return (
            <View style={{ marginTop: scale(30) }}>
                <TextHeader style={{ paddingHorizontal: scale(25) }}
                    text={translate('EUROPE_INT')}
                />
                <Card>
                    {voiceUsageTexts ?
                        <Section style={[styles.usageSection, styles.cardWithoutHeaderStyle]}>
                            <TwoColumnLine
                                style={{ paddingBottom: voice && !voice.unlimited ? scale(7) : 0 }}
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
                    {smsUsageTexts ? <Section noBorderBottom={true} style={[styles.usageSection, styles.cardBottomStyle]}>
                        <TwoColumnLine
                            style={{ paddingBottom: sms && !sms.unlimited ? scale(7) : 0 }}
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
                </Card>
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    packName: {
        fontFamily: 'Roboto-Regular',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(22)
    },
    usageSection: {
        height: scale(85),
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

export default EuropeConsumption;
