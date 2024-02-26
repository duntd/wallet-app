import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'assets/icons';
import {NavigationBar, NavigationBarIcon} from 'components';

import {createStackNavigator} from '@react-navigation/stack';
import {ROOT} from './route';
import Main from '../screens';

const Stack = createStackNavigator();

export const AppStack = () => (
  <Stack.Group>
    <Stack.Screen name={ROOT.HOME} component={Main} />
  </Stack.Group>
);
