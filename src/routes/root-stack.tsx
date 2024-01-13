import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from 'auth/routes';
import NavigationTab from 'common/NavigationTab';
import Splash from 'common/Splash';
import {AdminStack} from 'features/admin/routes';
import {navigationRef} from 'utils';

const Stack = createStackNavigator();

export const enum ROOT {
  SPLASH = 'splash',
  AUTH = 'auth',
  APP = 'app',
}

const DEFAULT_OPTIONS = {
  headerShown: false,
  animationEnabled: false,
};

const App = () => {
  return (
    <Stack.Navigator screenOptions={DEFAULT_OPTIONS}>
      <Stack.Screen name="Navigation Tabs" component={NavigationTab} />
      {AdminStack()}
    </Stack.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={DEFAULT_OPTIONS}
        initialRouteName={ROOT.SPLASH}>
        <Stack.Screen name={ROOT.SPLASH} component={Splash} />
        <Stack.Screen name={ROOT.AUTH} component={Auth} />
        <Stack.Screen name={ROOT.APP} component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
