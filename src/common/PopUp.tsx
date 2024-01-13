import {useAppSelector, useWrapDispatch} from 'hooks';
import React, {useEffect} from 'react';
import {shallowEqual} from 'react-redux';
import {ReactNativeModal} from 'react-native-modal';
import {SET_POPUP} from 'store/reducers/app';
import {View, useWindowDimensions} from 'react-native';
const PopUp = () => {
  const {popUp} = useAppSelector(state => state.app, shallowEqual);
  const popUpDispatch = useWrapDispatch(SET_POPUP);
  const {width, height} = useWindowDimensions();

  const onClose = () => popUpDispatch({open: false});

  return (
    <ReactNativeModal
      isVisible={popUp.open}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={onClose}
      style={{margin: 0}}
      onBackButtonPress={onClose}>
      <View>{popUp.children}</View>
    </ReactNativeModal>
  );
};

export default PopUp;
