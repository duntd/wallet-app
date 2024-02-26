import {Colors} from 'const';
import {useAppSelector} from 'hooks';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {shallowEqual} from 'react-redux';
import {height, size, width} from 'utils';
import Svg, {Circle} from 'react-native-svg';
import {Images} from 'assets/images';

const SIZE = width(50);
const strokeWidth = width(3);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const {PI} = Math;
const r = (SIZE - strokeWidth) / 2;
const cx = SIZE / 2;
const cy = SIZE / 2;
const A = 2 * PI;
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
interface CircularProgressProps {}

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
          ...size(45, 45),
          backgroundColor: Colors.P400,
          borderRadius: 100,
        },
        delay ? ringStyle : {},
      ]}
    />
  );
};

const LoadingToast: React.FC<CircularProgressProps> = props => {
  const config = {
    duration: 1400,
    easing: Easing.linear,
  };
  const rotation = useSharedValue(0);
  const circumference = r * A;

  const animatedProps = useAnimatedProps(() => {
    return {strokeDashoffset: circumference * (1 - rotation.value)};
  });

  const svgRotate = useAnimatedStyle(() => ({
    transform: [
      {rotateZ: `${180 * (1 - rotation.value) * (rotation.value - 1)}deg`},
    ],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(0.5, {duration: 700, easing: Easing.linear}),
        withTiming(1, config),
        withTiming(2, config),
      ),
      -1,
      true,
    );
    return () => cancelAnimation(rotation);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.spinner}>
        <Ring delay={600} />
        <Ring delay={1200} />
        <Ring delay={1800} />
        <Ring delay={0} />
        <Animated.View style={styles.logoContainer}>
          <Image
            source={Images.app_logo}
            style={{...size(40, 40), borderRadius: 100}}
          />
        </Animated.View>
        <AnimatedSvg width={SIZE} height={SIZE} style={svgRotate}>
          <Circle
            stroke="rgba(255, 255, 255, 0.2)"
            fill="none"
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
          />
          <AnimatedCircle
            stroke={Colors.P300}
            fill="none"
            strokeDasharray={`${circumference}, ${circumference}`}
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
            animatedProps={animatedProps}
          />
        </AnimatedSvg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    height: width(812),
    width: '100%',
    top: -height(39),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height(100),
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: height(10),
    borderRadius: height(6),
  },
  logoContainer: {
    position: 'absolute',
    backgroundColor: Colors.P100,
    borderRadius: height(50),
  },
});

const Loading = () => {
  const {loading} = useAppSelector(state => state.app, shallowEqual);
  const {height, width} = useWindowDimensions();

  return (
    <View
      style={[
        {
          display: loading.isLoading ? 'flex' : 'none',
          height,
          width,
          position: 'absolute',
          backgroundColor: Colors.BLUR,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <LoadingToast />
    </View>
  );
};

export default Loading;
