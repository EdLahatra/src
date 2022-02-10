import {useEffect} from 'react';

import messaging from '@react-native-firebase/messaging';

import {Platform} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import {post} from '../services/technique/api';

export function useMainControllers(props: any) {
  const {users} = props;

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getToken();
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestUserPermission();
    }
    if (Platform.OS === 'android') {
      getToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   // console.log({notif, remoteMessage });
    //   // notif && notif.localNotif && notif.localNotif('sample.mp3');
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   // ShortcutBadge.getCount((count: number) => console.log(count));
    // });
    // return unsubscribe;
  }, []);

  const getToken = async () => {
    messaging()
      .getToken()
      .then(async token => {
        console.log(token);
        await sendToken(token);
      });
    messaging().onTokenRefresh(async token => {
      await sendToken(token);
    });
  };

  const sendToken = async (token1: string) => {
    if (users && users.token) {
      const uuid = DeviceInfo.getUniqueId();
      const deviseInfo = DeviceInfo.getModel();
      const data = {
        uuid,
        deviseInfo,
        token: token1,
      };
      await post('device', data, users.token);
    }
  };

  return {
    getToken: requestUserPermission,
  };
}
