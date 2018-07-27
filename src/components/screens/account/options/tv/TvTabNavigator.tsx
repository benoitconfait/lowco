import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import TvFreeOptionsConfiguration from './TvFreeOptionsConfiguration';
import TvOptionsConfiguration from './TvOptionsConfiguration';
import TvParametersConfiguration from './TvParametersConfiguration';
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

export const AccountOptionsTvTabNavigator = TabNavigator({
  Options: {
    screen: TvOptionsConfiguration,
    navigationOptions: {
      title: 'Options'
    },
  },
  Parameters : {
    screen : TvParametersConfiguration,
    navigationOptions: {
      title: 'Paramètres'
    },
  },
  FreeOptions : {
    screen : TvFreeOptionsConfiguration,
    navigationOptions: {
      tabBarLabel: <Text style={styles.tabBarLabel}>Service gratuit</Text>
    },
  }
}, tabBarTopStyles);

export default AccountOptionsTvTabNavigator;