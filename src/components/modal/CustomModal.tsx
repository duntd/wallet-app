import {Font} from 'components';
import {Colors} from 'const';
import {useWrapDispatch} from 'hooks';
import React, {Fragment} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SET_MODAL} from 'store/reducers/app';
import {height, padding, width} from 'utils';

export const CustomModal = ({
  title = 'Thông báo',
  content = <></>,
  onPress = () => {},
}) => {
  const inset = useSafeAreaInsets();

  const modal = useWrapDispatch(SET_MODAL);

  const _onPress = () => {
    onPress();
    modal({open: false, children: <Fragment />});
  };

  return (
    <View
      style={[
        padding(18, 18, 18, 18),
        {
          width: width(343),
          borderRadius: 10,
          backgroundColor: Colors.WHITE,
          position: 'absolute',
          alignSelf: 'center',
          top: height(80) + inset.top,
        },
      ]}>
      <Text
        style={[Font.f18_bold, {textAlign: 'center'}, padding(0, 14, 14, 14)]}>
        {title}
      </Text>
      {content}
    </View>
  );
};
