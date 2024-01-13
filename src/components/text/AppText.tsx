import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {font} from 'utils';

interface Props extends TextStyle {
  f10?: boolean;
  f10_bold?: boolean;
  f12?: boolean;
  f12_bold?: boolean;
  f14?: boolean;
  f14_bold?: boolean;
  f16?: boolean;
  f16_bold?: boolean;
  f18?: boolean;
  f18_bold?: boolean;
  f20?: boolean;
  f20_bold?: boolean;
  color?: string;
  numberOfLines?: number;
  children?: ReactNode;
  ellipsizeMode?: 'middle' | 'head' | 'tail' | 'clip';
}

export const AppText: React.FC<Props> = props => {
  const {
    f10,
    f10_bold,
    f12,
    f12_bold,
    f14,
    f14_bold,
    f16,
    f16_bold,
    f18,
    f18_bold,
    f20,
    f20_bold,
    numberOfLines,
    ellipsizeMode,
    children,
    ...prop
  } = props;

  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[
        f10 ? Font.f10 : null,
        f10_bold ? Font.f10_bold : null,
        f12 ? Font.f12 : null,
        f12_bold ? Font.f12_bold : null,
        f14 ? Font.f14 : null,
        f14_bold ? Font.f14_bold : null,
        f16 ? Font.f16 : null,
        f16_bold ? Font.f16_bold : null,
        f18 ? Font.f18 : null,
        f18_bold ? Font.f18_bold : null,
        f20 ? Font.f20 : null,
        f20_bold ? Font.f20_bold : null,
        {...prop},
      ]}>
      {children}
    </Text>
  );
};

export const Font = StyleSheet.create({
  f10_bold: {
    fontSize: font(10),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  f12_bold: {
    fontSize: font(12),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  f14_bold: {
    fontSize: font(14),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  f16_bold: {
    fontSize: font(16),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  f18_bold: {
    fontSize: font(18),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  f20_bold: {
    fontSize: font(20),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },

  f10: {
    fontSize: font(10),
    fontFamily: 'Montserrat-Regular',
  },
  f12: {
    fontSize: font(12),
    fontFamily: 'Montserrat-Regular',
  },
  f14: {
    fontSize: font(14),
    fontFamily: 'Montserrat-Regular',
  },
  f16: {
    fontSize: font(16),
    fontFamily: 'Montserrat-Regular',
  },
  f18: {
    fontSize: font(18),
    fontFamily: 'Montserrat-Regular',
  },
  f20: {
    fontSize: font(20),
    fontFamily: 'Montserrat-Regular',
  },
});
