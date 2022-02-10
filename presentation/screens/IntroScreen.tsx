import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import {reduxConnect} from '../../controllers/home';

import {images} from '../resources/constants';

const {phone1, phone2} = images;

const dataInitial = [
  {
    title: 'Online groceries',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: phone1,
    bg: '#59b2ab',
  },
  {
    title: 'Location tracking',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: phone2,
    bg: '#febe29',
  },
  {
    title: 'On the way',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: phone1,
    bg: '#22bcb5',
  },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#1cb278',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

class App extends React.Component<any> {
  slider: AppIntroSlider | undefined;
  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = item => item.title;

  _renderPagination = activeIndex => {
    const data = this.props.guide?.list?.items || dataInitial;
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? {backgroundColor: 'white'}
                      : {backgroundColor: 'rgba(0, 0, 0, .2)'},
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#023e3f'}]}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  render() {
    const data = this.props.guide?.list?.items || dataInitial;
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          // renderPagination={this._renderPagination}
          data={data}
          // ref={(ref) => (this.slider = ref!)}
          // showSkipButton
          onDone={() => this.props.initialScreenUsers(false)}
        />
      </View>
    );
  }
}

export default reduxConnect(App);
