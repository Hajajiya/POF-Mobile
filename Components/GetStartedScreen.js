
import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const GetStartedScreen = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent
      />

      <ImageBackground
        source={require('../Assets/car.png')}
        style={styles.background}
        resizeMode="cover">
        
        <Image
          source={require('../Assets/LogoApp.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.overlay}>
          <View style={styles.content}>

            <Text style={styles.title}>
              Experience{'\n'}Luxury Mobility
            </Text>

            <Text style={styles.subtitle}>
              Rent luxury, sports, exotic, and supercars across Dubai.
              Enjoy seamless booking, premium service, and unforgettable
              driving experiences with POF Rental.
            </Text>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
  },

  logo: {
    width: 350,
    height: 250,
    alignSelf: 'center',
    position: 'absolute',

    top: StatusBar.currentHeight
      ? StatusBar.currentHeight + 20
      : 60,

    zIndex: 10,
    marginTop: 5,

    tintColor: '#D4AF37',
  },

  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.58)',

    justifyContent: 'flex-end',
  },

  content: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 15,
  },

  subtitle: {
    color: '#E6C35C',
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#D4AF37',

    height: 58,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },

  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
