/*
  Purpose: LoginPage component for handling user login
  Functionality: Provides input fields for username and password, and handles login logic.
  Created By: Tony Czajka
  Date: 10/01/2023
*/
import React, { useContext, useState } from "react";
import { useFonts } from "expo-font";
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
} from "react-native";
import { useTheme } from "@mui/material/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LoginContext } from "../../LoginProvider";

// Constants for API communication
const LOCAL_HOST_NUBMER = "5018";
const COMPUTER_IP_ADDRESS = "";

export function LoginPage({ navigation }) {
  // State hooks for managing username and password

  //Import function to update global login context state
  const { state, setState } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user login
  const HandleLogin = async () => {
    try {
      // Validation for empty fields
      if (username === "" || password === "") {
        Alert.alert("Login Error", "Please fill in all fields.");
        throw console.error("Empty Login Field");
      }
      // API call to login endpoint
      const response = await axios.post(
        `http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/login?username=${username}&password=${password}`,
        {
          username: username,
          password: password,
        }
      );
      console.log(response.status);
      // Handling successful login
      if (response.status === 200) {
        // if response is okay, set global token to response token
        setState(response.data.token);
        // await AsyncStorage.setItem('token', response.data.token);
        Alert.alert("Login Successful, Welcome " + username + "!");
        navigation.navigate("Home");
      }
    } catch (error) {
      // Error handlign for failed login
      if (axios.isAxiosError(error)) {
        // Axios error and debugging messages
        if (error.response) {
          console.log("HTTP Status:", error.response.status);
          Alert.alert("Login failed: ", error.response.data);
          console.log("Response Data:", error.response.data);
          console.log("Response Headers:", error.response.headers);
        } else {
          console.log("Error Message:", error.message);
        }
      } else {
        // Non-Axios error
        console.log("Non-Axios Error:", error);
      }
      // console.error('Error: ', error);
      // Alert.alert('Login failed, error occurred, catch initiated');
    }
  };

  // Function to navigate to Register screen
  const HandleRegister = () => {
    navigation.navigate("Register");
  };

  // Returns the visuals for the Login Page
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["#F4EAD7", "#F4EAD7", "#FFF6E7"]}
        style={styles.background}
      />
      <View style={styles.container}>
        {/* IMAGE */}
        <Image style={styles.logo} source={require("../img/Logo.png")} />
        {/* <Text style={styles.appTitle}>Cookit</Text> */}
        {/* USERNAME */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={"#3D5147"}
          onChangeText={(text) => setUsername(text)}
          value={username}
          autoCapitalize="none"
        />
        {/* PASSWORD */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#3D5147"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          secureTextEntry
        />
        {/* LOGIN BUTTON */}
        <TouchableOpacity // Use TouchableOpacity for the custom button
          style={styles.loginButton}
          onPress={HandleLogin}
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
          onPress={HandleRegister}
        >
          <Text style={styles.buttonTextSU}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// styles used
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#E5E3DB",
  },
  appTitle: {
    fontSize: 40,
    color: "#345C50", // --color-dark-green
    marginBottom: 50,
    fontWeight: "bold",
    fontFamily: "SweetSansProRegular",
  },
  input: {
    position: "relative",
    width: 330,
    height: 50,
    borderColor: "#667B68", // --color-forest-green
    borderWidth: 4,
    marginBottom: 20,
    padding: 10,
    color: "#3D5147", // --color-forest-green
    borderRadius: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "PlayfairDisplay-Medium",
  },
  loginButton: {
    borderRadius: 50,
    width: 200,
    height: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF", // Text color of the button
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Trispace-ExtraBold",
  },
  signupButton: {
    borderRadius: 50,
    width: 200,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "#667B68", // --color-forest-green
    borderWidth: 2,
  },
  buttonTextSU: {
    color: "#345C50", // Text color of the button
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Trispace-ExtraBold",
  },
  logo: {
    width: 336,
    height: 336,
    position: "relative",
    marginBottom: 50,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
});
