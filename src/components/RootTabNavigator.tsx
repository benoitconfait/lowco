import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_GRAY_20, COLOR_GRAY_50, COLOR_WHITE } from '../styles/commonStyles';
import Header from './common/Header';
import { scale } from '../helpers/scaleHelper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Home } from './screens/home';
import { SearchBar } from 'react-native-elements'

const icon = (<FontAwesome5 name={'comments'} />);
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
    path: 'home',
    screen: Home,
    navigationOptions: {
      header: (
    <SearchBar
      round
      lightTheme
      onChangeText={() => console.log('text changed')}
      placeholder='' />
      ),
      tabBarLabel: ({ tintColor, focused }: TabBarLabel) => (
        <Text style={[styles.label, { color: focused ? COLOR_PRIMARY : COLOR_GRAY_50 }]}></Text>
      ),
      tabBarIcon: ({ tintColor, focused }: TabBarLabel) => (
        (<FontAwesome5 name={'map-marker'} size={24} color={COLOR_PRIMARY} />)
      )
    }
  },
  /*
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
*/
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
