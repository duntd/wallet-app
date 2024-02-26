import {Container} from 'components';
import {ImageBackground, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SCREEN_HEIGHT, SCREEN_WIDTH, padding} from 'utils';
import {Asset} from '../assets';
import {HomeButton} from '../components';
import {Image} from 'expo-image';

export const Note = () => {
  const inset = useSafeAreaInsets();

  return (
    <Container>
      <Container position="absolute">
        <Image
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
          source={Asset.bgLeft}
          transition={0}
          cachePolicy={'memory-disk'}
          priority={'high'}
          placeholder={Asset.bgLeft}
        />
      </Container>
    </Container>
  );
};
