import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'assets/icons';
import {NavigationBar, NavigationBarIcon} from 'components';

import {createStackNavigator} from '@react-navigation/stack';
import {ADMIN} from '.';
import {
  AdminHome,
  AdminMenu,
  AdminNotification,
  AdminProfile,
  AdminAccount,
} from '../screens';

const Tab = createBottomTabNavigator();
const DEFAULT_OPTIONS = {
  headerShown: false,
  animationEnabled: false,
};

export const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={DEFAULT_OPTIONS}
      tabBar={props => <NavigationBar {...props} />}>
      <Tab.Screen
        name={ADMIN.ADMIN_HOME}
        component={AdminHome}
        options={{
          tabBarLabel: 'Tổng quan',
          tabBarIcon: ({focused}) =>
            NavigationBarIcon(focused, Icon.Product, Icon.Product_outline),
        }}
      />
      <Tab.Screen
        name={ADMIN.ADMIN_MENU}
        component={AdminMenu}
        options={{
          tabBarLabel: 'Chức năng',
          tabBarIcon: ({focused}) =>
            NavigationBarIcon(focused, Icon.Receipt, Icon.Receipt_outline),
        }}
      />
      <Tab.Screen
        name={ADMIN.ADMIN_NOTIFICATION}
        component={AdminNotification}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({focused}) =>
            NavigationBarIcon(
              focused,
              Icon.Notification,
              Icon.Notification_outline,
            ),
        }}
      />
      <Tab.Screen
        name={ADMIN.ADMIN_PROFILE}
        component={AdminProfile}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({focused}) =>
            NavigationBarIcon(focused, Icon.Profile, Icon.Profile_outline),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export const AdminStack = () => (
  <Stack.Group>
    <Stack.Screen name={ADMIN.ADMIN_ACCOUNT} component={AdminAccount} />
  </Stack.Group>
);
