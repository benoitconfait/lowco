import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoColumnLine from '../../common/TwoColumnLine';
import ProgressBar from '../../common/ProgressBar';
import { CardSVG, SparkleFourSVG, SparkleSixSVG } from '../../common/images';
import translate from '../../../lang/translate';
import { COLOR_WHITE, COLOR_GRAY_20, COLOR_GRAY_100, COLOR_PRIMARY } from '../../../styles/commonStyles';
import { scale } from '../../../helpers/scaleHelper';
import numeral from '../../../helpers/numberFormatter';

function InvoicesSummary({ style, totalBalance, totalPack, totalMobile, totalTelevision }) {
    if (totalBalance !== 0 && !totalBalance &&
        totalPack !== 0 && !totalPack &&
        totalMobile !== 0 && !totalMobile &&
        totalTelevision !== 0 && !totalTelevision) {
        return null;
    }

    const others = (totalBalance * 100 - totalPack * 100 - totalMobile * 100 - totalTelevision * 100) / 100;

    const { container, headerTextStyle, labelTextStyle, valueStyle, valueTextStyle, labelValueSection, dividerStyle } = styles;
    return (
        <View style={style}>
            <Card>
                <CardHeader style={{ paddingVertical: scale(10) }}>
                    <Text style={headerTextStyle}>
                        {translate('INVOICES_SUMMARY')}
                    </Text>
                </CardHeader>
                <Section noBorderBottom={true} style={container}>
                    <View style={[labelValueSection, dividerStyle]}>
                        <Text style={labelTextStyle}>PACK</Text>
                        <View style={valueStyle}>
                            <Text style={valueTextStyle}>{numeral(totalPack).format()}</Text>
                            <Text style={styles.valueTextStyleSmall}>€</Text>
                        </View>
                    </View>
                    <View style={[labelValueSection, dividerStyle]}>
                        <Text style={labelTextStyle}>MOBILE</Text>
                        <View style={valueStyle}>
                            <Text style={valueTextStyle}>{numeral(totalMobile).format()}</Text>
                            <Text style={styles.valueTextStyleSmall}>€</Text>
                        </View>
                    </View>
                    <View style={[labelValueSection, dividerStyle]}>
                        <Text style={labelTextStyle}>TV</Text>
                        <View style={valueStyle}>
                            <Text style={valueTextStyle}>{numeral(totalTelevision).format()}</Text>
                            <Text style={styles.valueTextStyleSmall}>€</Text>
                        </View>
                    </View>
                    <View style={[labelValueSection]}>
                        <Text style={labelTextStyle}>{translate('OTHER')}</Text>
                        <View style={valueStyle}>
                            <Text style={valueTextStyle}>{numeral(others).format()}</Text>
                            <Text style={styles.valueTextStyleSmall}>€</Text>
                        </View>
                    </View>
                </Section>
            </Card>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: scale(22),
        paddingBottom: scale(9),
        borderBottomLeftRadius: scale(3),
        borderBottomRightRadius: scale(3)
    },
    headerTextStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_WHITE,
        paddingVertical: scale(4)
    },
    labelTextStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(11),
        color: COLOR_GRAY_100,
        paddingBottom: scale(2)
    },
    valueStyle: {
        flexDirection: 'row'
    },
    valueTextStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_PRIMARY,
        paddingBottom: scale(7)
    },
    valueTextStyleSmall: {
        paddingTop: 3.3,
        color: COLOR_PRIMARY,
        fontSize: scale(9.5)
    },
    labelValueSection: {
        alignItems: 'center',
        paddingHorizontal: 15
    },
    dividerStyle: {
        borderRightWidth: 1,
        borderRightColor: COLOR_GRAY_20
    }
});


export default InvoicesSummary;
