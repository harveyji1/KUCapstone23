/*
  Purpose: This is the Ingredeients Screen of the Create Post Screens that allows the user to enter in the ingredients of their recipe
  Author:Harvey Ji
  Editors:
*/

import React, { useState } from "react";
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
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function IngredientsScreen({ navigation }) {
  const [ingredients, setIngredients] = useState(""); //use state to set ingredeitns
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/*gradient for background */}
      <LinearGradient
        colors={["#F4EAD7", "#F4EAD7", "#FFF6E7"]}
        style={styles.background}
      />
      <View style={styles.container}>

    {/*input for ingredients */}
        <TextInput
          style={[styles.input, styles.ingredients]}
          placeholder="Ingredients"
          placeholderTextColor={"#3D5147"}
          onChangeText={setIngredients}
          value={ingredients}
          autoCapitalize="none"
          multiline
          numberOfLines={4}
        />
        {/*button to instructions*/}
        <Button
        title="Enter Instructions"
        onPress={() => navigation.navigate("Instructions")}
      />
      </View>
    </KeyboardAvoidingView>

    
  );

  
}

//styling for everything
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#E5E3DB",
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
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "PlayfairDisplay-Medium",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },

  ingredients: {
    // Additional styles for ingredients input
    height: '80%', // Set appropriate height
    textAlignVertical: "top", // Start the text from the top
  }
  });