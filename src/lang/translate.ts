import I18n from 'react-native-i18n';
import moment from 'moment';
import localEn from './en';
import localFr from './fr';

export default function translate(text: string) {
    return I18n.t(text);
}

export const deviceLang = I18n.locale;

export function initLocal() {
    I18n.fallbacks = true;
    I18n.translations = {
        en: localEn,
        fr: localFr
    };

    moment.updateLocale('en', {
        months : [
            translate('JANUARY'), translate('FEBRUARY'), translate('MARCH'), translate('APRIL'),
            translate('MAY'), translate('JUNE'), translate('JULY'), translate('AUGUST'),
            translate('SEPTEMBER'), translate('OCTOBER'), translate('NOVEMBER'), translate('DECEMBER')
        ]
    });
}