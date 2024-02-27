import {Container} from 'components';
import {ImageBackground, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SCREEN_HEIGHT, SCREEN_WIDTH, padding} from 'utils';
import {Asset} from '../assets';
import {HomeButton} from '../components';
import FastImage from 'react-native-fast-image';

export const Manage = () => {
  const inset = useSafeAreaInsets();

  return (
    <Container>
      <Container position="absolute">
        <FastImage
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 50}}
          source={Asset.bgRight}
        />
      </Container>
    </Container>
  );
};
