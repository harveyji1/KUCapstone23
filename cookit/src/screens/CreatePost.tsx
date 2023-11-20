/*
  Purpose: Screen component for creating a new post
  Features: Image picking, text input fields for post details, and navigation.
  Created By: Tony Czajka
  Date: 9/10/2023
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
import * as ImagePicker from "expo-image-picker";

// CreatePostScreen component
export function CreatePostScreen({ navigation }) {
  // Setup state hooks for managing the post details
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState(null);

  // Function that handles image picking
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // sets the picked image to state
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to handle post creation
  const handleCreatePost = () => {
    // You would include your logic to validate the inputs and make a post request to your server
    console.log("Creating post with:", {
      recipeName,
      description,
      cookingTime,
      cost,
      image,
    });
    // Assume success for example purposes
    Alert.alert("Post Created Successfully!");
    navigation.goBack(); // or navigate to another screen
  };

  // Main return statement rendering the UI elements
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={["#F4EAD7", "#F4EAD7", "#FFF6E7"]}
        style={styles.background}
      />
      <View style={styles.container}>
        {/* Image Picker */}

        <View style={styles.imagePickerContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <LinearGradient
              colors={["#46996F", "#3D5147"]}
              style={styles.createPostButton}
            >
              <Text style={styles.buttonText}>
                {image ? "Change Image" : "Pick an Image"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recipe Name */}
        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          placeholderTextColor={"#3D5147"}
          onChangeText={setRecipeName}
          value={recipeName}
          autoCapitalize="none"
        />

        {/* Recipe Description */}
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Description"
          placeholderTextColor={"#3D5147"}
          onChangeText={setDescription}
          value={description}
          autoCapitalize="none"
          multiline
          numberOfLines={4}
        />

        {/* Cooking Time */}
        <TextInput
          style={styles.input}
          placeholder="Cooking Time (e.g., 45 min)"
          placeholderTextColor={"#3D5147"}
          onChangeText={setCookingTime}
          value={cookingTime}
          keyboardType="numeric"
          autoCapitalize="none"
        />

        {/* Cost */}
        <TextInput
          style={styles.input}
          placeholder="Cost (e.g., $10)"
          placeholderTextColor={"#3D5147"}
          onChangeText={setCost}
          value={cost}
          keyboardType="decimal-pad"
          autoCapitalize="none"
        />
        <Button
          title="NextScreen"
          onPress={() => navigation.navigate("Ingredients")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

// StyleSheet object for styling the components
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
  buttonText: {
    color: "#FFFFFF", // Text color of the button
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Trispace-ExtraBold",
  },
  imageButton: {
    borderRadius: 50,
    width: 200,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "#667B68", // --color-forest-green
    borderWidth: 2,
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },

  description: {
    // Additional styles for description input
    height: 100, // Set appropriate height
    textAlignVertical: "top", // Start the text from the top
  },
  image: {
    // Style for the preview image
    width: 50,
    height: 50,
  },
  createPostButton: {
    // Same style as your loginButton but for creating a post
    borderRadius: 50,
    width: 200,
    height: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  imagePickerContainer: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Center children vertically within the container
    // Add additional styling as needed
  },
});
