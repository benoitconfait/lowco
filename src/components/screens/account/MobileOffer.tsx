import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoColumnLine from '../../common/TwoColumnLine';
import ProgressBar from '../../common/ProgressBar';
import DropDown from '../../common/DropDown';
import translate from '../../../lang/translate';
import { getDataUsageTexts, getSMSUsageTexts, getVoiceUsageTexts } from '../../../helpers/usageTextHelper';
import { getPackMetadata } from '../../../helpers/packMetadata';
import { scale } from '../../../helpers/scaleHelper';
import Icon = VOO.Mobile.App.Enums.Icon;
import {
    COLOR_WHITE
} from '../../../styles/commonStyles';
import { formatNumber } from 'libphonenumber-js';

function MobileOffer({ style, subscriptions, selectedMSISDN, onMobileChange }) {
    if (!subscriptions || Object.keys(subscriptions).length === 0) {
        return null;
    }

    const msisdns = Object.keys(subscriptions).map((msisdn) => ({
        key: msisdn,
        value: formatNumber(`+${msisdn}`, 'National')
    }));

    const subscription = subscriptions[selectedMSISDN];
    const simCardNumber = subscription && subscription.simCard && subscription.simCard.iccid;
    const cardHolder = subscription &&
        subscription.holder &&
        subscription.holder.firstname &&
        subscription.holder.lastname ?
        `${subscription.holder.firstname} ${subscription.holder.lastname}` : '';

    const monthlyPrice = subscription && subscription.offer && subscription.offer.price;

    const { packImage, packName, packColor } = getPackMetadata(subscription && subscription.offer && subscription.offer.name);

    return (
        <View style={style}>
            <DropDown readOnly={Object.keys(subscriptions).length === 1 && subscription} style={{ marginBottom: 5 }} defaultText={'Selectionner un plan mobile'} options={msisdns} selectedKey={selectedMSISDN.toString()} onChange={onMobileChange} />
            <Card>
                {(packImage || packName) ?
                    <CardHeader style={styles.cardHeader} backgroundColor={packColor}>
                        {!packImage && packName ? <Text style={styles.packName}>{packName}</Text> : null}
                        {packImage ? <Image
                            resizeMode="contain"
                            source={packImage}
                            style={{ height: 60 }}
                        /> : null}
                        {monthlyPrice ? <Text style={styles.monthlyPrice}>{monthlyPrice}€ / mois</Text> : null}
                    </CardHeader> : null}
            </Card>
            {
                simCardNumber ?
                    <View>
                        <Text style={styles.label}>NUMÉRO DE CARTE SIM</Text>
                        <Section>
                            <Text style={styles.value}>#{simCardNumber}</Text>
                        </Section>
                    </View>
                    : null
            }
            {
                cardHolder ?
                    <View>
                        <Text style={styles.label}>DÉTENTEUR DE LA CARTE</Text>
                        <Section>
                            <Text style={styles.value}>{cardHolder}</Text>
                        </Section>
                    </View> : null
            }
        </View >
    );
};

const styles = StyleSheet.create({
    packName: {
        fontFamily: 'Roboto-Regular',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(22)
    },
    cardHeader: {
        paddingTop: scale(10),
        paddingBottom: scale(17),
        borderBottomLeftRadius: scale(3),
        borderBottomRightRadius: scale(3)
    },
    label: {
        marginTop: scale(22),
        marginBottom: scale(10),
        marginHorizontal: scale(22),
        fontFamily: 'Roboto-Medium',
        fontSize: scale(10),
        letterSpacing: scale(1)
    },
    value: {
        marginHorizontal: scale(9),
        fontFamily: 'Roboto',
        fontSize: scale(14),
        lineHeight: scale(22)
    },
    monthlyPrice: {
        color: COLOR_WHITE
    }
});

export default MobileOffer;
