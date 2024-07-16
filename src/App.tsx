import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import 'firebase/firestore';
import { Text, View, TextInput, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/App/just';
import MeaslesScreen from './(tabs)/App/MeaslesScreen';
import {  Pressable, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenAScreen from './(tabs)/App/MenAScreen'; 
import RotaScreen from './(tabs)/App/RotaScreen';
import HPVScreen from './(tabs)/App/HPVScreen';
import HepBScreen from './(tabs)/App/HepBScreen';
import BOPVScreen from './(tabs)/App/BOPVScreen';
import PentaScreen from './(tabs)/App/PentaScreen';
import PCVScreen from './(tabs)/App/PCVScreen';
import IPVScreen from './(tabs)/App/IPVScreen';
import TdScreen from './(tabs)/App/TdScreen';
import YellowFeverScreen from './(tabs)/App/YelloFeverScreen';
import { User } from 'firebase/auth';



// Initialize Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyBDzDo6avxttMvVnUbsuXQG9TBtzkvuFI0",
    authDomain: "track-app-f434c.firebaseapp.com",
    databaseURL: "https://track-app-f434c-default-rtdb.firebaseio.com",
    projectId: "track-app-f434c",
    storageBucket: "track-app-f434c.appspot.com",
    messagingSenderId: "81243804128",
    appId: "1:81243804128:web:ca691436be476656045b85",
    measurementId: "G-PL44NPKGYX"
  };

initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  HomeScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please check your email and password.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        accessibilityLabel="Email Input"
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        accessibilityLabel="Password Input"
      />
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'lightblue',
            padding: 10,
            borderRadius: 5,
            width: 300,
            alignItems: 'center',
            pointerEvents: 'auto' // Enable pointer events
          },
          pressed && { opacity: 0.5 }
        ]}
        onPress={handleLogin}
        accessibilityRole="button"
        accessibilityLabel="Login Button"
      >
        <Text style={{ fontSize: 18 }}>Login</Text>
      </Pressable>
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
};



const App = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        // Perform actions for signed-in user
      } else {
        // User is signed out
        // Perform actions for signed-out user
      }
    });

    return () => unsubscribe();
  }, []);

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="MeaslesScreen" component={MeaslesScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="YellowFeverScreen" component={YellowFeverScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MenAScreen" component={MenAScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="RotaScreen" component={RotaScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HPVScreen" component={HPVScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HepBScreen" component={HepBScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="BOPVScreen" component={BOPVScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PentaScreen" component={PentaScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PCVScreen" component={PCVScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="IPVScreen" component={IPVScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="TdScreen" component={TdScreen} options={{ headerShown: false }}/>
          
          
      </Stack.Navigator>
  );
};
export default App;
