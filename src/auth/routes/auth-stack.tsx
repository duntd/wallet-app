import {createStackNavigator} from '@react-navigation/stack';
import {AUTH} from '.';
import {Login, Register} from '../screens';

const Stack = createStackNavigator();

const DEFAULT_OPTIONS = {
  headerShown: false,
  animationEnabled: false,
};

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={DEFAULT_OPTIONS}>
      <Stack.Screen name={AUTH.LOGIN} component={Login} />
      <Stack.Screen name={AUTH.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};
