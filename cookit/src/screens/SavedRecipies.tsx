/*
  Purpose: Screen where users can keep "lists" of their saved recipies. They can create, edit, and view these lists
           or just view any of the other recipies they saved.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Button,
  StatusBar,
} from "react-native";
import { useState, useEffect, useContext } from "react"; // <-- Import useState and useEffect
import axios from "axios";
import { LoginContext } from "../../LoginProvider";
import { useFocusEffect } from "@react-navigation/native";
import {
  EditProfileIcon,
} from "../../assets/recipe-icons";
import { Posts } from "./Home";
import SavedRecipeFolder, { RecipeFolderType } from "../components/SavedRecipes/SavedRecipeFolder";

const savedRecipeFolders = [
  {
    id: "1",
    name: "Test 1",
    numOfRecipes: 1,
    lastUpdated: "March 1st 2024",
    recipes: Posts
  },
  {
    id: "2",
    name: "Test 2",
    numOfRecipes: 10,
    lastUpdated: "January 3rd 2024",
    recipes: Posts
  },
  {
    id: "3",
    name: "Test 3",
    numOfRecipes: 100,
    lastUpdated: "December 31st 2022",
    recipes: Posts
  },
  {
    id: "4",
    name: "Test 4",
    numOfRecipes: 1000,
    lastUpdated: "May 4th 2021",
    recipes: Posts
  }
]

type UserSavedRecipes = {
  listID: number;
  userID: number;
  listName: string;
  description: string;
}

const LOCAL_HOST_NUMBER = "5018";

export function SavedRecipiesScreen({ navigation }) {
  ; // State to store fetched folders
  const { state } = useContext(LoginContext);
  let loginToken = state;

  const [savedRecipes, setSavedRecipes] = useState<UserSavedRecipes | null>(null);
  const [foldersArray, setFoldersArray] = useState<RecipeFolderType[] | null>([]);

  useEffect(() => {
    axios.get(`http://localhost:${LOCAL_HOST_NUMBER}/api/List/getUserLists`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
    .then((response) => {
      console.log("Saved Folders Return: ", response.data);
      console.log("Saved Folders Response:", response); // Log the entire response object
    

    // Check if response.data.$values exists and is an array
    if (response.data && Array.isArray(response.data.$values)) {
      setFoldersArray(response.data.$values);
    } else {
      console.error("Invalid response data structure:", response.data);
    }

      // getting data
      setSavedRecipes(response.data);
      setFoldersArray(response.data.$values);

  })
  .catch((error) => {
    console.error('Error fetching saved folders:', error);
  });

  }, []);

  //Function to add a folder
  // const addFolder = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${loginToken}`,
  //     },
  //   };
  //   try{
  //   const formData = new FormData();
  //   formData.append("listName", "Test 1");
  //   formData.append("description", "What is this for");

  //   const response = 
  //   console.log("Response: ", response);
    
  //   } catch (error) {
  //     // Handle error
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.error("Error Data:", error.response.data);
  //       console.error("Error Status:", error.response.status);
  //       console.error("Error Headers:", error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error("Error Request:", error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error("Error Message:", error.message);
  //     }
  //     console.error("Error Config:", error.config);
  //   }
  // };
  //   .then((response) => {
  //     console.log("Folder added:", response.data);
  //     // Update savedRecipeFolders state to include the newly added folder
  //     setSavedRecipeFolders([...savedRecipeFolders, response.data]);
  //   })
  //   .catch((error) => {
  //     console.error('Error adding folder:', error);
  //   });
  // };

  // Fetch folders from backend when component mounts or token changes


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Saved Recipes</Text>
      </View>
      <View style = {styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() =>console.log("Delete Folder button pressed")}>
          <Text style={styles.buttonText}>Add Folder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Delete Folder button pressed")}>
          <Text style={styles.buttonText}>Delete Folder</Text>
        </TouchableOpacity>
      </View>

        {/* <FlatList
          data = {foldersArray}
          renderItem = {({item}) => <SavedRecipeFolder item = {item} />}
          keyExtractor = {item=>item.id}
          showsVerticalScrollIndicator = {false}
        /> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  // ====== HEADER ======
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#FFF",
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerText: {
    fontSize: 18,
    color: '#345C50',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  buttonContainer:{
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    backgroundColor: '#345C50',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: "25%"
  },
  buttonText: {
    fontSize: 10,
    color: '#FFF',
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: "center"
  }

});