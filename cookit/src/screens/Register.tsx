/*
  Purpose: RegisterScreen component for handling user registration.
  Functionality: Provides input fields for username, email, and password, and handles registration logic.
  Created By: Tony Czajka
  Date: 11/19/2023
*/

import React, { useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Constants for API communication
const LOCAL_HOST_NUBMER = "5018";

// RegisterScreen functional component
export function RegisterScreen({ navigation }) {
  // State hooks for managing user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // for the eye icon
  const [checkPassword, setCheckPassword] = useState("");
  const [showCheckPassword, setShowCheckPassword] = useState(false); // for the eye icon
  const [email, setEmail] = useState("");

  // Protection Logic for email
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // validate email format
  function isEmailValid(email: string): boolean {
    return emailPattern.test(email);
  }

  // toggle show password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // toggle show checked password
  const toggleShowCheckPassword = () => {
    setShowCheckPassword(!showCheckPassword);
  };
  // Password Logic
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // function to check if password is correctly formatted
  function isPasswordValid(password: string): boolean {
    return passwordPattern.test(password);
  }

  // function that handles registering user upon press of button
  const handleRegister = async () => {
    try {
      // Protection logic against empty fields
      if (
        username === "" ||
        password === "" ||
        checkPassword === "" ||
        email === ""
      ) {
        Alert.alert("Sign Up Error: Please fill in all fields.");
        throw console.error("Empty Field");
      } else if (password != checkPassword) {
        // protection logic against passwords not being the same
        Alert.alert("Passwords do not match");
        throw console.error("Empty Field");
      } else if (!isEmailValid(email)) {
        // checks to make sure email is valid aka has an @ symbol
        Alert.alert("Email is not valid format");
        throw console.error("Email format invalid");
      } else if (!isPasswordValid(password)) {
        Alert.alert("Password is not in valid format");
        throw console.error("password invalid format");
      }
      // API call to the registration endpoint
      const response = await axios.post(
        `http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/register?username=${username}&password=${password}&email=${email}`,
        {
          username: username,
          password: password,
          email: email,
        }
      );
      console.log(response.status);
      // Handling successful registration
      if (response.status === 200) {
        // await AsyncStorage.setItem('token', response.data.token);
        Alert.alert("Sign Up Successful, Welcome " + username + "!");
        navigation.navigate("Home");
      }
    } catch (error) {
      // Error handling for failed registration
      if (axios.isAxiosError(error)) {
        // Axios error
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
    }
  };
  // Render method for the RegisterScreen
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
        {/* EMAIL */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#3D5147"}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />

        {/* PASSWORD */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordRequirement}>
            Password must be 8 or more characters and contain at least 1
            uppercase letter, 1 number, & 1 special character
          </Text>
          <View style={styles.passwordInputContainer}>
            <View style={styles.passwordInputField}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor={"#3D5147"}
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
              />
            </View>
            {/* Eye Icon */}
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              onPress={toggleShowPassword}
              style={styles.icon}
            />
          </View>
        </View>

        {/* Re-Enter Password */}
        <View style={styles.passwordContainer}>
          <View style={styles.passwordInputContainer}>
            <View style={styles.passwordInputField}>
              {/* PASSWORD */}
              <TextInput
                style={styles.passwordInput}
                placeholder="Re-Enter Password"
                placeholderTextColor={"#3D5147"}
                onChangeText={(text) => setCheckPassword(text)}
                value={checkPassword}
                autoCapitalize="none"
                secureTextEntry={!showCheckPassword}
              />
            </View>
            {/* Eye Icon */}
            <MaterialCommunityIcons
              name={showCheckPassword ? "eye" : "eye-off"}
              size={24}
              onPress={toggleShowCheckPassword}
              style={styles.icon}
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity // Use TouchableOpacity for the custom button
          style={styles.loginButton}
          onPress={handleRegister}
        >
          <LinearGradient
            colors={["#46996F", "#3D5147"]}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
// StyleSheet for the component
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
    width: 250,
    height: 250,
    position: "relative",
    marginBottom: 40,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },

  // Password Styles
  passwordContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    height: 50,
    borderColor: "#667B68", // --color-forest-green
    borderWidth: 4,
    marginBottom: 10,
    borderRadius: 50,
  },
  passwordInputField: {
    flex: 1,
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 50, // Adjusted to fix eye icon offset
    color: "#3D5147", // --color-forest-green
    fontFamily: "PlayfairDisplay-Medium",
    textAlign: "center",
  },
  icon: {
    padding: 10,
    color: "#3D5147", // --color-forest-green
  },
  passwordRequirement: {
    color: "#3D5147", // --color-forest-green
    fontFamily: "SweetSansProRegular",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 15,
    width: 330,
    marginTop: 5,
  },
});
