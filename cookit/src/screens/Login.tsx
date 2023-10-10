import React, { useState } from 'react';
import {useFonts} from 'expo-font';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@mui/material/styles';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';


// import axios from 'axios';


export function LoginPage() {
  
  // const [loaded] = useFonts({
  //   'YoungSerif-Regular': require('../../assets/fonts/YoungSerif-Regular.ttf')
  // });


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here, you can add your authentication logic.
    // For simplicity, let's just check if the fields are not empty.
    if (username === '' || password === '') {
      Alert.alert('Login Error', 'Please fill in all fields.');
    } else {
      // You can perform the actual authentication here.
      // For this example, we'll just show a success message.
      Alert.alert('Login Successful', 'Welcome, ' + username + '!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#F4EAD7", "#F4EAD7", '#FFF6E7']}
        style={styles.background}
      />
    <View style={styles.container}>
      {/* IMAGE */}
      <Image
        style={styles.logo}
        source={require('../img/Logo.png')}
      /> 
      {/* <Text style={styles.appTitle}>Cookit</Text> */}
      {/* USERNAME */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#3D5147'}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      {/* PASSWORD */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#3D5147'}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {/* LOGIN BUTTON */}
      <TouchableOpacity // Use TouchableOpacity for the custom button
        style={styles.loginButton}
        onPress={handleLogin}
      >
      <LinearGradient
        colors={["#46996F", "#3D5147"]}
        style={styles.loginButton}
      >
        <Text style={styles.buttonText}>Login</Text>
      </LinearGradient>
      </TouchableOpacity>
      {/* SIGNUP BUTTON */}
      <TouchableOpacity // Use TouchableOpacity for the custom button
        style={styles.signupButton}
        // onPress={handleLogin}
      >
        <Text style={styles.buttonTextSU}>Signup</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#E5E3DB'
  },
  appTitle: {
    fontSize: 40,
    color: '#345C50', // --color-dark-green
    marginBottom: 50,
    fontWeight: 'bold',
    fontFamily: 'SweetSansProRegular',
  },
  input: {
    position: 'relative',
    width: 330,
    height: 50,
    borderColor: '#667B68', // --color-forest-green
    borderWidth: 4,
    marginBottom: 20,
    padding: 10,
    color: '#3D5147', // --color-forest-green
    borderRadius: 50,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'PlayfairDisplay-Medium',
  },
  loginButton: {
    borderRadius: 50,
    width: 200,
    height: 50,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Text color of the button
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Trispace-ExtraBold'
  },
  signupButton: {
    borderRadius: 50,
    width: 200,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderColor: '#667B68', // --color-forest-green
    borderWidth: 2,
  },
  buttonTextSU: {
    color: '#345C50', // Text color of the button
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Trispace-ExtraBold'

  },
  logo: {
    width: 336,
    height: 336,
    position: 'relative',
    marginBottom: 50,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
});