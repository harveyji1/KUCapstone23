/*
  Purpose: This is the Profile Screen of the App that contains the each persons profile
  Author:Harvey Ji
  Editors:Tony Czajka
*/

//all the imports
import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Button,
} from "react-native";
import { useState, useEffect, useContext } from "react"; // <-- Import useState and useEffect
import axios from "axios";
import { LoginContext } from "../../LoginProvider";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  AccountIcon,
  EmailIcon,
  PasswordIcon,
  BioIcon,
} from "../../assets/recipe-icons";

const LOCAL_HOST_NUBMER = "5018";

const screenWidth = Dimensions.get("window").width;
let profileID = 6;

export function EditProfileScreen() {
  const { state } = useContext(LoginContext);
  let loginToken = state;

  // Create state variables for fullname and bio
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  // Function to handle PUT request for updating profile
  const updateProfile = () => {
    const url = `http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/profile`;
    const headers = {
      Authorization: `Bearer ${loginToken}`,
    };
    const data = {
      fullName: fullName,
      bio: bio,
    };

    axios
      .put(url, data, { headers })
      .then((response) => {
        alert(`profile updated successfuly!`);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        alert("Error updating profile");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}> 
        <View style={styles.UsernameInputWrapper}>
          <View style={styles.icon}><AccountIcon /></View>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />
        </View>

        <View style={styles.UsernameInputWrapper}>
          <View style={styles.icon}><BioIcon /></View>
          <TextInput
            style={styles.input}
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
          />
        </View>
      </View> 

      <TouchableOpacity
        style={styles.updateProfileButton}
        onPress={updateProfile}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between", 
    padding: 20,
    backgroundColor: "#FFF",
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center', 
    width: '100%', 
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
  input: {
    flex: 1,
    color: "#9ca3af",
    fontFamily: "SF-Pro-Text-Medium",
    fontSize: 12,
    borderWidth: 0, 
    textAlign: "left", 
    height: "100%", 
  },
  icon: {
    padding: 10, 
  },
  updateProfileButton: {
    borderRadius: 50,
    width: 343,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#345C50",
  },
  buttonText: {
    color: "#FFFFFF", 
    fontSize: 14,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
});

export default EditProfileScreen;
