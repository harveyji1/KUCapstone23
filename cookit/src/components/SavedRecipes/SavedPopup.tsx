import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import SavedRecipeFolder, { RecipeFolderType } from './SavedRecipeFolder';
import { LoginContext } from '../../../LoginProvider';
import FolderPopUp from './FolderPopup';



const SavedPopup = ({isVisible, onClose, postId}) => {
    if (!isVisible) return null;

    const { state } = useContext(LoginContext);
  let loginToken = state;

    const [foldersArray, setFoldersArray] = useState<RecipeFolderType[] | null>(
      []
    );

    const fetchFolders = () => {
      console.log("fetch folders was called");
      const LOCAL_HOST_NUMBER = "5018";
      axios
        .get(`http://localhost:${LOCAL_HOST_NUMBER}/api/List/getUserLists`, {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data.$values)) {
            const transformedFolders = response.data.$values.map((folder) => ({
              listID: folder.listID,
              listName: folder.listName,
              description: folder.description,
              numOfRecipes: folder.posts.$values.length,
              lastUpdated: "Dont worry about it",
              posts: folder.posts || [], // Ensure posts array exists, or provide an empty array as default
            }));
  
            setFoldersArray(transformedFolders);
            //console.log("Folders Array: ", transformedFolders);
  
            // console.log("Saved Folders Return: ", response.data);
            // console.log("Saved Folders Response:", response); // Log the entire response object
          } else {
            console.error("Invalid response data structure:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching saved folders:", error);
        });
    };

    useEffect(() => {
      fetchFolders();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.folderContainer}>
          <FlatList
            data={foldersArray}
            renderItem={({ item }) => (
              <FolderPopUp
                item={item}
                postId={postId}
              />
            )}
        keyExtractor={(item, index) => item.listID.toString()}
        showsVerticalScrollIndicator={false}
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white', // semi-transparent background
  },
  folderContainer: {
    backgroundColor: 'white',
    padding: 3,
    //alignItems: 'center',
    width: "100%"
  },
  buttonContainer: {
    alignItems:"center"
  },
  closeButton: {
    //marginTop: 3,
    padding: 3,
    backgroundColor: '#345C50',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SavedPopup;