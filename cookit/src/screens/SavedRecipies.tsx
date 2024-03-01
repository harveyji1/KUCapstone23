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
} from "react-native";
import { useState, useEffect, useContext } from "react"; // <-- Import useState and useEffect
import axios from "axios";
import { LoginContext } from "../../LoginProvider";
import { useFocusEffect } from "@react-navigation/native";
import {
  EditProfileIcon,
} from "../../assets/recipe-icons";


export function SavedRecipiesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Recipe Lists</Text>
      </View>
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