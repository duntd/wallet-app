import {Column, Container} from 'components';
import {ImageBackground, View, useWindowDimensions} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, padding} from 'utils';
import {Asset} from '../assets';
import {HomeButton} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FluctuationList from '../components/FluctuationList';
import FastImage from 'react-native-fast-image';

export const Home = () => {
  const inset = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();

  return (
    <Container>
      <Container position="absolute">
        <FastImage
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 50}}
          source={Asset.bg}
        />
      </Container>

      <Container {...padding(inset.top, 0, inset.bottom, 0)}>
        <Container>
          <HomeButton />
        </Container>

        <Container {...padding(110, 0, 0, 0)}>
          <FluctuationList />
        </Container>
      </Container>
    </Container>
  );
};
