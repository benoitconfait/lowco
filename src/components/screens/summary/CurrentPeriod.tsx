import React from 'react';
import SmallLabelValue from '../../common/SmallLabelValue';
import moment from 'moment';
import translate from '../../../lang/translate';

interface Props {
    style?: any;
}

function CurrentPeriod({ style }: Props) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    const period = `${moment(firstDay).format('DD/MM/YYYY')} au ${moment(lastDay).format('DD/MM/YYYY')}`;

    return (
        <SmallLabelValue style={style} label={`${translate('CURRENT_USAGE_PERIOD')} :`} value={period} />
    );
};

export default CurrentPeriod;
