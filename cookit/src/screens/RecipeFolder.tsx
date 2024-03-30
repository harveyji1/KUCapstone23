/*
Purpose: This file is the recipe folder component
Author: Harvey Ji
Editors:
*/

import * as React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Container} from '../styles/FeedStyles';
import RecipeCard from '../components/Recipes/RecipeCard'

export function RecipeFolderScreen({ route }){

  console.log(route);

    const { posts } = route.params;
    console.log(posts.$values);

    return (
        <Container>
       
        <StatusBar style="auto" />
        <FlatList
          data = {posts.$values}
          renderItem = {({item}) => {
            //console.log("Why isn't the picture showing: ", posts.$values);
          return<RecipeCard post = {item} />}}
          keyExtractor = {item=>item.id}
          showsVerticalScrollIndicator = {false}
        />
      </Container>
    );
  }

  export default RecipeFolderScreen;