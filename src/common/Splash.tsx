import {TOKEN_ID} from '@env';
import {Images} from 'assets/images';
import {Container, Spacing} from 'components';
import {Colors} from 'const';
import {useEffect} from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {ROOT} from 'routes/root-stack';
import {ConfigUtil, center, navigateReset, size} from 'utils';

const Splash = () => {
  const handleNavigate = async () => {
    const access_token = await ConfigUtil.getStorage(TOKEN_ID);

    setTimeout(() => {
      if (!access_token) {
        navigateReset(ROOT.AUTH);
        return;
      }

      navigateReset(ROOT.APP);
    }, 500);
  };

  useEffect(() => {
    handleNavigate();
  }, []);

  return (
    <Container>
      <ImageBackground source={Images.bg} style={[{flex: 1}, center]}>
        <Image
          source={Images.logo}
          style={size(300, 100)}
          resizeMode="contain"
        />

        <Spacing height={50} />
        <ActivityIndicator size={'large'} color={Colors.WHITE} />
      </ImageBackground>
    </Container>
  );
};

export default Splash;
