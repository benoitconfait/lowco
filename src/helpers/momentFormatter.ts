import translate from '../lang/translate';
import moment from 'moment';

export const formatSeconds = (seconds) => {
    if(seconds) {
        const duration = moment.duration(seconds * 1000);

        let formattedDuration = '';

        if (duration.hours()) {
            formattedDuration += `${duration.hours()}h `;
        }
        if (duration.minutes()) {
            formattedDuration += `${duration.minutes()}m `;
        }
        if (duration.seconds()) {
            formattedDuration += `${duration.seconds()}s`;
        }
        return formattedDuration;
    }

    return '0s';
};