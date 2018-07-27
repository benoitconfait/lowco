import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import { COLOR_PRIMARY, COLOR_GRAY_40, COLOR_GRAY_10 } from '../../../../styles/commonStyles';
import NetDaily from './NetDaily';
import NetMonthly from './NetMonthly';
import { scale } from '../../../../helpers/scaleHelper';
import { tabBarTopStyles } from '../../../../styles/tabNavigationStyles';

const tabBarStyles = {
  backgroundColor: COLOR_GRAY_10
};
interface TabBarLabel {
  tintColor: string;
  focused: boolean;
}

export const NetDetailsTabNavigator = TabNavigator({
  NetDaily: {
    screen: NetDaily,
    navigationOptions: {
      title: 'Jour par jour'
    },
  },
  NetMonthly: {
    screen: NetMonthly,
    navigationOptions: {
      title: 'Mois par mois'
    },
  }
}, tabBarTopStyles);

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(10)
  },
  icone: {
    padding: 0,
    margin: 0,
    fontFamily: 'iconesVOO',
    fontSize: scale(30),
    lineHeight: scale(25)
  }
});
