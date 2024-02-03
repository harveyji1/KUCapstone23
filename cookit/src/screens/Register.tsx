/*
  Purpose: RegisterScreen component for handling user registration.
  Functionality: Provides input fields for username, email, and password, and handles registration logic.
  Created By: Tony Czajka, Audrey Pino
  Date: 11/19/2023
  Updated: 01/27/2024
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
  Animated,
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

    // Function to navigate to Login screen
    const HandleLogin = () => {
      navigation.navigate("Login");
    };

  // Render method for the RegisterScreen
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
      <View style={styles.signInRegisterToggle}>
          <TouchableOpacity
            style={[styles.toggleHalf, styles.inactive]}
            onPress={HandleLogin}
          >
            <Text style={styles.inactiveText}>Sign in</Text>
          </TouchableOpacity>
          <View style={[styles.toggleHalf, styles.active]}>
            <Text style={styles.activeText}>Register</Text>
          </View>
        </View>

        {/* Register */}
        <View style={styles.registerHeadingContainer}>
        <Text style={styles.registerHeading}>Register</Text>
        <Text style={styles.registerSubHeading}>Let's get started</Text>
        </View>

        {/* USERNAME */}
        <View style={styles.UsernameInputWrapper}>
          <MaterialCommunityIcons name="account-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={"#9ca3af"}
              onChangeText={(text) => setUsername(text)}
              value={username}
              autoCapitalize="none"
            />
        </View>

        {/* EMAIL */}
        <View style={styles.UsernameInputWrapper}>
          <MaterialCommunityIcons name="email-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"#9ca3af"}
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize="none"
            />
        </View>

        {/* PASSWORD */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordRequirement}>
              Password must be 8 or more characters and contain at least 1
              uppercase letter, 1 number, & 1 special character
          </Text>
          <View style={styles.PasswordInputWrapper}>
            <MaterialCommunityIcons name="lock-outline" size={20} style={styles.icon} />
            {/* PASSWORD */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"#9ca3af"}
              onChangeText={(text) => setPassword(text)}
              value={password}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
            />
            {/* Eye Icon */}
            <MaterialCommunityIcons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={17}
              onPress={toggleShowPassword}
              style={styles.icon}
            />
          </View>
        </View>

       {/* Re-Enter Password */}
       <View style={styles.passwordContainer}>
          <View style={styles.PasswordInputWrapper}>
            <MaterialCommunityIcons name="lock-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Re-Enter Password"
              placeholderTextColor={"#9ca3af"}
              onChangeText={(text) => setPassword(text)}
              value={checkPassword}
              autoCapitalize="none"
              secureTextEntry={!showCheckPassword}
            />
            {/* Eye Icon */}
            <MaterialCommunityIcons
              name={showCheckPassword ? "eye-outline" : "eye-off-outline"}
              size={17}
              onPress={toggleShowCheckPassword}
              style={styles.icon}
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity // Use TouchableOpacity for the custom button
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
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
    color: "#FFFFFF",
    backgroundColor: "#FFFFFF", // Background color of the button
  },

  signInRegisterToggle: {
    position: 'absolute',
    top: 80, // Adjust this value based on your layout
    flexDirection: 'row',
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
    color: '#FFFFFF',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  inactiveText: {
    fontSize: 12,
    color: '#345c50',
    fontFamily: 'SF-Pro-Text-Regular',
  },

  registerHeadingContainer: {
    marginBottom: 20,
    width: 343,
  },
  registerHeading: {
    fontSize: 20,
    color: "#345C50", // --color-dark-green
    marginBottom: 5,
    fontFamily: "SweetSansProMedium",
    // fontFamily: "SF-Pro-Text-Semibold",
    textAlign: "left"

  },
  registerSubHeading: {
    fontSize: 14,
    color: "#6b7280", // --color-dark-green
    marginBottom: 5,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: "left"
  },
  registerButton: {
    borderRadius: 50,
    width: 343,
    height: 55,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "#345C50", // Text color of the button
    backgroundColor: "#345C50", // Background color of the button
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Text color of the button
    fontSize: 14,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
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
    fontFamily: "SF-Pro-Text-Regular",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 12,
    width: 330,
    marginTop: 5,
  },

  UsernameInputWrapper: {
    position: "relative",
    flexDirection: 'row',
    alignItems: "center",
    width: 343,
    height: 50,
    borderColor: "#e5e7eb",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  PasswordInputWrapper: {
    position: "relative",
    flexDirection: 'row',
    alignItems: "center",
    width: 343,
    height: 50,
    borderColor: "#e5e7eb",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: "#9ca3af",
    fontFamily: "SF-Pro-Text-Medium",
    fontSize: 12,
    borderWidth: 0, // Remove the border
    textAlign: "left", // Align text to the left
    height: '100%', // Make the input fill the height of the wrapper
  },
});
