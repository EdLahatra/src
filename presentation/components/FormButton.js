import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {windowHeight} from '../utils/Dimentions';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <View style={styles.buttonContainer}>
      {rest.loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <TouchableOpacity {...rest}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Lato-Regular',
  },
});
