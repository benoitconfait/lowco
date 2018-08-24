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

import {
    COLOR_GRAY_80
} from '../../../styles/commonStyles';
import BarChartColumnBasic from '../../common/charts/BarChartColumnBasic';
import { scale } from '../../../helpers/scaleHelper';
import { getAddressesOptions } from '../../../helpers/addressesHelper';
import moment from 'moment';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;
import IconImage from '../../common/IconImage';

function FixOffer({ style, addresses, options, selectedPodId, onAddressChange }) {
    // drop down options
    const addressOptions = getAddressesOptions(addresses);

    // pack metadata
    const usageAddress = addresses && addresses.find((address) => address.pointOfDelivery === selectedPodId);

    // TODO: distinct on externalId
    const includedOptionNames = options && options.filter((option =>
        option.isIncludedInPack &&
        option.category !== 'Mobile' &&
        option.id !== 'SOHO' &&
        !option.isCommercialParameter &&
        option.status === 'Active'))
        .map((option) => option.name)
        /* distinct */
        .filter((optionName, index, self) => self.indexOf(optionName) === index);

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
    includedOptions: {
        marginTop: scale(30)
    },
    includedOption: {
        flexDirection: 'row'
    },
    includedOptionName: {
        flexDirection: 'row',
        width: '70%',
        paddingLeft: scale(5)
    },
    optionName: {
        marginLeft: scale(5),
    },
    included: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '30%'
    },
    includedNote: {
        color: COLOR_GRAY_80,
        fontSize: scale(10),
        paddingRight: scale(10),
        lineHeight: scale(18)
    }
});

export default FixOffer;
