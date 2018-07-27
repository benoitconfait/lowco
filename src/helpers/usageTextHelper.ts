import { BToGB } from '../helpers/unitConverter';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import numeral from './numberFormatter';

export const getLimitedUsageText = (remaining: number, unit: string, isFloat: boolean) => {
    const remainingValue = isFloat ? numeral(Math.abs(remaining)).format() : Math.abs(remaining);
    return {
        usageText: remaining < 0 ?
            `+ ${remainingValue} ${unit} consommés` : (
                remaining > 0 ? `il reste ${remainingValue} ${unit}` : null),
        usageTextIcon: remaining < 0 ? Icon.EXCLAMATION_CIRCLED : null,
        usageTextType: remaining < 0 ? LineColumnType.Error : LineColumnType.Info
    };
};

export const getUnlimitedUsageText = () => {
    return {
        usageText: 'illimités',
        usageTextIcon: null,
        usageTextType: LineColumnType.Info
    };
};

export const getUsageTexts = (usageLabel, usageCurrent, usageLimit, unit, unitMessage, isFloat) => {

    let usageCurrentLabel = '';
    let usageCurrentLabelType = LineColumnType.Usage;
    let usageLimitLabel = '';
    let usageLimitLabelType = LineColumnType.Usage;
    let remaining = 0;
    let unlimited = true;

    if (usageLimit) {
        unlimited = false;
        usageCurrentLabel = isFloat ? numeral(Math.abs(usageCurrent)).format() : Math.abs(usageCurrent).toString();
        usageLimitLabel = `/${usageLimit} ${unit}`;
        remaining = usageLimit - usageCurrent;
        if (remaining < 0) {
            usageCurrentLabelType = LineColumnType.UsageError;
        }
    } else {
        usageCurrentLabel = `${isFloat ? numeral(Math.abs(usageCurrent)).format() : Math.abs(usageCurrent).toString()} ${unit}`;
    }

    const {
        usageText,
        usageTextIcon,
        usageTextType
    } = unlimited ?
            getUnlimitedUsageText() :
            getLimitedUsageText(remaining, unit, isFloat);

    return {
        usageLabel,
        usageCurrentLabel,
        usageCurrentLabelType,
        usageLimitLabel,
        usageLimitLabelType,
        usageText,
        usageTextIcon,
        usageTextType
    }
}

export const getInternetUsageTexts = (currentInBytes, limitInBytes) => {
    return getUsageTexts(
        'Internet',
        BToGB(currentInBytes),
        BToGB(limitInBytes),
        'Go',
        'Go consommés',
        true);
}

export const getDataUsageTexts = (currentInGB, limitInGB) => {
    return getUsageTexts(
        'Data',
        currentInGB,
        limitInGB,
        'Go',
        'Go consommés',
        true);
}

export const getSMSUsageTexts = (current, limit) => {
    return getUsageTexts(
        'SMS',
        current,
        limit,
        'SMS',
        'SMS envoyés',
        false);
}

export const getVoiceUsageTexts = (currentInMinutes, limitInMinutes) => {
    return getUsageTexts(
        'Appels',
        currentInMinutes,
        limitInMinutes,
        'minutes',
        'minutes consommées',
        false);
}

export const getVoiceSmsUsageTexts = (currentInUnit, limitInUnit) => {
    return getUsageTexts(
        'Appels ou SMS',
        currentInUnit,
        limitInUnit,
        '',
        'Appels ou SMS consommées',
        false);
}