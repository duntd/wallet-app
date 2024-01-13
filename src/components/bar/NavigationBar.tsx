import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Icon} from 'assets/icons';
import {Colors} from 'const';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {useAppSelector} from 'hooks';
import {height, padding, size} from 'utils';
import {AppText} from 'components';

export const NavigationBarIcon = (
  focused = true,
  activeIcon = Icon.Profile,
  inActiveIcon = Icon.Profile_outline,
) => {
  return (
    <Image
      source={focused ? activeIcon : inActiveIcon}
      style={{
        ...size(24, 24),
        tintColor: focused ? Colors.P6 : Colors.N5,
        marginBottom: height(8),
      }}
    />
  );
};

const Ring = ({delay}: {delay: number}) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [1, 2.2]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 1800,
        }),
        -1,
        false,
      ),
    );
  }, []);
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          ...size(10, 10),
          backgroundColor: Colors.RED5,
          borderRadius: 100,
        },
        delay ? ringStyle : {},
      ]}
    />
  );
};

export function NavigationBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const inset = useSafeAreaInsets();

  const {badge} = useAppSelector(state => state.app);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        borderTopWidth: 1,
        borderColor: Colors.P3,
        ...padding(12, 14, 6 + inset.bottom, 14),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const TabBarIcon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {TabBarIcon && (
                <TabBarIcon focused={isFocused} color={''} size={0} />
              )}
              <AppText
                f12_bold
                color={isFocused ? Colors.P6 : Colors.N5}
                textAlign="center"
                maxWidth="80%">
                {label.toString()}
              </AppText>

              {label.toString() == 'Thông báo' && badge && (
                <View style={{position: 'absolute', top: 0, right: '40%'}}>
                  <Ring delay={600} />
                  <Ring delay={1200} />
                  <Ring delay={1800} />
                  <Ring delay={0} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
