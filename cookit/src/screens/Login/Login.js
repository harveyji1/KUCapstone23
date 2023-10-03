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

export function LoginPage() {
  
  const [loaded] = useFonts({
    'YoungSerif-Regular': require('../../../assets/fonts/YoungSerif-Regular.ttf')
  });
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