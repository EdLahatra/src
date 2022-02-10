import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

export const RegisterScreen = _props => {
  //const {register} = useContext(AuthContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
