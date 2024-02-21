/*
  Purpose: LoginPage component for handling user login
  Functionality: Provides input fields for username and password, and handles login logic.
  Created By: Tony Czajka, Audrey Pino
  Date: 10/01/2023
  Updated: 01/27/2024
*/
import React, { useContext, useState } from "react";
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
import axios from "axios";
import { LoginContext } from "../../LoginProvider";
import { decode as atob } from "base-64";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Constants for API communication
const LOCAL_HOST_NUBMER = "5018";
const COMPUTER_IP_ADDRESS = "";

function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export function LoginPage({ navigation }) {
  // State hooks for managing username and password

  //Import function to update global login context state
  const { state, setState } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // for the eye icon
  const [showCheckPassword, setShowCheckPassword] = useState(false); // for the eye icon
  const [isRememberMe, setIsRememberMe] = useState(false); // for remember me

  // toggle show password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // toggle show check password
  const toggleRememberMe = () => {
    setIsRememberMe(!isRememberMe);
  };

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
      const token = response.data;
      // Handling successful login
      if (response.status === 200) {
        const decodedToken = decodeJWT(token);
        console.log("DECODED TOKEN: ", decodedToken);
        console.log("Type of token: ", typeof decodedToken);
        console.log("ID: ", decodedToken.sub);
        console.log("Not Decoded Token: Bearer ", token);
        console.log(response.status);
        // if response is okay, set global token to response token
        setState(token);
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
      <View style={styles.container}>

        {/* SIGN IN */}
        <View style={styles.signInHeadingContainer}>
          <Text style={styles.signInHeading}>Sign In</Text>
          <Text style={styles.signInSubHeading}>Sign In to get started</Text>
        </View>

        {/* USERNAME */}
        <View style={styles.UsernameInputWrapper}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"#9ca3af"}
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
          />
        </View>
        {/* PASSWORD */}
        <View style={styles.PasswordInputWrapper}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            style={styles.icon}
          />
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

        {/* Remember Me and Forgot Password */}
        <View style={styles.rememberMeContainer}>
          <View style={styles.rememberMeSection}>
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={toggleRememberMe}
            >
              <MaterialCommunityIcons
                name={
                  isRememberMe
                    ? "checkbox-marked-outline"
                    : "checkbox-blank-outline"
                }
                size={18}
                style={styles.iconRememberMe}
              />
              <Text style={styles.rememberMeText}>Keep me logged in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPasswordSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginButton} onPress={HandleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
  );
}

// styles used
const styles = StyleSheet.create({
  container: {
    flex: 0,
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

  signInHeadingContainer: {
    marginBottom: 20,
    width: 343,
  },
  signInHeading: {
    fontSize: 20,
    color: "#345C50", // --color-dark-green
    marginBottom: 5,
    fontFamily: "SweetSansProMedium",
    // fontFamily: "SF-Pro-Text-Semibold",
    textAlign: "left",
  },
  signInSubHeading: {
    fontSize: 14,
    color: "#6b7280", // --color-dark-green
    marginBottom: 5,
    fontFamily: "SF-Pro-Text-Regular",
    textAlign: "left",
  },
  UsernameInputWrapper: {
    position: "relative",
    flexDirection: "row",
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
    flexDirection: "row",
    alignItems: "center",
    width: 343,
    height: 50,
    borderColor: "#e5e7eb",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    color: "#9ca3af",
  },
  input: {
    flex: 1,
    color: "#9ca3af",
    fontFamily: "SF-Pro-Text-Medium",
    fontSize: 12,
    borderWidth: 0, // Remove the border
    textAlign: "left", // Align text to the left
    height: "100%", // Make the input fill the height of the wrapper
  },
  loginButton: {
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
  rememberMeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Ensure that the container takes full width if not already
    width: 343,
  },
  rememberMeSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Regular",
  },
  iconRememberMe: {
    marginRight: 5,
    color: "#345C50",
  },
  forgotPasswordSection: {
    // If additional styling is needed for the forgot password section
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#345C50",
    fontFamily: "SF-Pro-Text-Regular",
  },
});
