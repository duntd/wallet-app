import {Row} from 'components';
import {Image, View} from 'react-native';
import {height, margin, size, width} from 'utils';
import {Asset} from '../assets';
import {Colors} from 'const';
import {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const Ring = ({delay}: {delay: number}) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.6 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [1, 25]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2500,
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
          ...size(60, 60),
          backgroundColor: Colors.P50,
          borderRadius: 100,
        },
        delay ? ringStyle : {},
      ]}
    />
  );
};

export const HomeButton = () => {
  return (
    <Row>
      <View style={{position: 'absolute', top: height(10), left: width(20)}}>
        <Ring delay={200} />
        {/* <Ring delay={1800} />
        <Ring delay={3200} /> */}
        {/* <Ring delay={0} /> */}
      </View>
      <Row
        borderRadius={100}
        {...size(60, 60)}
        {...margin(10, 0, 10, 20)}
        backgroundColor={Colors.WHITE}
        justifyContent="center"
        opacity={0.95}>
        <Image source={Asset.heart} style={{...size(44, 44), opacity: 0.8}} />
      </Row>
    </Row>
  );
};
