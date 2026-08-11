import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import auth from '../Services/FirebaseAuth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => true;

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => subscription.remove();
    }, []),
  );

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Enter a valid email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain:\n\n' +
          '• Minimum 8 characters\n' +
          '• One uppercase letter\n' +
          '• One lowercase letter\n' +
          '• One number\n' +
          '• One special character',
      );
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      Keyboard.dismiss();

      Alert.alert('Success', 'Login Successful', [
        {
          text: 'OK',
          onPress: () => {
            setEmail('');
            setPassword('');
            navigation.replace('Home');
          },
        },
      ]);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          Alert.alert(
            'Login Failed',
            'Invalid email or password.',
          );
          break;

        case 'auth/user-not-found':
          Alert.alert(
            'Login Failed',
            'User not found.',
          );
          break;

        case 'auth/wrong-password':
          Alert.alert(
            'Login Failed',
            'Incorrect password.',
          );
          break;

        case 'auth/invalid-email':
          Alert.alert(
            'Login Failed',
            'Invalid email address.',
          );
          break;

        case 'auth/too-many-requests':
          Alert.alert(
            'Login Failed',
            'Too many attempts. Please try again later.',
          );
          break;

        default:
          Alert.alert(
            'Error',
            error.message || 'Something went wrong.',
          );
      }
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <LinearGradient
        colors={['#000000', '#0A0A0A', '#151515', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>

        <View style={styles.goldGlow} />

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? 0 : 20
          }>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode={
              Platform.OS === 'ios'
                ? 'interactive'
                : 'none'
            }
            showsVerticalScrollIndicator={false}
            bounces={false}>

            <View style={styles.content}>

              <Image
                source={require('../Assets/LogoApp.png')}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.title}>
                Welcome Back
              </Text>

              <Text style={styles.subtitle}>
                Login to continue
              </Text>

              <View style={styles.card}>

                <View style={styles.inputContainer}>

                  <Image
                    source={require('../Assets/email.png')}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />

                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#777"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textInput}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />

                </View>

                <View style={styles.inputContainer}>

                  <Image
                    source={require('../Assets/lock.png')}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />

                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#777"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    blurOnSubmit={false}
                    onSubmitEditing={handleLogin}
                  />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      setSecureText(!secureText)
                    }
                    style={styles.eyeButton}>

                    <Image
                      source={
                        secureText
                          ? require('../Assets/eye-hide.png')
                          : require('../Assets/eye.png')
                      }
                      style={styles.eyeIcon}
                      resizeMode="contain"
                    />

                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleLogin}>

                  <Text style={styles.buttonText}>
                    LOGIN
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate('Register');
                  }}>

                  <Text style={styles.register}>
                    Don't have an account?{' '}

                    <Text style={styles.registerGold}>
                      Register
                    </Text>
                  </Text>

                </TouchableOpacity>

              </View>
            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </LinearGradient>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },

  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },

  goldGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(212,175,55,0.06)',
    top: -100,
    right: -100,
  },

  logo: {
    width: 230,
    height: 160,
    alignSelf: 'center',
    marginBottom: 5,
    tintColor: '#D4AF37',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 16,
    color: '#B8B8B8',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  card: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  inputIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 12,
    tintColor: '#D4AF37',
  },

  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 0,
  },

  eyeButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#D4AF37',
  },

  button: {
    backgroundColor: '#D4AF37',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,

    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    elevation: 6,
  },

  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  register: {
    marginTop: 22,
    color: '#AFAFAF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },

  registerGold: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
});