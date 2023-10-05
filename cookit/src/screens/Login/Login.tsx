import React, { useState } from 'react';
import {useFonts} from 'expo-font';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
//  https://react-native-async-storage.github.io/async-storage/docs/usage

const LOCAL_HOST_NUBMER = '5018';
const COMPUTER_IP_ADDRESS = '192.168.1.80';

export function LoginPage() {
  
  const [loaded] = useFonts({
    'YoungSerif-Regular': require('../../../assets/fonts/YoungSerif-Regular.ttf')
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{
      if (username === '' || password === '') {
        Alert.alert('Login Error', 'Please fill in all fields.');
        throw(console.error('Empty Login Field'));
      }

      const response = await axios.post(`http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/login?username=${username}&password=${password}`,{
        username: username,
        password: password
      });
      console.log(response.status);
      if (response.status === 200){
        // await AsyncStorage.setItem('token', response.data.token);
        Alert.alert('Login Successful, Welcome '+ username + '!');
      } else{
        Alert.alert('Login request failed at Database');
        throw(console.error('Login request failed at Database'));
      }
    }
    catch (error){
      if (axios.isAxiosError(error)) {
        // Axios error
        if (error.response) {
          console.log('HTTP Status:', error.response.status);
          console.log('Response Data:', error.response.data);
          console.log('Response Headers:', error.response.headers);
        } else {
          console.log('Error Message:', error.message);
        }
      } else {
        // Non-Axios error
        console.log('Non-Axios Error:', error);
      }
      // console.error('Error: ', error);
      Alert.alert('Login failed, error occurred, catch initiated');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Cookit</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity // Use TouchableOpacity for the custom button
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
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
    color: '#64D959',
    marginBottom: 50,
    fontWeight: 'bold',
    fontFamily: 'YoungSerif-Regular'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#64D959', // Background color of the button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Text color of the button
    fontSize: 18,
    fontWeight: 'bold',
  }
});