import {
    StackNavigator
} from 'react-navigation';
import { Text } from 'react-native';
import RootTabNavigator from './RootTabNavigator';

export default StackNavigator(
    {
        Summary: {
            screen: RootTabNavigator,
            navigationOptions: ({ navigation }) => ({
            }),
        }
    },
    {
        navigationOptions: {
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 10
            }
        }
    });