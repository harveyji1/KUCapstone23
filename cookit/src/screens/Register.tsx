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
import axios from 'axios';

const LOCAL_HOST_NUBMER = '5018';

export function RegisterScreen({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');

  // Protection Logic for 
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function isEmailValid(email: string): boolean {
    return emailPattern.test(email);
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  function isPasswordValid(password: string): boolean {
    return passwordPattern.test(password);
  }

  const handleRegister = async () => {
    try{
      // Protection logic against empty fields
      if (username === '' || password === '' || checkPassword === '' || email === '' || handle === '') {
        Alert.alert('Register Error: Please fill in all fields.');
        throw(console.error('Empty Field'));
      }
      else if (password != checkPassword){ // protection logic against passwords not being the same
        Alert.alert('Passwords do not match');
        throw(console.error('Empty Field'));
      }
      else if (!isEmailValid(email)){ // checks to make sure email is valid aka has an @ symbol
        Alert.alert('Email is not valid format');
        throw(console.error('Email format invalid'));
      }
      else if (!isPasswordValid(password)){
        Alert.alert('Password is not in valid format');
        throw(console.error('password invalid format'));
      }

      const response = await axios.post(`http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/register?username=${username}&password=${password}&email=${email}&handle=${handle}`,{
        username: username,
        password: password,
        email: email,
        handle: handle
      });
      console.log(response.status);
      if (response.status === 200){
        // await AsyncStorage.setItem('token', response.data.token);
        Alert.alert('Register Successful, Welcome '+ username + '!');
        navigation.navigate('Home');
      }
    }
    catch (error){
      if (axios.isAxiosError(error)) {
        // Axios error
        if (error.response) {
          console.log('HTTP Status:', error.response.status);
          Alert.alert("Login failed: ", error.response.data);
          console.log('Response Data:', error.response.data);
          console.log('Response Headers:', error.response.headers);
        } else {
          console.log('Error Message:', error.message);
        }
      } else {
        // Non-Axios error
        console.log('Non-Axios Error:', error);
      }
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
      {/* <Text style={styles.appTitle}>Cookit</Text> */}
      {/* EMAIL */}
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#3D5147'}
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize='none'
      />
      {/* USERNAME */}
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#3D5147'}
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize='none'
      />
      {/* PASSWORD */}
      <Text>Password: one lowercase, one uppercase, one digit, one special character, min length of 8 characters</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#3D5147'}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize='none'
        secureTextEntry
      />
      {/* Re-Enter Password */}
      <Text>Re-Enter Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-Enter Password"
        placeholderTextColor={'#3D5147'}
        onChangeText={(text) => setCheckPassword(text)}
        value={checkPassword}
        autoCapitalize='none'
        secureTextEntry
      />
        {/* Handle */}
        <Text>Handle</Text>
        <TextInput
            style={styles.input}
            placeholder="Handle"
            placeholderTextColor={'#3D5147'}
            onChangeText={(text) => setHandle(text)}
            value={handle}
            autoCapitalize='none'
        />
      {/* Register Button */}
      <TouchableOpacity // Use TouchableOpacity for the custom button
        style={styles.loginButton}
        onPress={handleRegister}
      >
      <LinearGradient
        colors={["#46996F", "#3D5147"]}
        style={styles.loginButton}
      >
        <Text style={styles.buttonText}>Register</Text>
      </LinearGradient>
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