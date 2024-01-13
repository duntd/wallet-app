import {useAppSelector} from 'hooks';
import {View, useWindowDimensions} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {shallowEqual} from 'react-redux';

const Toast = () => {
  const {toast} = useAppSelector(state => state.app, shallowEqual);
  //const toastDispatch = useWrapDispatch(SET_TOAST);
  const {width, height} = useWindowDimensions();

  //Toast should be able to close manually
  return (
    <ReactNativeModal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      hasBackdrop={false}
      isVisible={toast.open}
      deviceWidth={width}
      deviceHeight={height}
      style={{margin: 0}}>
      <View>{toast.children}</View>
    </ReactNativeModal>
  );
};

export default Toast;
