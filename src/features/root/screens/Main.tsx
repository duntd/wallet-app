import {AppText, Container, Row} from 'components';
import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {Asset} from '../assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {margin, padding, size} from 'utils';
import {Colors} from 'const';
import {HomeButton} from '../components';
import LiquidSwipe from '../components/LiquidSwipe';

const Main = () => {
  return <LiquidSwipe />;
};

export default Main;
