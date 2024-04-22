/*
Purpose: This file is the saved recipe folders that appear in the popup when trying to save a recipe
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

const FolderPopUp: React.FC<{
  item: RecipeFolderType;
  postId: number | null;
}> = ({ item, postId }) => {
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
        console.log("Response: ", response);
      } catch (error) {
        //console.error("Error saving post:", error);
        console.log("Error postID: ", postID);
        console.log("Error listID: ", listID);
        
        if(error.response.status === 500){
          Alert.alert(
            "Error",
            "You already have the recipe saved to this folder",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ],
            { cancelable: false }
          );
        }
        else{
          Alert.alert(
            "Error",
            "Failed to save, please try again later",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ],
            { cancelable: false }
          );
        }
      }

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
            <Text style={styles.lastUpdated}>
              Description: {item.description}{" "}
            </Text>
          </View>
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
    height: 50,
    marginBottom: 1,
    alignItems: "center",
    flexDirection: "row",
  },

  folderImageContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  recipeImage: {
    width: 50,
    height: 50,
    marginRight: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  folderName: {
    fontSize: 15,
    color: "black",
  },

  lastUpdated: {
    fontSize: 12,
    color: "gray",
  },

  folderDivider: {
    height: 2,
    color: "gray",
  },

  deleteButton: {
    color: "red",
  },
});
export default FolderPopUp;
