import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Card } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoColumnLine from '../../common/TwoColumnLine';
import ProgressBar from '../../common/ProgressBar';
import { CardSVG, SparkleFourSVG, SparkleSixSVG } from '../../common/images';
import translate from '../../../lang/translate';
import { COLOR_PRIMARY, COLOR_GRAY_100 } from '../../../styles/commonStyles';
import { scale } from '../../../helpers/scaleHelper';
import numeral from '../../../helpers/numberFormatter';

function InvoiceEstimate({ style, showSectionHeader, totalBalance, navigation }) {
    if (totalBalance !== 0 && !totalBalance) {
        return null;
    }

    return (
        <View style={style}>
            <SectionHeader text={showSectionHeader ? 'Facturation' : ' '} />
            <SparkleSixSVG style={styles.sparkleSixStyle} />
            <Card>
                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => {
                    navigation.navigate('Invoice');
                }}>
                    <Section noBorderBottom={true} style={styles.container}>
                        <Text style={styles.labelTextStyle}>{translate('YOU_OWE')}</Text>
                        <View style={styles.valueLineStyle}>
                            <Text style={styles.valueTextStyle}>{totalBalance ? numeral(totalBalance).format() : 0}</Text>
                            <Text style={styles.valueTextStyleSmall}>€</Text>
                        </View>
                    </Section>
                </TouchableHighlight>
            </Card>
            <CardSVG transform={{ translate: `${scale(-70)}, ${scale(75)}`, rotate: '-26' }} style={styles.cardSVGStyle} />
            <SparkleFourSVG style={styles.sparkleFourStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(20),
        borderRadius: scale(3)
    },
    labelTextStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: scale(14),
        color: COLOR_GRAY_100,
        paddingBottom: scale(7)
    },
    valueLineStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    valueTextStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: scale(31),
        lineHeight: scale(31),
        color: COLOR_PRIMARY
    },
    valueTextStyleSmall: {
        fontFamily: 'Roboto-Bold',
        color: COLOR_PRIMARY,
        fontSize: scale(20),
        lineHeight: scale(30),
        paddingBottom: scale(2)
    },
    cardSVGStyle: {
        elevation: 3,
        position: 'absolute',
        top: scale(3),
        left: scale(35),
        width: scale(80),
        height: scale(70)
    },
    sparkleSixStyle: {
        position: 'absolute',
        top: scale(13),
        right: scale(65),
        width: scale(10),
        height: scale(10)
    },
    sparkleFourStyle: {
        position: 'absolute',
        top: scale(138),
        left: scale(50),
        width: scale(10),
        height: scale(10)
    }
});


export default InvoiceEstimate;
