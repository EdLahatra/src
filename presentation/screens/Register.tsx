import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
//import {AuthContext} from '../navigation/AuthProvider';

import {icons, images, toUri} from '../resources/constants';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../services/redux/mapStateToProps';
import {put} from '../../services/technique/api';

const {back} = icons;

export const Register = props => {
  const {navigation, inscriptionUtilisateur} = props;
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [email, setEmail] = useState('herypaslie.dell@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showValidation, setshowValidation] = useState(true);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  //const {register} = useContext(AuthContext);
  let windowDim = Dimensions.get('window').width;
  const [widthScreen, setWidthScreen] = useState(windowDim);
  const changeWidth = () => {
    setWidthScreen(Dimensions.get('window').width);
  };
  Dimensions.addEventListener('change', changeWidth);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              flex: 1,
              width: Dimensions.get('screen').width - 40,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={back} style={{width: 30, height: 20}} />
            </TouchableOpacity>
            <Text style={styles.text}>Create an Account</Text>
            <View />
          </View>

          <FormInput
            labelValue={nom}
            onChangeText={userEmail => setNom(userEmail)}
            placeholderText="Name"
            iconType="user"
            // keyboardType="email-address"
            // autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={adresse}
            onChangeText={_adresse => setAdresse(_adresse)}
            placeholderText="Adresse"
            iconType="holiday-village"
            fontisto
            // keyboardType="email-address"
            // autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={ville}
            onChangeText={userEmail => setVille(userEmail)}
            placeholderText="Ville"
            iconType="home-city"
            material
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
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

          <FormInput
            labelValue={confirmPassword}
            onChangeText={userPassword => setConfirmPassword(userPassword)}
            placeholderText="Confirm Password"
            iconType="lock"
            secureTextEntry={true}
          />
          <View>
            <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
          </View>
          <FormButton
            buttonTitle="Sign Up"
            loading={loading}
            onPress={() => {
              setError('');
              setLoading(true);
              inscriptionUtilisateur(
                {email, password, ville, adresse, nom},
                ({data}) => {
                  // ({data: {data, isError, message}}) => {
                  console.log({data});
                  if (data?.create) {
                    setLoading(false);
                    setshowValidation(true);
                  } else if (data?.isError && data?.message) {
                    setError(data?.message);
                  }
                },
              );
            }}
          />

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By registering, you confirm that you accept our
            </Text>
            <TouchableOpacity onPress={() => alert('Terms clicked!')}>
              <Text style={[styles.color_textPrivate, {color: '#E88832'}]}>
                Terms of service
              </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> and </Text>
            <TouchableOpacity onPress={() => alert('Private policy clicked!')}>
              <Text style={[styles.color_textPrivate, {color: '#E88832'}]}>
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View>

          <SocialButton
            buttonTitle="Sign Up with Apple"
            btnType="apple"
            color="#000000"
            backgroundColor="#E6EAF4"
            onPress={() => alert('You are sign up with Apple')}
          />

          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867AA"
            backgroundColor="#E6EAF4"
            onPress={() => alert('You are sign up with Facebook')}
          />

          <SocialButton
            buttonTitle="Sign up with Google"
            btnType="google"
            color="#DE4D41"
            backgroundColor="#E6EAF4"
            onPress={() => alert('You are sign up with Google')}
          />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.navButtonText}>I have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={showValidation}
        onRequestClose={() => setshowValidation(false)}>
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
            <View style={{marginTop: 35}}>
              <Text style={{fontWeight: '500', fontSize: 16, marginBottom: 10}}>
                Un code de validation a été envoyé dans votre e-mail
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  setError('');
                  const res = await put('inscription/code', {email});
                  if (res.data === true) {
                    setError('Le code a été envoyé avec succès.');
                  } else if (
                    res?.data?.isError === true &&
                    res?.data?.message
                  ) {
                    setError(res?.data?.message);
                  }
                }}>
                <Text style={{fontWeight: '900', fontSize: 14}}>
                  Renvoyer code
                </Text>
              </TouchableOpacity>
            </View>
            <FormInput
              // label={'Code'}
              // required
              // value={code}
              // onChange={(_name, val) => setCode(val)}
              // name={'code'}
              labelValue={code}
              onChangeText={_adresse => setCode(_adresse)}
              placeholderText="Code"
              iconType="shake"
              // keyboardType="email-address"
              // autoCapitalize="none"
              autoCorrect={false}
            />
            <View>
              <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
            </View>
            <View>
              <FormButton
                buttonTitle="Envoyer le code de validation"
                loading={loading}
                onPress={async () => {
                  setLoading(true);
                  setError('');
                  const res = await put('users/to-active', {email, code});
                  setLoading(false);
                  console.log({res});
                  if (res?.data === true) {
                    setshowValidation(false);
                    setCode('');
                    navigation.goBack();
                  } else {
                    setError('Le code est incorrect.');
                  }
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setshowValidation(false);
                setError('');
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
    </SafeAreaView>
  );
};

// export default RegisterScreen;
export const RegisterScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFD',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#2E64E5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
