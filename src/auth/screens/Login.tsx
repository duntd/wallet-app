import {Asset} from 'auth/assets';
import ShootingStar from 'auth/components/shootingStar';
import {AppText, Container} from 'components';
import {useModal} from 'hooks';
import React, {useEffect} from 'react';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'utils';
import {Image} from 'expo-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login = () => {
  return (
    <Container>
      <Container position="absolute">
        <Image
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 50}}
          source={Asset.bg}
          contentFit="cover"
        />
      </Container>

      <Container position="absolute">
        <ShootingStar />
      </Container>
    </Container>
  );
};

export default Login;
