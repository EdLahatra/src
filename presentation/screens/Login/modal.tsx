import React from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {useWidthHeight} from '../../../hooks/dimension';

import {InputField} from '../../components/Inputs/InputField';
import {ButtonComponent} from '../../components/Inputs/Button';

import {styles} from './styles.web';
import {images, toUri} from '../../resources/constants';

export default ({
  showValidation,
  setshowValidation,
  setForgot,
  sendCode,
  forgot,
  email,
  setEmail,
  code,
  setCode,
  loading,
  resetPassword,
  error,
}) => {
  const {width, isWeb, height} = useWidthHeight();
  const style = styles({width, height, isWeb});
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showValidation}
      onRequestClose={() => {
        setshowValidation(false);
        setForgot(false);
      }}>
      <View style={style.containerModal}>
        {!forgot && (
          <View>
            <Text>Un code de validation a été envoyé dans votre e-mail</Text>
            <TouchableOpacity onPress={sendCode}>
              <Text>Renvoyer code</Text>
            </TouchableOpacity>
          </View>
        )}
        {forgot ? (
          <InputField
            label={'E-mail'}
            required
            value={email}
            onChange={(_name, val) => setEmail(val)}
            name={'email'}
          />
        ) : (
          <InputField
            label={'Code'}
            required
            value={code}
            onChange={(_name, val) => setCode(val)}
            name={'code'}
          />
        )}
        <View>
          <ButtonComponent
            loading={loading}
            onPress={resetPassword}
            title={forgot ? 'Envoyer' : 'Envoyer le code de validation'}
          />
        </View>
        <View>
          <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
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
    </Modal>
  );
};
