import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import TwoColumnLine from '../../../common/TwoColumnLine';
import TwoLines from '../../../common/TwoLines';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import moment from 'moment';
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { scale } from '../../../../helpers/scaleHelper';
import { COLOR_GRAY_30 } from '../../../../styles/commonStyles';

function VodMonthUsage({ monthUsage }) {
    if(!monthUsage) return null;
    const currentMonth = new Date(monthUsage.period);

    const obfuscateName = (name) => {
        if (name.length > 4) {
            return `${name.substring(0, 4)}${name.substring(4).replace(/[^\s\\]/g, '*')}`;
        }
        return name;
    };

    return (
        <View style={styles.content}>
            <TwoColumnLine style={{ marginHorizontal: 20, paddingTop: 3, paddingBottom: 10 }}
                column1Text={`${moment(currentMonth).format('MMMM YYYY').toUpperCase()} - ${monthUsage.count} PROGR.`}
                column1Type={LineColumnType.Header}
                column2Text={`${monthUsage.totalInvat}€`}
                column2Type={LineColumnType.HeaderBold} />
            {monthUsage.dailyUsages && monthUsage.dailyUsages.length > 0 ?
                monthUsage.dailyUsages.map((dailyUsage, index) =>
                    <Section style={[styles.details, index === 0 ? styles.firstSection : null]} key={`daily-usage-${index}`}>
                        <TwoLines
                            line1Column1Text={obfuscateName(dailyUsage.name)}
                            line1Column1Type={LineColumnType.Default}
                            line1Column2Text= {`${dailyUsage.priceTTC}€`}
                            line1Column2Type={LineColumnType.MediumInfoSpaced}
                            line2Column1Text = {`${moment(dailyUsage.creationDateTime).format('DD/MM')}`}
                            line2Column1Type={LineColumnType.MediumInfoSpaced}
                        />
                    </Section>) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginTop: scale(20),
        flex: 1
    },
    details: {
        paddingHorizontal: 20
    },
    firstSection: {
        borderTopWidth: scale(1),
        borderTopColor: COLOR_GRAY_30
    }
});

export default VodMonthUsage;
