/*
Purpose: This file is the recipe folder component
Author: Harvey Ji
Editors:
*/
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Folder } from "../../styles/FolderStyle";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { LoginContext } from "../../../LoginProvider";

export type RecipeFolderType = {
  listID: number;
  listName: string;
  description: string;
  numOfRecipes: number;
  lastUpdated: string;
  posts: [];
};

const LOCAL_HOST_NUMBER = "5018";

const SavedRecipeFolder: React.FC<{
  item: RecipeFolderType;
  onDelete: (listID: number) => void;
  postId: number | null;
}> = ({ item, onDelete, postId }) => {
  const { state } = useContext(LoginContext);
  let loginToken = state;

  const navigation = useNavigation(); // Initialize navigation\

  const [listID, setListID] = useState<number>(item.listID);
  const [postID, setPostID] = useState<number | null>(postId);
  const [encodedUrl, setEncodedUrl] = useState("");

  const firstRecipe = item.posts.$values[0];
  

  useEffect(() => {
    console.log("Actual Folder useeffect was called!");
    setPostID(postId);
  }, [postId]);

  useFocusEffect(() => {
    console.log(postID);
    // console.log("original url: ", imageUrl);
    if (firstRecipe) {
      const imageUrl = firstRecipe.postImage;
      if (imageUrl) {
        setEncodedUrl(imageUrl.replace(/ /g, "%20"));
        // console.log("Encoded URL:", encodedUrl);
      } 
    else {
        console.log("no post pic");
      }
    }
    //console.log("First Recipe:", imageUrl);
  })

  const handleFolderPress = async () => {
    // Check if postId is available
    if (postID === null || postID === undefined || postID === 0) {
      //extracts just the recipe from the item
      //console.log("Item.posts: ", item.posts);
      const { posts } = item;
      //console.log("posts = item: ", posts);
      // Navigate to the Recipe folder screen passing recipes as route params
      navigation.navigate("RecipeFolder", { posts });
    } else {
      try {
        console.log("First post ID:", postID);
        console.log("First list ID:", listID);
        const response = await axios.post(
          `http://localhost:${LOCAL_HOST_NUMBER}/api/List/saveRecipeToList?listID=${listID}&postID=${postID}`,
          {
            listID: listID,
            postID: postID,
          },
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          }
        );
        //console.log(postID);
        setPostID(0);
        //console.log(postID);
        console.log("Response: ", response);
      } catch (error) {
        setPostID(0);
        console.error("Error saving post:", error);
        console.log("Error postID: ", postID);
        console.log("Error listID: ", listID);
        
      }
    }
  };

  const handleDelete = () => {
    onDelete(item.listID);
  };



  return (
    <View>
      <TouchableOpacity onPress={handleFolderPress}>
        <View style={styles.folder}>
          <View style={styles.folderImageContainer}>
            {firstRecipe && (
              <Image source={{ uri: encodedUrl }} style={styles.recipeImage} />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.folderName}>{item.listName} </Text>
            <Text style={styles.numOfRecipes}>
              Number of Recipes: {item.numOfRecipes}{" "}
            </Text>
            <Text style={styles.lastUpdated}>
              Description: {item.description}{" "}
            </Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.folderDivider} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  folder: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 100,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  folderImageContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  recipeImage: {
    width: 100,
    height: 100,
    marginRight: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  folderName: {
    fontSize: 20,
    color: "black",
  },

  numOfRecipes: {
    fontSize: 14,
    color: "#345C50",
  },

  lastUpdated: {
    fontSize: 12,
    color: "gray",
  },

  folderDivider: {
    height: 4,
    color: "gray",
  },

  deleteButton: {
    color: "red",
  },
});
export default SavedRecipeFolder;
