import React from 'react';
import { StyleSheet, RefreshControl, View, ActivityIndicator, Text, Modal } from 'react-native';
import ConsumptionTabNavigator from './ConsumptionTabNavigator';
import ErrorHandler from '../../ErrorHandler';
import MobileConsumption from './mobile';
import MobileOutOfBundle from './mobile/OutOfBundle';

import TelDetailedConsumption from './tel/TelDetailedConsumption';
import TelOutOfBundle from './tel/OutOfBundle';
import { Icon } from 'react-native-elements';

import {
    NavigationActions,
    StackNavigator
} from 'react-navigation';

export default StackNavigator(
    {
        Main: {
            path: 'consumption/mobile',
            screen: ConsumptionTabNavigator,
            title: 'Mobile'
        },
        MobileOutOfBundle: {
            path: 'out-of-bundle',
            screen: MobileOutOfBundle
        },
        TelDetailedConsumption: {
            screen: TelDetailedConsumption,
            navigationOptions: ({ navigation }) => ({
                title: 'DÉTAILS'
            })
        },
        TelOutOfBundle: {
            screen: TelOutOfBundle,
            navigationOptions: ({ navigation }) => ({
                title: 'HORS-FORFAIT'
            })
        },
    });
