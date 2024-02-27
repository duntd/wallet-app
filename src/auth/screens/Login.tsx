import {Asset} from 'auth/assets';
import ShootingStar from 'auth/components/shootingStar';
import {AppText, Container} from 'components';
import {useModal} from 'hooks';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'utils';

const Login = () => {
  return (
    <Container>
      <Container position="absolute">
        <FastImage
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 50}}
          source={Asset.bg}
        />
      </Container>

      <Container position="absolute">
        <ShootingStar />
      </Container>
    </Container>
  );
};

export default Login;
