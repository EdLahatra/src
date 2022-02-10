import {Platform} from 'react-native';

import {appleAuth} from '@invertase/react-native-apple-authentication';

const isIOS = Platform.OS === 'ios';

let user: any = null;

/**
 * Starts the Sign In flow.
 */
export const onAppleButtonPress = async (authApple: any) => {
  if (!isIOS) {
    return;
  }
  // start a login request
  try {
    // const dec = await appleAuth.performRequest({ requestedOperation: appleAuth.Operation.LOGOUT });
    // console.log({ dec });
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    const {
      fullName,
      user: newUser,
      email,
      identityToken,
    } = appleAuthRequestResponse;

    user = newUser;

    authApple({
      token: identityToken,
      data: {
        firstName: fullName?.familyName || 'Votre nom',
        lastName: fullName?.givenName || 'Votre prénom',
      },
    });

    console.warn(`Apple Authentication Completed, ${user}, ${email}`);
  } catch (error) {
    // if (error.code === appleAuth.Error.CANCELED) {
    //   console.warn('User canceled Apple Sign in.');
    // } else {
    //   console.error(error);
    // }
    console.error(error);
  }
};
