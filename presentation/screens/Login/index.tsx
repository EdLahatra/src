import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';

import {images, toUri} from '../../resources/constants';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import useSigninGoogle from '../../../controllers/connexion/singing-google';
import useSigninFB from '../../../controllers/connexion/singing-fb';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';
import {connect} from 'react-redux';
import {useLogin} from './useLogin';

const isIOS = Platform.OS === 'ios';

/**
 * You'd technically persist this somewhere for later use.
 */
let user: any = null;

/**
 * Starts the Sign In flow.
 */
async function onAppleButtonPress(authApple) {
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
    // @ts-ignore
  } catch (error: any) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
  }
}

const Login = ({navigation, signinUtilisateur, inscriptionUtilisateur}) => {
  const {singingGmail} = useSigninGoogle();
  const {fbAuth} = useSigninFB();
  const authApple = (data: any) => {
    console.log({data});
  };

  const fbSignin = () => {
    fbAuth((res: any) => {
      console.log({res});
    });
  };

  const googleSignin = async () => {
    const res: {
      email: string;
      familyName: string | null;
      name: string | null;
      photo: string | null;
    } = await singingGmail();

    console.log({res});
  };

  const {
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    loading,
    forgot,
    setForgot,
    showValidation,
    setshowValidation,
    message,
    error,
    resetPassword,
    toSignin,
    sendCode,
  } = useLogin({signinUtilisateur, inscriptionUtilisateur, navigation});

  let windowDim = Dimensions.get('window').width;
  const [widthScreen, setWidthScreen] = useState(windowDim);
  const changeWidth = () => {
    setWidthScreen(Dimensions.get('window').width);
  };
  Dimensions.addEventListener('change', changeWidth);

  return (
    <View style={styles.container}>
      <Image
        // @ts-ignore
        source={images.logo}
        style={styles.logo}
      />
      <Text style={styles.text}>My App</Text>
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <View>
        <Text style={{fontSize: 16, color: 'red'}}>{message}</Text>
      </View>
      <FormButton buttonTitle="Continue with Email" onPress={toSignin} />
      <View>
        <TouchableOpacity
          style={{paddingVertical: 20}}
          onPress={() => {
            setForgot(true);
            setshowValidation(true);
          }}>
          <Text style={styles.navButtonText}>Forgot password</Text>
        </TouchableOpacity>
      </View>
      {appleAuth.isSupported && (
        <SocialButton
          buttonTitle="Continue with Apple"
          btnType="apple"
          color="#000000"
          backgroundColor="#E6EAF4"
          onPress={() => onAppleButtonPress(authApple)}
        />
      )}

      <SocialButton
        buttonTitle="Continue with Facebook"
        btnType="facebook"
        color="#4867AA"
        backgroundColor="#E6EAF4"
        onPress={() => fbSignin()}
      />

      <SocialButton
        buttonTitle="Continue with Google"
        btnType="google"
        color="#DE4D41"
        backgroundColor="#E6EAF4"
        onPress={() => googleSignin()}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.navButtonText}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showValidation}
        onRequestClose={() => {
          setForgot(false);
          setshowValidation(false);
        }}>
        <View
          style={[
            {
              margin: 20,
              paddingHorizontal: 20,
              width: widthScreen,
              paddingVertical: 40,
            },
            {
              height: Dimensions.get('window').height,
              maxWidth: 500,
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            },
          ]}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 10,
              padding: 10,
              borderRadius: 20,
            }}>
            {forgot ? (
              <View style={{marginTop: 35}}>
                <Text>Votre adress e-mail</Text>
              </View>
            ) : (
              <View style={{marginTop: 35}}>
                <Text
                  style={{fontWeight: '500', fontSize: 16, marginBottom: 10}}>
                  Un code de validation a été envoyé dans votre e-mail
                </Text>
                <TouchableOpacity onPress={sendCode}>
                  <Text style={{fontWeight: '900', fontSize: 14}}>
                    Renvoyer code
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {forgot ? (
              <FormInput
                labelValue={email}
                onChangeText={userEmail => setEmail(userEmail)}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            ) : (
              <FormInput
                labelValue={code}
                onChangeText={_adresse => setCode(_adresse)}
                placeholderText="Code"
                iconType="shake"
                autoCorrect={false}
              />
            )}

            <View>
              <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
            </View>
            <View>
              <FormButton
                buttonTitle={
                  forgot ? 'Envoyer' : 'Envoyer le code de validation'
                }
                loading={loading}
                onPress={resetPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setForgot(false);
                setshowValidation(false);
              }}
              style={{position: 'absolute', top: 10, right: 10, padding: 10}}>
              <Image
                source={toUri(images.close)}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const LoginScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFD',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051D5F',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#2E64E5',
    fontFamily: 'Lato-Regular',
  },
});
