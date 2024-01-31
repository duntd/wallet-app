import {TOKEN_ID} from '@env';
import {Images} from 'assets/images';
import {AppText, Column, Container, Row, Scroll, Spacing} from 'components';
import {Colors} from 'const';
import {useDateTimer} from 'hooks';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ROOT} from 'routes/root-stack';
import {ConfigUtil, center, height, navigateReset, size, width} from 'utils';

const DateTimer = () => {
  const {time, month, day, hour, minute, second} = useDateTimer();

  return (
    <Column>
      <Text style={{fontFamily: 'Literata-Regular', fontSize: 40}}>
        {second}
      </Text>
    </Column>
  );
};

const Splash = () => {
  // const handleNavigate = async () => {
  //   const access_token = await ConfigUtil.getStorage(TOKEN_ID);

  //   setTimeout(() => {
  //     if (!access_token) {
  //       navigateReset(ROOT.AUTH);
  //       return;
  //     }

  //     navigateReset(ROOT.APP);
  //   }, 500);
  // };

  // useEffect(() => {
  //   handleNavigate();
  // }, []);

  const cropHeight = height(812);
  const cropWidth = width(375);

  const time = useDateTimer();

  return (
    <Container>
      <ScrollView horizontal bounces={false}>
        <Image source={Images.bg} style={size(1444, 812)} />
      </ScrollView>

      <Row position="absolute" bottom={0} alignSelf="center">
        <Image source={Images.couple} style={{...size(300, 380)}} />
      </Row>

      <Row position="absolute" top={100} alignSelf="center">
        <DateTimer />
      </Row>
    </Container>
  );
};

export default Splash;
