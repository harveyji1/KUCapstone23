/*
Purpose: This file is the recipe folder component
Author: Harvey Ji
Editors:
*/
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { RecipeItemType } from '../Recipes/RecipeCard';
import { Folder } from '../../styles/FolderStyle';
import { Ionicons } from '@expo/vector-icons';

export type RecipeFolderType = {
    listID: number;
    listName: string;
    description: string;
    numOfRecipes: number;
    lastUpdated: string;
    posts: [];
}

const SavedRecipeFolder: React.FC<{ item: RecipeFolderType, onDelete: (listID: number) => void }> = ({ item, onDelete }) => {

    const navigation = useNavigation(); // Initialize navigation

    const handleFolderPress = () => {
        //extracts just the recipe from the item
        const { posts } = item;
        // Navigate to the Recipe folder screen passing recipes as route params
        navigation.navigate('RecipeFolder', { posts } );
    };

    const handleDelete = () => {
        onDelete(item.listID);
    };

    const firstRecipe = item.posts[0];

    return(
        <View>
            <TouchableOpacity onPress={handleFolderPress}>
                <View style = {styles.folder}>
                    <View style = {styles.folderImageContainer}>
                    {firstRecipe && <Image source={firstRecipe.postImg} style={styles.recipeImage} />}
                    </View>
                    <View style = {styles.textContainer}> 
                        <Text style = {styles.folderName}>{item.listName} </Text>
                        <Text style = {styles.numOfRecipes}>Number of Recipes: {item.numOfRecipes} </Text>
                        <Text style = {styles.lastUpdated}>Description: {item.description} </Text>
                    </View>
                    <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <Ionicons name="trash-outline" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.folderDivider}/>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    folder: {
      backgroundColor: "#FFF",
      width: "100%",
      height: 100,
      marginBottom: 10,
      alignItems: "center",
      flexDirection: "row"
    },

    folderImageContainer : {
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    },

    recipeImage: {
        width: 100,
        height: 100,
        marginRight: 5
    },

    textContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },

    folderName: {
        fontSize: 20,
        color: "black",
    },

    numOfRecipes:{
        fontSize: 14,
        color: "#345C50"
    },

    lastUpdated: {
        fontSize: 12,
        color: "gray"
    },

    folderDivider: {
        height: 4,
        color: "gray"
    },

    deleteButton:{
        color: "red"
    }
  });
export default SavedRecipeFolder;