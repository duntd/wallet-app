import {useAppSelector, useWrapDispatch} from 'hooks';
import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {ReactNativeModal} from 'react-native-modal';
import {shallowEqual} from 'react-redux';
import {SET_MODAL} from 'store/reducers/app';
const Modal = () => {
  const {modal} = useAppSelector(state => state.app, shallowEqual);
  const modalDispatch = useWrapDispatch(SET_MODAL);
  const {width, height} = useWindowDimensions();

  const onClose = () => modalDispatch({open: false});

  return (
    <ReactNativeModal
      isVisible={modal.open}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={onClose}
      style={{margin: 0}}
      onBackButtonPress={onClose}>
      <View>{modal.children}</View>
    </ReactNativeModal>
  );
};

export default Modal;
