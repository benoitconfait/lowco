import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import TelOptionsConfiguration from './TelOptionsConfiguration';
import TelParametersConfiguration from './TelParametersConfiguration';
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

export const AccountOptionsTelTabNavigator = TabNavigator({
  Options: {
    screen: TelOptionsConfiguration,
    navigationOptions: {
      title: 'Options'
    },
  },
  FreeOptions : {
    screen : TelParametersConfiguration,
    navigationOptions: {
      title: 'Paramètres'
    },
  }
}, tabBarTopStyles);

const styles = StyleSheet.create({
  label: {
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

export default AccountOptionsTelTabNavigator;