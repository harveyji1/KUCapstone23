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
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Enter your bio"
        multiline
      />
      <Button title="Update Profile" onPress={updateProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F4EAD7",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 10,
  },
});

export default EditProfileScreen;
