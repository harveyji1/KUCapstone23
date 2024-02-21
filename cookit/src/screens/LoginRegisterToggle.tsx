import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {LoginPage} from "./Login"
import {RegisterScreen} from "./Register"

export function LoginRegisterToggle({navigation}) {

    const [toggle, setToggle] = useState(true)

    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.signInRegisterToggle}>
          <TouchableOpacity
            style={[styles.toggleHalf, toggle ? styles.active : styles.inactive]}
            onPress={() => {setToggle(true)}}
          >
            <Text style={toggle ? styles.activeText : styles.inactiveText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleHalf, !toggle ? styles.active : styles.inactive]}
            onPress={() => {setToggle(false)}}
          >
            <Text style={!toggle ? styles.activeText : styles.inactiveText}>Register</Text>
          </TouchableOpacity>
        </View>

        {toggle ? <LoginPage navigation={navigation}/> : <RegisterScreen navigation={navigation}/>}

        </View>
    </KeyboardAvoidingView>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      backgroundColor: "#FFFFFF", // Background color of the button
    },
  
    signInRegisterToggle: {
      position: "absolute",
      top: 80, // Adjust this value based on your layout
      flexDirection: "row",
      borderRadius: 50,
      width: 178,
      height: 30,
      backgroundColor: "#f3f4f6",
    },
    toggleHalf: {
        flex: 1, // Use flex to make both options take equal space
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
      },
      active: {
        backgroundColor: "#345C50",
      },
      inactive: {
        backgroundColor: "#f3f4f6",
      },
      activeText: {
        fontSize: 12,
        color: "#FFFFFF",
        fontFamily: "SF-Pro-Text-Regular",
      },
      inactiveText: {
        fontSize: 12,
        color: "#345c50",
        fontFamily: "SF-Pro-Text-Regular",
      },
})