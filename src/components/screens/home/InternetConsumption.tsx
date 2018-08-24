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

    return (
        <View style={style}>
       
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
