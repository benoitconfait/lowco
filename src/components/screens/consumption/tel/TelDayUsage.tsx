import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import TwoLines from '../../../common/TwoLines';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { scale } from '../../../../helpers/scaleHelper';
import numeral from '../../../../helpers/numberFormatter';
import moment from 'moment';
import { formatSeconds } from '../../../../helpers/momentFormatter';
import { COLOR_GRAY_40 } from '../../../../styles/commonStyles';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;

function TelDayUsage({ dayUsage }) {
    const currentMonth = new Date(dayUsage.period);

    return (
        <View style={styles.content}>
            <TwoColumnLine style={{ marginHorizontal: 20, paddingBottom: 10 }}
                column1Text={dayUsage.date.toUpperCase()}
                column1Type={LineColumnType.Header}
                column2Text={`${numeral(dayUsage.totalTVAC).format()}€`}
                column2Type={LineColumnType.HeaderBold} />
            {dayUsage.items && dayUsage.items.length > 0 ?
                dayUsage.items.map((cr, index) =>
                    <Section
                        key={`daily-usage-cr-${index}`}
                        style={index == 0 ? { borderTopWidth: scale(1), borderTopColor: COLOR_GRAY_40 } : null}
                    >
                        <TwoLines
                            icon={Icon.FIXE}
                            iconSize={IconSize.SMALL}
                            line1Column1Text={`${cr.crDest} - `}
                            line1Column1Type={LineColumnType.Default}
                            line1Column1Text2={`${cr.callDeviceType} ${cr.callLocalisation}`}
                            line1Column1Text2Type={LineColumnType.Header}
                            line1Column2Text={cr.isIncluded ? translate('INCLUDED').toUpperCase() : `${numeral(cr.crPriceTVAC).format()}€`}
                            line1Column2Type={cr.isIncluded ? LineColumnType.InfoSpaced : LineColumnType.ErrorSpaced}
                            line2Column1Text={`${moment(cr.crCallBegin).format('HH:mm').replace(':', 'h')} - ${formatSeconds(cr.crDuration)}`}
                            line2Column1Type={LineColumnType.Info}
                            line2Column2Text={cr.isIncluded ? '' : translate('OUT_OF_BUNDLE').toUpperCase()}
                            line2Column2Type={LineColumnType.ErrorSpaced}
                        />
                    </Section>) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginTop: scale(20),
        flex: 1
    }
});

export default TelDayUsage;
