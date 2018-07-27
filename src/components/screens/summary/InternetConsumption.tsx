import React from 'react';
import { View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoColumnLine from '../../common/TwoColumnLine';
import ProgressBar from '../../common/ProgressBar';
import translate from '../../../lang/translate';
import { getInternetUsageTexts } from '../../../helpers/usageTextHelper';
import DropDown from '../../common/DropDown';
import { setSelectedMSISDN } from '../../../actions/MobileSubscriptionsActions';
import { setSelectedPodId } from '../../../actions/AddressActions';
import { getPackMetadata } from '../../../helpers/packMetadata';
import { getAddressesOptions } from '../../../helpers/addressesHelper';
import {
    COLOR_DEFAULT_PACK
} from '../../../styles/commonStyles';
import BarChartColumnBasic from '../../common/charts/BarChartColumnBasic';
import { scale } from '../../../helpers/scaleHelper';
import moment from 'moment';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;


function InternetConsumption({ style, usages, addresses, selectedPodId, onAddressChange, navigation, showSectionHeader, showCardHeader, linkToLandingScreen }) {
    if (!usages || usages.length === 0) {
        return null;
    }

    let usageTexts;
    let limited = false;
    let progress = 1;

    const usage = usages && usages[selectedPodId];
    if (usage) {
        limited = usage.quotaAsBytes;
        usageTexts = getInternetUsageTexts(usage.totalVolumeAsBytes, usage.quotaAsBytes);
        progress = usage.quotaAsBytes ? usage.totalVolumeAsBytes / usage.quotaAsBytes : 1;
    }

    // drop down options
    const addressOptions = getAddressesOptions(addresses);

    // pack metadata
    const usageAddress = addresses && addresses.find((address) => address.pointOfDelivery === selectedPodId);
    const { packImage, packName, packColor } = getPackMetadata(usageAddress && usageAddress.packId);

    const hasHeader = showCardHeader && (packImage || packName);

    return (
        <View style={style}>
            {showSectionHeader ? <SectionHeader text="Consommation internet" /> : null}
            {(addressOptions && addressOptions.length > 0) ?
                <DropDown readOnly={addressOptions.length === 1 && usageAddress} style={{ marginBottom: scale(7) }} defaultText={'Selectionner une addresse'} options={addressOptions} selectedKey={selectedPodId} onChange={onAddressChange} />
                : null}
            <Card>
                {hasHeader ?
                    <CardHeader style={{ paddingVertical: scale(10) }} backgroundColor={packColor}>
                        {!packImage && packName ? <Text style={styles.packName}>{packName}</Text> : null}
                        {packImage ? <Image
                            resizeMode="contain"
                            source={packImage}
                            style={{ height: scale(60) }}
                        /> : null}
                    </CardHeader> : null}
                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => {
                    navigation.navigate('Net');
                }} disabled={!linkToLandingScreen}>
                    {usageTexts ? <Section noBorderBottom={true} style={[styles.usageSection, hasHeader ? styles.cardWithHeaderStyle : styles.cardWithoutHeaderStyle]}>
                        <TwoColumnLine
                            style={{ paddingBottom: scale(4) }}
                            column1Icon={Icon.WORLD_GLOBE}
                            column1Text={usageTexts.usageLabel}
                        />
                        <TwoColumnLine
                            style={{ paddingBottom: limited && progress ? scale(7) : 0 }}
                            column1Text={usageTexts.usageCurrentLabel}
                            column1Type={usageTexts.usageCurrentLabelType}
                            column1Text2={usageTexts.usageLimitLabel}
                            column1Text2Type={usageTexts.usageLimitLabelType}
                            column2Icon={usageTexts.usageTextIcon}
                            column2Text={usageTexts.usageText}
                            column2Type={usageTexts.usageTextType}
                        />
                        {limited && progress ? <ProgressBar progress={progress} /> : null}
                    </Section> : <View></View>}
                </TouchableHighlight>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    packName: {
        fontFamily: 'Roboto-Regular',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(22)
    },
    usageSection: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardWithHeaderStyle: {
        borderBottomLeftRadius: scale(3),
        borderBottomRightRadius: scale(3)
    },
    cardWithoutHeaderStyle: {
        borderRadius: scale(3)
    }
});

export default InternetConsumption;
