import React from 'react';
import {
    StackNavigator
} from 'react-navigation';

import MobileConsumption from './index';
import MobileOutOfBundle from './OutOfBundle';
import MobileDetailsTabNavigator from './MobileDetailsTabNavigator';
import Header from '../../../common/Header';

export default StackNavigator(
    {
        MobileConsumption: {
            screen: MobileConsumption,
            navigationOptions: ({ navigation }) => ({
                title: 'Mobile',
                header: (
                    <Header text="CONSOMMATION" />
                )
            }),
        },
        // MobileDetailedConsumption: {
        //     screen: MobileDetailsTabNavigator,
        //     navigationOptions: ({ navigation, state }) => ({
        //         title: 'DÉTAILS'
        //     })
        // }
    },
    {
        headerMode: 'none'
    });