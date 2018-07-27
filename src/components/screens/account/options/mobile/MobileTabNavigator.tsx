import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import MobileFreeOptionsConfiguration from './MobileFreeOptionsConfiguration';
import MobileOptionsConfiguration from './MobileOptionsConfiguration';
import MobileParametersConfiguration from './MobileParametersConfiguration';
import { COLOR_PRIMARY, COLOR_GRAY_40, COLOR_GRAY_10 } from '../../../../../styles/commonStyles';
import { scale } from '../../../../../helpers/scaleHelper';
import { tabBarTopStyles } from '../../../../../styles/tabNavigationStyles';

const tabBarStyles = {
  backgroundColor: COLOR_GRAY_10
};
interface TabBarLabel {
  tintColor: string;
  focused: boolean;
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    width: scale(100)
  }
});

export const AccountOptionsMobileTabNavigator = TabNavigator({
  Options: {
    screen: MobileOptionsConfiguration,
    navigationOptions: {
      title: 'Options'
    },
  },
  Parameters: {
    screen: MobileParametersConfiguration,
    navigationOptions: {
      title: 'Paramètres'
    },
  },
  FreeOptions: {
    screen: MobileFreeOptionsConfiguration,
    navigationOptions: {
      tabBarLabel: <Text style={styles.tabBarLabel}>Service gratuit</Text>
    },
  }
}, tabBarTopStyles);

export default AccountOptionsMobileTabNavigator;