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
  TextInput,
  Modal,
  Alert,
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


const LOCAL_HOST_NUMBER = "5018";

export function SavedRecipiesScreen({ navigation }) {
  ; // State to store fetched folders
  const { state } = useContext(LoginContext);
  let loginToken = state;

  const [foldersArray, setFoldersArray] = useState<RecipeFolderType[] | null>([]);

  //folder popup visibility
  const [isAddFolderModalVisible, setAddFolderModalVisible] = useState(false);

   // State to store folder name and description
   const [folderName, setFolderName] = useState('');
   const [folderDescription, setFolderDescription] = useState('');

   useEffect(() => {
    fetchFolders(); // Fetch folders on initial load
  }, []);

  const fetchFolders = () => {
    axios.get(`http://localhost:${LOCAL_HOST_NUMBER}/api/List/getUserLists`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
    .then((response) => {
      if (response.data && Array.isArray(response.data.$values)) {
        const transformedFolders = response.data.$values.map(folder => ({
          listID: folder.listID,
          listName: folder.listName,
          description: folder.description,
          numOfRecipes: folder.posts.$values.length,
          lastUpdated: "Dont worry about it",
          posts: folder.posts || [], // Ensure posts array exists, or provide an empty array as default
        }));

        setFoldersArray(transformedFolders);

      console.log("Saved Folders Return: ", response.data);
      console.log("Saved Folders Response:", response); // Log the entire response object

    } else {
      console.error("Invalid response data structure:", response.data);
    }

  })
  .catch((error) => {
    console.error('Error fetching saved folders:', error);
  });

  };

  const handleAddFolder = () => {
    // Check if folder name is provided
    if (!folderName.trim() || !folderDescription.trim()) {
      Alert.alert('Error', 'Please enter a folder name and description.');
      return;
    }
    // API call to create folder
    axios.post(`http://localhost:${LOCAL_HOST_NUMBER}/api/List/createList`, {
      listName: folderName,
      description: folderDescription,
      // You might need to pass additional data here based on your backend API requirements
    }, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
    .then((response) => {
      // Assuming the API call is successful, close the modal and refresh the folder list
      setAddFolderModalVisible(false);
      fetchFolders(); // Fetch updated folder list
    })
    .catch((error) => {
      console.error('Error creating folder:', error);
      Alert.alert('Error', 'Failed to create folder. Please try again later.');
    });
  };

  const handleDeleteFolder = (thislistID: number) => {
    const deleteData = {listID: thislistID}
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this folder?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            axios.delete(`http://localhost:${LOCAL_HOST_NUMBER}/api/List/deleteUserList?listID=${thislistID}`, {
              headers: {
                Authorization: `Bearer ${loginToken}`,
              }
            })
            .then((response) => {
              console.log(thislistID);
              console.log("Response", response.data);
              fetchFolders(); // Fetch updated folder list
            })
            .catch((error) => {
              console.error('Error deleting folder:', error);
              console.log(thislistID);
              Alert.alert('Error', 'Failed to delete folder. Please try again later.');
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Saved Recipes</Text>
      </View>
      <View style = {styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAddFolderModalVisible(true)}>
          <Text style={styles.buttonText}>Add Folder</Text>
        </TouchableOpacity>
      </View>

        <FlatList
          data = {foldersArray}
          renderItem = {({item}) => <SavedRecipeFolder item = {item} onDelete={handleDeleteFolder} />}
          keyExtractor = {(item, index) => item.listID.toString()}
          showsVerticalScrollIndicator = {false}
        />

<Modal
        visible={isAddFolderModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Folder</Text>

            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Folder Name"
              onChangeText={text => setFolderName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Folder Description"
              onChangeText={text => setFolderDescription(text)}
            />
            </View>
            
            <View style ={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={handleAddFolder}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setAddFolderModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
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
  },

  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",

  },
  modalContent:{
    backgroundColor: 'white',
    padding: 20,
    width: '80%', // Adjust as needed
    height: 200, // Adjust as needed
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: "column"
  },
  modalTitle:{
    fontSize: 18,
    color: '#345C50',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  inputContainer: {
    marginBottom: 10, // Spacing between input and buttons,
    width: "100%",
    justifyContent:"center"
  },
  input: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Text-Semibold',
    width: "80%"
  },
  addButton: {
    backgroundColor: '#345C50',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelButton: {
    backgroundColor: '#345C50',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10, // Add spacing between buttons
  },



});