import React from 'react';
import {View, ViewStyle} from 'react-native';
import {height, width} from 'utils';

interface Props extends ViewStyle {
  bg?: string;
}

export const Spacing: React.FC<Props> = props => {
  const {height: pHeight = 0, width: pWidth = 0, bg} = props;
  return (
    <View
      style={[
        props,
        {
          height: typeof pHeight === 'number' ? height(pHeight) : pHeight,
          width: typeof pWidth === 'number' ? width(pWidth) : pWidth,
          backgroundColor: bg ? bg : 'transparent',
        },
      ]}></View>
  );
};
