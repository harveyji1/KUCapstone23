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
import SavedRecipeFolder from "../components/SavedRecipes/SavedRecipeFolder";

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

export function SavedRecipiesScreen({ }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Saved Recipes</Text>
      </View>

        <FlatList
          data = {savedRecipeFolders}
          renderItem = {({item}) => <SavedRecipeFolder item = {item} />}
          keyExtractor = {item=>item.id}
          showsVerticalScrollIndicator = {false}
        />
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


});