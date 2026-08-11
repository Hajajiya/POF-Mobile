
import React, {useEffect, useState} from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  onAuthStateChanged,
} from 'firebase/auth';

import auth from './Services/FirebaseAuth';

import GetStartedScreen from './Components/GetStartedScreen';
import RegistrationScreen from './Components/RegistrationScreen';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import DetailsScreen from './Components/DetailsScreen';
import MapScreen from './Components/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
  setUser(currentUser);
  setCheckingAuth(false);
});

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#D4AF37"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />

            <Stack.Screen
              name="DetailsScreen"
              component={DetailsScreen}
            />

            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
                  options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="GetStarted"
              component={GetStartedScreen}
                  options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
                  options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />

          
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

