import React from 'react';
import {
  StackNavigator
} from 'react-navigation';
import { Text, Button, TouchableHighlight, View } from 'react-native';
import Account from './index';
import GeneralConditions from './GeneralConditions';
import AccountInfo from './AccountInfo';
import MyOffer from './MyOffer';
import AccountOptions from './AccountOptions';
import NetTabNavigator from './options/net/NetTabNavigator';
import AccountOptionsTelTabNavigator from './options/tel/TelTabNavigator';
import AccountOptionsTvTabNavigator from './options/tv/TvTabNavigator';
import AccountOptionsMobileTabNavigator from './options/mobile/MobileTabNavigator';
import IconImage from '../../common/IconImage';
import Icon = VOO.Mobile.App.Enums.Icon;
import { ProfileHeader } from './ProfileHeader';
import Header from '../../common/Header';


export default StackNavigator(
  {
    Main: {
      screen: Account,
      title: 'Account',
      header: 'Account',
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return ({
          header: () => {            
            return (<ProfileHeader clientName={state && state.params && state.params.firstname && state.params.lastname ? `${state.params.firstname} ${state.params.lastname}` : ''} 
            clientNumber={state && state.params ? state.params.customerId : ''} showBackButton={false} navigation={navigation} />);
          },
        })
      }
    },
    AccountInfo: {
      screen: AccountInfo,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header hasBackButton={true} navigation={navigation} text="INFORMATIONS DU COMPTE" />
        )
      }),
    },
    MyOffer: {
      screen: MyOffer,
      title: 'MyOffer',
      header: 'MyOffer',
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header hasBackButton={true} navigation={navigation} text="MON OFFRE" />
        )
      })
    },
    GeneralConditions: {
      screen: GeneralConditions,
      title: 'GeneralConditions',
      header: 'GeneralConditions',
      navigationOptions: ({ navigation }) => ({
        title: 'CONDITIONS GENERALES',
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 10
        },
      }),
    },
    AccountOptions: {
      screen: AccountOptions,
      title: 'AccountOptions',
      header: 'AccountOptions',
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return ({
          header: () => {            
            return (<ProfileHeader clientName={state && state.params && state.params.firstname && state.params.lastname ? `${state.params.firstname} ${state.params.lastname}` : ''} 
            clientNumber={state && state.params ? state.params.customerId : ''} showBackButton={true} navigation={navigation} />);
          },
        })
      }
    },
    AccountOptionsNet: {
      screen: NetTabNavigator,
      title: 'AccountOptionsNet',
      header: 'AccountOptionsNet',
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header hasBackButton={true} navigation={navigation} text="CONFIGURATION INTERNET" />
        )
      })
    },
    AccountOptionsTel: {
      screen: AccountOptionsTelTabNavigator,
      title: 'AccountOptionsTel',
      header: 'AccountOptionsTel',
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header hasBackButton={true} navigation={navigation} text="CONFIGURATION TELEPHONE" />
        )
      })
    },
    AccountOptionsTv: {
      screen: AccountOptionsTvTabNavigator,
      title: 'AccountOptionsTv',
      header: 'AccountOptionsTv',
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header hasBackButton={true} navigation={navigation} text="CONFIGURATION TV" />
        )
      })
    },
    AccountOptionsMobile: {
      screen: AccountOptionsMobileTabNavigator,
      title: 'AccountOptionsMobile',
      header: 'AccountOptionsMobile',
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header hasBackButton={true} navigation={navigation} text="CONFIGURATION MOBILE" />
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