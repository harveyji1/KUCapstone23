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

    const { recipes } = route.params;

    return (
        <Container>
       
        <StatusBar style="auto" />
        <FlatList
          data = {recipes}
          renderItem = {({item}) => <RecipeCard item = {item} />}
          keyExtractor = {item=>item.id}
          showsVerticalScrollIndicator = {false}
        />
      </Container>
    );
  }

  export default RecipeFolderScreen;