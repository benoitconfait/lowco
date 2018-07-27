import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import ConsumptionTabNavigator from './ConsumptionTabNavigator';
import { MobileDetailsTabNavigator } from './mobile/MobileDetailsTabNavigator';
import MobileOutOfBundle from './mobile/OutOfBundle';
import { NetDetailsTabNavigator } from './net/NetDetailsTabNavigator';
import TelDetailedConsumption from './tel/TelDetailedConsumption';
import TelOutOfBundle from './tel/OutOfBundle';
import Header from '../../common/Header';

export default StackNavigator(
    {
        Mobile: {
            screen: ConsumptionTabNavigator,
        },
        MobileDetailedConsumption: {
            screen: MobileDetailsTabNavigator,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header hasBackButton={true} navigation={navigation} text="DÉTAILS" />
                )
            })
        },
        MobileOutOfBundle: {
            screen: MobileOutOfBundle,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header hasBackButton={true} navigation={navigation} text="HORS-FORFAIT" />
                )
            })
        },
        NetDetailedConsumption: {
            screen: NetDetailsTabNavigator,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header hasBackButton={true} navigation={navigation} text="DÉTAILS" />
                )
            })
        },
        TelDetailedConsumption: {
            screen: TelDetailedConsumption,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header hasBackButton={true} navigation={navigation} text="DÉTAILS" />
                )
            })
        },
        TelOutOfBundle: {
            screen: TelOutOfBundle,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header hasBackButton={true} navigation={navigation} text="HORS-FORFAIT" />
                )
            })
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 10
            }
        }
    });