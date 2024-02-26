import {AppText} from 'components';
import {Colors} from 'const';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {size} from 'utils';

export type StarProps = {
  delay: number;
  top: number;
};

export const Star = ({delay, top}: StarProps) => {
  const value = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: '315deg'},
        {translateY: 150},
        {translateX: interpolate(value.value, [0, 0.7, 1], [0, 0, -1500])},
      ],
      opacity: interpolate(value.value, [0, 0.7, 1], [1, 1, 0]),
    };
  });

  useEffect(() => {
    value.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 7000,
        }),
        -1,
        false,
      ),
    );
  }, []);

  return (
    <Animated.View style={[{...styles.star, top}, animatedStyle]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.P100, Colors.WHITE]}>
        <View style={{height: 1}} />
      </LinearGradient>

      <View
        style={{
          position: 'absolute',
          left: 0,
          top: -1,
          ...size(4, 4),
          borderRadius: 100,
          backgroundColor: Colors.P100,
          shadowColor: Colors.P300,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,

          elevation: 1,
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  star: {
    width: 300,
    height: 1,
    // position: 'absolute',
    top: 100,
    right: -300,
    // backgroundColor: 'red',
  },
  star_head: {
    position: 'absolute',
    left: 0,
    top: -1,
    ...size(4, 4),
    borderRadius: 100,
    backgroundColor: Colors.P100,
    shadowColor: Colors.P300,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 1,
  },
});
