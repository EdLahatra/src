import {AccessToken, LoginManager} from 'react-native-fbsdk';

export default () => {
  const fbAuth = (cb: any) => {
    //LoginManager.logOut();
    LoginManager.logInWithPermissions([]).then(
      function (result) {
        if (result.isCancelled) {
          // console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            const {accessToken} = data;
            console.log('accessToken', accessToken);
            cb(accessToken);
          });
          // console.log('Login success with permissions: ' + result.toString());
        }
      },
      function () {
        // console.log('Login fail with error: ' + error);
      },
    );
  };

  return {
    fbAuth,
  };
};
