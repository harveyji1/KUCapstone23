/*
  Purpose: First screen
  Author: Audrey Pino
  Editors: 
*/
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export function GetStartedPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Image style={styles.logo} source={require("../img/Logo-White.png")} />
        </View>
        <View style={styles.bottomView}>  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#345c50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    position: "relative",
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 14, 
    color: '#345c50', 
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 343,
    height: 55,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Position the view at the bottom
    bottom: 30, // Align it to the bottom
  },
  // Add a style for the button if you want to style the touchable opacity
});
