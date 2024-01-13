import {DEVICE_TOKEN, TOKEN_ID} from '@env';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {FuncUtil} from 'utils';
import {useWrapDispatch} from './useWrapDispatch';
import {SET_BADGE} from 'store/reducers/app';

const displayNotificationNotifee = async (remoteMessage: any) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  try {
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        pressAction: {id: 'default'},
      },
    });
  } catch (e) {
    console.log('Error Display notification :', e);
  }
};

export const useFcmServices = () => {
  const label = useWrapDispatch(SET_BADGE);

  let count = 3;

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const p = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (p == 'denied' && count) throw 'Permission denied!';
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) throw 'Permission denied!';
      }
    } catch (err) {
      if (err == 'Permission denied!') {
        count--;
        requestPermission();
      }
    }
  };

  const registerDevice = async () => {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(async () => {
        const token = await messaging().getToken();
        console.log('[FCM Token Registered]:', token);

        AsyncStorage.setItem(DEVICE_TOKEN, token);
      })
      .catch(err => {
        console.warn(err);
      });
  };

  const setBackgroundHandler = () => {
    messaging().setBackgroundMessageHandler(displayNotificationNotifee);
    label(true);
  };

  const init = FuncUtil.sequence(requestPermission, registerDevice);

  useEffect(() => {
    init();
    setBackgroundHandler();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      label(true);
      displayNotificationNotifee(remoteMessage);
    });

    return unsubscribe;
  }, []);
};
