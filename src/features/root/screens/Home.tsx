import {Column, Container} from 'components';
import {ImageBackground, View, useWindowDimensions} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, padding} from 'utils';
import {Asset} from '../assets';
import {HomeButton} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import FluctuationList from '../components/FluctuationList';

export const Home = () => {
  const inset = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();

  return (
    <Container>
      <Container position="absolute">
        <Image
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
          source={Asset.bg}
          transition={0}
          cachePolicy={'memory-disk'}
          priority={'high'}
          placeholder={Asset.bg}
        />
      </Container>

      <Container {...padding(inset.top, 0, inset.bottom, 0)}>
        <Container>
          <HomeButton />
        </Container>

        <Container {...padding(70, 0, 0, 0)}>
          <FluctuationList />
        </Container>
      </Container>
    </Container>
  );
};
