import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';
import {useWidthHeight} from '../../../hooks/dimension';

import {images, toUri} from '../../resources/constants';
import config from '../../../data/config';

import {styles} from './styles.web';
import {InputField} from '../../components/Inputs/InputField';
import {ButtonComponent} from '../../components/Inputs/Button';
import Modal from './modal';
import {useLogin} from './useLogin';

import './css.css';

export const Login = ({
  signinUtilisateur,
  inscriptionUtilisateur,
  navigation,
}) => {
  const {width, isWeb, height} = useWidthHeight();
  const style = styles({width, height, isWeb});

  const clientId = config.GOOGLE_APP_ID;
  const facebookId = config.FACEBOOK_APP_ID;

  const {
    page,
    setPage,
    email,
    setEmail,
    ville,
    setVille,
    adresse,
    setAdresse,
    nom,
    setNom,
    code,
    setCode,
    password,
    setPassword,
    password1,
    setPassword1,
    loading,
    setLoading,
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

  const success = response => {
    if (response && response.profileObj) {
      setLoading(true);
      const {email, familyName, name, imageUrl} = response.profileObj;
      const userS = {
        email,
        firstName: familyName || '',
        photo: imageUrl || '',
        lastName: name || '',
      };
      console.log({userS});
    }
  };

  const facebook = response => {
    if (response?.name) {
      const name = response?.name.split(' ');

      let firstname = '';
      let lastname = '';

      if (name.length > 1) {
        firstname = name[0];
        name.shift();
        lastname = name.toString().replace(',', ' ');
      } else {
        firstname = name[0];
        lastname = ' ';
      }

      const data = {
        email: response.email ? response.email : response.name,
        familyName: '',
        name: response?.name,
        imageUrl: response?.picture?.data?.url,
      };

      const userS = {
        email: data.email,
        firstName: firstname || '',
        photo: data.imageUrl || '',
        lastName: lastname || '',
      };

      console.log({userS});
    }
  };

  const signin = page === 'signin';

  return (
    <View style={style.containers}>
      <View style={style.v1}>
        <View style={{flex: 1}} />
        <View style={style.centerLogin}>
          <View style={style.viewCategorieList}>
            <View style={style.containForm}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={toUri(images.stroke3)}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 10,
                      }}
                    />
                    <Image
                      source={toUri(images.stroke1)}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 10,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        textTransform: 'uppercase',
                        fontWeight: '600',
                      }}>
                      Retour
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => setPage('signin')}>
                  <Text style={{marginRight: 50}}>Se Connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPage('signup')}>
                  <Text>Creer un compte</Text>
                </TouchableOpacity>
              </View>
              <View>
                {!signin && (
                  <InputField
                    label={'Nom'}
                    required
                    value={nom}
                    onChange={(_name, val) => setNom(val)}
                    name={'nom'}
                  />
                )}
                {!signin && (
                  <InputField
                    label={'Adresse'}
                    required
                    value={adresse}
                    onChange={(_name, val) => setAdresse(val)}
                    name={'adresse'}
                  />
                )}
                {!signin && (
                  <InputField
                    label={'Ville'}
                    required
                    value={ville}
                    onChange={(_name, val) => setVille(val)}
                  />
                )}
                <InputField
                  label={'E-mail'}
                  required
                  value={email}
                  onChange={(_name, val) => setEmail(val)}
                  name={'email'}
                />
                <InputField
                  label={'Mot de passe '}
                  required
                  value={password}
                  onChange={(_name, val) => setPassword(val)}
                  name={'password'}
                  type={'password'}
                />
                {!signin && (
                  <InputField
                    label={'Mot de passe '}
                    required
                    value={password1}
                    onChange={(_name, val) => setPassword1(val)}
                    name={'password1'}
                    type={'password'}
                  />
                )}
              </View>
              <View>
                <Text style={{fontSize: 16}}>{message}</Text>
              </View>
              <View>
                <ButtonComponent
                  loading={loading}
                  onPress={toSignin}
                  title={signin ? 'Connexion' : 'Creer Compte'}
                />
              </View>
              {!forgot && (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setshowValidation(true);
                      setForgot(true);
                    }}>
                    <Text>Mot de passe oublier</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View>
                <View>
                  <Text>Ou continuez simplement avec</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingVertical: 10,
                    maxWidth: 400,
                  }}>
                  <GoogleLogin
                    style={{height: 35, width: 35}}
                    clientId={clientId}
                    render={renderProps => (
                      <TouchableOpacity onPress={renderProps.onClick}>
                        <Image
                          source={toUri(images.w_google)}
                          resizeMode="contain"
                          style={{
                            width: 48,
                            height: 48,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                    onSuccess={(res: any) => {
                      success(res);
                    }}
                    onFailure={(error: any) => {
                      console.log({error});
                    }}
                    cookiePolicy={'single_host_origin'}
                  />
                  <FacebookLogin
                    appId={facebookId}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={response => {
                      facebook(response);
                    }}
                    cssClass="btnFacebook"
                    icon={
                      <Image
                        source={toUri(images.w_fb)}
                        resizeMode="contain"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 20,
                        }}
                      />
                    }
                    textButton=""
                  />
                  <Image
                    source={toUri(images.w_apple)}
                    resizeMode="contain"
                    style={{
                      width: 48,
                      height: 48,
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={style.containImg}>
              <Image
                source={toUri(images.login)}
                resizeMode="cover"
                style={{
                  width: !isWeb ? width / 2 : 1140 / 2,
                  height: !isWeb ? width / 2 : 1140 / 2,
                  maxWidth: '100%',
                  left: 0,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
      <Modal
        showValidation={showValidation}
        setshowValidation={setshowValidation}
        setForgot={setForgot}
        sendCode={sendCode}
        forgot={forgot}
        email={email}
        setEmail={setEmail}
        code={code}
        setCode={setCode}
        loading={loading}
        resetPassword={resetPassword}
        error={error}
      />
    </View>
  );
};

export const LoginScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
