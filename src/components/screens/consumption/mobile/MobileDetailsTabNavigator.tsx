import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import Details from './Details';
import { COLOR_PRIMARY, COLOR_GRAY_40, COLOR_GRAY_10 } from '../../../../styles/commonStyles';
import { scale } from '../../../../helpers/scaleHelper';
import { tabBarTopStyles } from '../../../../styles/tabNavigationStyles';

const tabBarStyles = {
  backgroundColor: COLOR_GRAY_10
};
interface TabBarLabel {
  tintColor: string;
  focused: boolean;
}

export const MobileDetailsTabNavigator = TabNavigator({
  All: {
    screen: props => <Details {...props} recordType='All' />,
    navigationOptions: {
      title: 'Tous'
    },
  },
  Calls: {
    screen: props => <Details {...props} recordType='Voice' />,
    navigationOptions: {
      title: 'Appels'
    },
  },
  TextMessages: {
    screen: props => <Details {...props} recordType='Sms' />,
    navigationOptions: {
      tabBarLabel: <Text style={{ textAlign: 'center', width: scale(100) }}>SMS/MMS</Text>
    },
  },
  Data: {
    screen: props => <Details {...props} recordType="Data" />,
    navigationOptions: {
      title: 'Data'
    },
  },
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

export default MobileDetailsTabNavigator;