import { TabBarTop } from 'react-navigation';
import { COLOR_PRIMARY, COLOR_GRAY_90 } from './commonStyles';
import { scale } from '../helpers/scaleHelper';
import { TabNavigatorConfig } from 'react-navigation';

export const tabBarTopStyles : TabNavigatorConfig = {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      upperCaseLabel: false,
      inactiveTintColor: COLOR_PRIMARY,
      labelStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_GRAY_90,
      },
      tabStyle: {
        height: scale(36)
      },
      style: {
        backgroundColor: '#ffffff'
      },
      indicatorStyle: {
        backgroundColor: COLOR_PRIMARY,
        height: scale(4)
      }
    }
  };