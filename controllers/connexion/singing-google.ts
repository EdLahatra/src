import {useEffect} from 'react';
import {Platform} from 'react-native';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export default () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '405680342370-5kch1186c3dthv9nshf0eicgoe66up0a.apps.googleusercontent.com'
          : '405680342370-5kch1186c3dthv9nshf0eicgoe66up0a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
    return () => {};
  }, []);

  const singingGmail = async (): Promise<{
    email: string;
    familyName: string | null;
    name: string | null;
    photo: string | null;
  }> => {
    // console.log('_signIn');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log('userInfouserInfouserInfo', userInfo);
      if (userInfo && userInfo.user) {
        const {email, familyName, name, photo} = userInfo.user;
        return {email, familyName, name, photo};
      }
      return {email: '', familyName: '', name: '', photo: ''};
      // this.setState({ userInfo });
    } catch (_err) {
      // const error: ErrorSignin = err;
      // // console.log('error', error.code);
      // if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error?.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
      console.log(statusCodes);
      return {email: '', familyName: '', name: '', photo: ''};
    }
  };

  return {
    singingGmail,
  };
};
