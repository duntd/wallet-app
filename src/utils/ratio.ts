import {Dimension} from 'const';
import {Dimensions, PixelRatio, Platform, ViewStyle} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export let screenInsets = {
  top: 0,
  bottom: 0,
};

export const width = (width: number): number => {
  return responsiveWidth((width / Dimension.BASE.WIDTH) * 100);
};

export const height = (height: number): number => {
  return responsiveHeight((height / Dimension.BASE.HEIGHT) * 100);
};

export const heightSafeArea = (height: number): number => {
  const insetRate = (screenInsets.top + screenInsets.bottom) / SCREEN_HEIGHT;

  return responsiveHeight(
    (height / Dimension.BASE.HEIGHT) * (1 - insetRate) * 100,
  );
};

export const fixedWidth = (_length: number): number => {
  return width(_length);
};

export const fixedHeight = (_length: number): number => {
  return fixedWidth(_length);
};

export const font = (size: number): number => {
  const scale = Math.min(
    SCREEN_WIDTH / Dimension.BASE.WIDTH,
    SCREEN_HEIGHT / Dimension.BASE.HEIGHT,
  );
  return PixelRatio.roundToNearestPixel(size * scale);
};

export const fontWeightBold = () => {
  return Platform.OS === 'ios' ? '600' : '700';
};

export const size = (_width = 0, _height = 0) => {
  const __width = width(_width);

  if (_width === _height) {
    return {
      width: __width,
      height: __width,
    };
  }

  return {
    width: __width,
    height: height(_height),
  };
};

export const fixedSize = (_width = 0, _height = 0) => {
  return {
    width: fixedWidth(_width),
    height: fixedHeight(_height),
  };
};

export const padding = (
  top: number = 0,
  right: number = 0,
  bottom?: number,
  left?: number,
) => {
  return {
    paddingTop: height(top),
    paddingRight: width(right),
    paddingBottom: height(bottom !== undefined ? bottom : top),
    paddingLeft: width(left !== undefined ? left : right),
  };
};

export const fixedPadding = (
  top: number = 0,
  right: number = 0,
  bottom?: number,
  left?: number,
) => {
  return {
    paddingTop: fixedHeight(top),
    paddingRight: fixedWidth(right),
    paddingBottom: fixedHeight(bottom !== undefined ? bottom : top),
    paddingLeft: fixedWidth(left !== undefined ? left : right),
  };
};

export const margin = (
  top: number = 0,
  right: number = 0,
  bottom?: number,
  left?: number,
) => {
  return {
    marginTop: height(top),
    marginRight: width(right),
    marginBottom: height(bottom !== undefined ? bottom : top),
    marginLeft: width(left !== undefined ? left : right),
  };
};

export const fixedMargin = (
  top: number = 0,
  right: number = 0,
  bottom?: number,
  left?: number,
) => {
  return {
    marginTop: fixedHeight(top),
    marginRight: fixedWidth(right),
    marginBottom: fixedHeight(bottom !== undefined ? bottom : top),
    marginLeft: fixedWidth(left !== undefined ? left : right),
  };
};

export const borderRadius = (
  top: number = 0,
  right?: number,
  bottom?: number,
  left?: number,
) => {
  return {
    borderTopStartRadius: width(top),
    borderTopEndRadius: width(right !== undefined ? right : top),
    borderBottomRightRadius: width(bottom !== undefined ? bottom : top),
    borderBottomLeftRadius: width(
      left !== undefined ? left : bottom ? bottom : top,
    ),
  };
};

export const center: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};
