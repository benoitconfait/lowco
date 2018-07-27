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

const typeToIcon = {
    'Data': Icon.WORLD_GLOBE,
    'Voice': Icon.PHONE,
    'Sms': Icon.SMS
};

function MobileDayUsage({ dayUsage, recordType }) {
    let records = dayUsage.records;

    if (records && records.length > 0 && recordType !== 'All') {
        records = records.filter((record) => record.type === recordType);
    }

    if (records && records.length > 0) {
        return (
            <View style={styles.content}>
                <TwoColumnLine style={{ marginHorizontal: 20, paddingBottom: scale(8) }}
                    column1Text={moment(dayUsage.date).format('D MMMM YYYY').toUpperCase()}
                    column1Type={LineColumnType.Header}
                    column2Text={`${numeral(dayUsage.cost).format()}€`}
                    column2Type={LineColumnType.HeaderBold} />
                {records.map((cdr, index) => {
                    let line1column1Text = '';
                    let line2Column1Text = '';

                    if (cdr.type === 'Data') {
                        line1column1Text = `${cdr.usage} Mo`;
                        line2Column1Text = moment(cdr.time).format('HH:mm').replace(':', 'h');
                    } else if (cdr.type === 'Voice') {
                        line1column1Text = cdr.phoneNumber;
                        line2Column1Text = `${moment(cdr.time).format('HH:mm').replace(':', 'h')} - ${formatSeconds(cdr.usage)}`;
                    } else if (cdr.type === 'Sms') {
                        line1column1Text = cdr.phoneNumber;
                        line2Column1Text = moment(cdr.time).format('HH:mm').replace(':', 'h');
                    }

                    return (
                        <Section
                            key={`daily-usage-cdr-${index}`}
                            style={index == 0 ? { marginLeft: scale(2), borderTopWidth: scale(1), borderTopColor: COLOR_GRAY_40 } : null}
                        >
                            <TwoLines
                                icon={typeToIcon[cdr.type]}
                                line1Column1Text={line1column1Text}
                                line1Column1Type={LineColumnType.Default}
                                line1Column2Text={cdr.cost === 0 ? translate('INCLUDED').toUpperCase() : `${numeral(cdr.cost).format()}€`}
                                line1Column2Type={cdr.cost === 0 ? LineColumnType.MediumInfoSpaced : LineColumnType.HeaderError}
                                line2Column1Text={line2Column1Text}
                                line2Column1Type={LineColumnType.Info}
                                line2Column2Text={cdr.cost === 0 ? '' : translate('OUT_OF_BUNDLE').toUpperCase()}
                                line2Column2Type={LineColumnType.MediumErrorSpaced}
                            />
                        </Section>);
                })}
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    content: {
        marginTop: scale(23),
        flex: 1
    }
});

export default MobileDayUsage;
