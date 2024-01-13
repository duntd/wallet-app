import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from './Loading';
import Modal from './Modal';
import PopUp from './PopUp';
import {StatusBar} from 'react-native';
import Toast from './Toast';
import {useBackHandler} from '@react-native-community/hooks';
import {navigationRef} from 'utils';

const Prerequisites = ({
  children,
}: React.PropsWithChildren<any>): JSX.Element => {
  useBackHandler(() => {
    if (navigationRef.canGoBack()) {
      return true;
    }

    return false;
  });

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      {children}
      <Loading />
      <Modal />
      <PopUp />
      <Toast />
    </SafeAreaProvider>
  );
};

export default Prerequisites;
