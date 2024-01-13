import {Font} from 'components';
import {CustomButton} from 'components/button';
import {Colors} from 'const';
import {useWrapDispatch} from 'hooks';
import React, {Fragment} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SET_MODAL} from 'store/reducers/app';
import {height, padding, width} from 'utils';

interface Props {
  title?: string;
  text: string;
  onConfirm: () => void;
  onClosed?: () => void;
}

export const ConfirmModal = ({
  title = 'Thông báo',
  text = '',
  onConfirm = () => {},
  onClosed,
}: Props) => {
  const inset = useSafeAreaInsets();

  const modal = useWrapDispatch(SET_MODAL);

  const onCancel = () => {
    onClosed ? onClosed() : modal({open: false, children: <Fragment />});
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
          top: height(250) + inset.top,
        },
      ]}>
      <Text
        style={[Font.f18_bold, {textAlign: 'center'}, padding(0, 14, 14, 14)]}>
        {title}
      </Text>

      <Text style={[Font.f16, {textAlign: 'center'}, padding(0, 14, 14, 14)]}>
        {text}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
        <CustomButton
          label="Huỷ"
          onPress={onCancel}
          style={{width: width(140)}}
          outline
        />
        <CustomButton
          label="Xác nhận"
          onPress={onConfirm}
          style={{width: width(140)}}
        />
      </View>
    </View>
  );
};
