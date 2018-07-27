import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import MobileNavigator from './mobile/Navigator';
import NetConsumption from './net/NetConsumption';
import TelConsumption from './tel/TelConsumption';
import Vod from './vod';
import Header from '../../common/Header';
import { scale } from '../../../helpers/scaleHelper';
import { COLOR_PRIMARY, COLOR_GRAY_100, COLOR_GRAY_40, COLOR_GRAY_10 } from '../../../styles/commonStyles';
import { tabBarTopStyles } from '../../../styles/tabNavigationStyles';

const tabBarStyles = {
  backgroundColor: '#FFFFFF'
};
interface TabBarLabel {
  tintColor: string;
  focused: boolean;
}

export default TabNavigator({
  Mobile: {
    screen: MobileNavigator,
    navigationOptions: {
      title: 'Mobile'
    },
  },
  Net: {
    screen: NetConsumption,
    navigationOptions: {
      title: 'NET',
      header: (
        <Header text="CONSOMMATION" />
      )
    },
  },
  Tel: {
    path: 'tel-consumption',
    screen: TelConsumption,
    navigationOptions: {
      title: 'TEL',
      header: (
        <Header text="CONSOMMATION" />
      )
    },
  },
  Vod: {
    path: 'vod-consumption',
    screen: Vod,
    navigationOptions: {
      title: 'VOD',
      header: (
        <Header text="CONSOMMATION" />
      )
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
