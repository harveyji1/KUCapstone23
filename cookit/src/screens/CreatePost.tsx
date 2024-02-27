/*
  Purpose: Screen component for creating a new post
  Features: Image picking, text input fields for post details, and navigation.
  Created By: Tony Czajka and Audrey Pino
  Date: 9/10/2023
*/
import React, { useState, useContext } from "react";
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
  ScrollView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LoginContext } from "../../LoginProvider";
import {
  TagChefIcon,
  PrepTimeIcon,
  CookTimeIcon,
  CostIcon,
  EditIcon,
  PickImageIcon,
  TagIcon,
  AddIcon,
} from "../../assets/recipe-icons";
import { Dimensions } from "react-native";
import { err } from "react-native-svg/lib/typescript/xml";

// Display selected image
const screenWidth = Dimensions.get("window").width;
const aspectRatio = 2 / 2;
const imageHeight = screenWidth / aspectRatio;

// CreatePostScreen component
export function CreatePostScreen({ navigation, route }) {
  // Setup state hooks for managing the post details
  const [recipeName, setRecipeName] = useState("");
  // const [tagsChef, setTagsChef] = useState("");
  const [prepTimeHours, setPrepTimeHours] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
  const [cookTimeHours, setCookTimeHours] = useState("");
  const [cookTimeMinutes, setCookTimeMinutes] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);


  const [tagInput, setTagInput] = useState(""); 
  const [tags, setTags] = useState<string[]>([]); 

  const combinedPrepTime = `${prepTimeHours}:${prepTimeMinutes}`;
  const combinedCookTime = `${cookTimeHours}:${cookTimeMinutes}`;
  // Function that handles image picking
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // sets the picked image to state
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to add a new tag to the tags array
  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput(""); // Clear input field after adding
    }
  };

  // Function to remove a tag from the tags array
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Function to handle button press and enter key press
  const handleAddTag = () => {
    addTag();
  };

  // Function to handle post creation
  const handleCreatePost = () => {

    const combinedPrepTime = `${prepTimeHours}:${prepTimeMinutes}`;
    const combinedCookTime = `${cookTimeHours}:${cookTimeMinutes}`;

    console.log("Creating post with:", {
      recipeName,
      // tagsChef,
      combinedPrepTime,
      combinedCookTime,
      // prepTimeHours,
      // prepTimeMinutes,
      // cookTimeHours,
      // cookTimeMinutes,
      estimatedPrice,
      tagInput,
      description,
      image,
    });
    // Assume success for example purposes
    try {
      navigation.navigate("Ingredients", {
        recipeName,
        // tagsChef,
        combinedPrepTime,
        combinedCookTime,
        estimatedPrice,
        description,
        tagInput,
        image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Main return statement rendering the UI elements
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <View style={styles.changeImageButtonContent}>
              {image ? <EditIcon /> : <PickImageIcon />}
              <Text style={styles.buttonText}>
                {image ? "Change Image" : "Pick an Image"}
              </Text>
            </View>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Write Recipe Name..."
            onChangeText={setRecipeName}
            value={recipeName}
          />
        </View>

        {/* <View style={styles.inputGroup}>
          <View style={styles.labelWithIcon}>
            <TagChefIcon />
            <Text style={styles.textInput}>Tag Chef</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="@username"
            onChangeText={setTagsChef}
            value={tagsChef}
          />
        </View> */}

        <View style={styles.inputGroup}>
          <View style={styles.labelWithIcon}>
            <PrepTimeIcon />
            <Text style={styles.inputLabel}>Prep Time</Text>
          </View>
          <View style={styles.timeInputGroup}>
            <TextInput
              style={[styles.timeInput, styles.borderInput]}
              placeholder="hh"
              onChangeText={setPrepTimeHours}
              value={prepTimeHours}
              keyboardType="numeric"
            />
            <Text style={styles.timeColon}>:</Text>
            <TextInput
              style={[styles.timeInput, styles.borderInput]}
              placeholder="mm"
              onChangeText={setPrepTimeMinutes}
              value={prepTimeMinutes}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelWithIcon}>
            <CookTimeIcon />
            <Text style={styles.inputLabel}>Cook Time</Text>
          </View>
          <View style={styles.timeInputGroup}>
            <TextInput
              style={[styles.timeInput, styles.borderInput]}
              placeholder="hh"
              onChangeText={setCookTimeHours}
              value={cookTimeHours}
              keyboardType="numeric"
            />
            <Text style={styles.timeColon}>:</Text>
            <TextInput
              style={[styles.timeInput, styles.borderInput]}
              placeholder="mm"
              onChangeText={setCookTimeMinutes}
              value={cookTimeMinutes}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelWithIcon}>
            <CostIcon />
            <Text style={styles.inputLabel}>Estimated Price</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Price"
            onChangeText={setEstimatedPrice}
            value={estimatedPrice}
            keyboardType="numeric"
          />
        </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelWithIcon}>
          <TagIcon />
          <Text style={styles.inputLabel}>Tags</Text>
        </View>

        <TextInput
          style={styles.textInput}
          onChangeText={setTagInput}
          value={tagInput}
          placeholder="Enter a Tag"
          onSubmitEditing={handleAddTag} 
          returnKeyType="done" 
        />
        <TouchableOpacity onPress={handleAddTag} style={styles.addIconContainer}>
          <AddIcon/>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        style={styles.tagsContainer}
        data={tags}
        renderItem={({ item, index }) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => removeTag(index)}>
              <MaterialCommunityIcons name="close" size={16} style={styles.removeButton} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />         

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.inputMain, styles.descriptionInput]}
            placeholder="Write Description here..."
            onChangeText={setDescription}
            value={description}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color="#FFF" title="Next" onPress={handleCreatePost} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// StyleSheet object for styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  imageButton: {
    // backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  changeImageButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#345C50",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
    marginLeft: 5,
  },
  image: {
    width: "100%",
    height: imageHeight,
    resizeMode: "cover",
    marginBottom: 10,
  },
  timeInputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timeInput: {
    width: 50,
    textAlign: "center",
    paddingVertical: 5,
    color: "#111827",
    fontFamily: "SF-Pro-Display-Regular",
  },
  borderInput: {
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 7,
    marginHorizontal: 5,
  },
  timeColon: {
    fontSize: 18,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 50,
    width: 343,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#345C50",
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 15,
  },
  inputLabel: {
    marginRight: 10,
    marginLeft: 3,
    fontSize: 14,
    fontFamily: "SF-Pro-Display-Regular",
    color: "#111827",
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    padding: 0,
    fontFamily: "SF-Pro-Display-Regular",
    fontSize: 14,
    color: "#111827",
    textAlign: "right",
  },
  inputMain: {
    fontFamily: "SF-Pro-Display-Regular",
    fontSize: 14,
    color: "#111827",
  },
  labelWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTitle: {
    fontFamily: "SF-Pro-Display-Semibold",
    fontSize: 15,
    color: "#111827",
  },
  tagsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F3EE',
    borderRadius: 16,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 4,
  },
  tagText: {
    color: '#000000',
  },
  removeButton: {
    marginLeft: 5,
    color: '#111827',
    marginRight: -5,
  },
  addIconContainer: {
    paddingLeft: 20,
    marginRight: -10,
  },
});
