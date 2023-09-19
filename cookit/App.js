import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>{
      <View style={styles.container}>
      <Text style={styles.text}>Cookit Test</Text>
      <StatusBar style="auto" />
      </View>
    }</NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEBD3',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    color: '#437c90'
  }
});
