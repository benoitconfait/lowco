import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Summary from './screens/summary';
import Consumption from './screens/consumption';
import ConsumptionStackNavigator from './screens/consumption/ConsumptionStackNavigator';
import Invoice from './screens/invoice';
import AccountStackNavigator from './screens/account/AccountStackNavigator';
import Temp from './screens/error/Temp';
import Plus from './screens/plus';
import { COLOR_PRIMARY, COLOR_GRAY_20, COLOR_GRAY_50, COLOR_WHITE } from '../styles/commonStyles';
import MobileOutOfBundle from './screens/consumption/mobile/OutOfBundle';
import Header from './common/Header';
import { scale } from '../helpers/scaleHelper';
import IconImage from './common/IconImage';
import IconSize = VOO.Mobile.App.Enums.IconSize;
import Icon = VOO.Mobile.App.Enums.Icon;

const tabBarStyles = {
  height: scale(44),
  backgroundColor: COLOR_WHITE,
  borderTopWidth: scale(2),
  borderTopColor: COLOR_GRAY_20,
  paddingVertical: scale(1)
};
interface TabBarLabel {
  tintColor: string;
  focused: boolean;
}

export default TabNavigator({
  Home: {
    path: 'summary',
    screen: Summary,
    navigationOptions: {
      header: (
        <Header text="Résumé" />
      ),
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Résumé</Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        <IconImage icon={Icon.VOO_CIRCLED} style={{ width: scale(23), height: scale(23) }} color={focused ? COLOR_PRIMARY : COLOR_GRAY_50} />
      )
    }
  },
  Consumption: {
    path: 'consumption',
    header: (
      <Header text="Consommation" />
    ),
    screen: ConsumptionStackNavigator,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Consommation</Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        <IconImage icon={Icon.LIST} style={{ width: scale(17), height: scale(17) }} color={focused ? COLOR_PRIMARY : COLOR_GRAY_50} />
      )
    })
  },
  Invoice: {
    path: 'invoice',
    screen: Invoice,
    navigationOptions: {
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Factures</Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        <IconImage icon={Icon.EURO} style={{ width: scale(14), height: scale(14) }} color={focused ? COLOR_PRIMARY : COLOR_GRAY_50} />
      ),
      header: (
        <Header text="Factures" />
      )
    }
  },
  MyAccount: {
    path: 'account',
    screen: AccountStackNavigator,
    navigationOptions: {
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Mon compte</Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        <IconImage icon={Icon.USER} style={{ width: scale(20), height: scale(20) }} color={focused ? COLOR_PRIMARY : COLOR_GRAY_50} />
      ),
      headerMode: 'none',
    }
  },
  Plus: {
    path: 'plus',
    screen: Plus,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Plus</Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        <IconImage icon={Icon.HAMBURGER} style={{ width: scale(17), height: scale(17) }} color={focused ? COLOR_PRIMARY : COLOR_GRAY_50} />
      )
    })
  },

  /*TempError: {
    screen: Temp,
    header: (
      <Header text="Errors" />
    ),
    navigationOptions: {
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Errors</Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.icone, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}>Y</Text>
      )
    }
  }*/
}, {
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: tabBarStyles
    }
  });

const styles = StyleSheet.create({
  label: {
    padding: 0,
    marginBottom: scale(2),
    fontSize: scale(8.74),
    textAlign: 'center'
  }
});
