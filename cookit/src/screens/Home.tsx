/*
  Purpose: This is the Home Screen of the App that contains the home feed
  Author: Harvey Ji
  Editors: Audrey Pino
*/

//all the imports
import * as React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Container} from '../styles/FeedStyles';
import RecipeCard from '../components/Recipes/RecipeCard'
import Ionicons from 'react-native-vector-icons/Ionicons';

//This will be replaced by actual data from backend
//For now this is passing in the posts
const Posts = [
  {
    id: '1',
    userName: 'Nick Anaya',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '4 minutes ago',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    upvoted: false,
    upvotes: 14,
    downvoted: false,
    downvotes: 3,
    comments: 5,
    saved: false,
    saves: 4,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done'],
    yield: 2,
    cookTime: 20,
    estCost: 30,
    filters: ['Gluten Free', 'Dairy Free', 'Vegan', 'Chicken']
  },
  {
    id: '2',
    userName: 'Harvey Ji',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '10 minutes ago',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    upvoted: true,
    upvotes: 14,
    downvoted: true,
    downvotes: 9,
    comments: 5,
    saved: true,
    saves: 56,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done'],
    yield: 6,
    cookTime: 15,
    estCost: 15,
    filters: ['Gluten Free', 'Low Calories', 'Eggs']
  },
  {
    id: '3',
    userName: 'Audrey Pino',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '1 hour ago',
    description: 'I am a big doo doo head',
    postImg: require('../img/defaultpostimg.jpeg'),
    upvoted: false,
    upvotes: 14,
    downvoted: true,
    downvotes: 1,
    comments: 0,
    saved: false,
    saves: 0,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done'],
    yield: 4,
    cookTime: 25,
    estCost: 45,
    filters: ['Rice', 'Chicken', 'Chinese']
  },
  {
    id: '4',
    userName: 'Aiden Frevert',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '1 day ago',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    upvoted: false,
    upvotes: 1234,
    downvoted: false,
    downvotes: 3456,
    comments: 1,
    saved: true,
    saves: 8746,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done'],
    yield: 1,
    cookTime: 8,
    estCost: 13,
    filters: ['Vegan']
  },
  {
    id: '5',
    userName: 'Tony Czajka',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: 'November 3rd',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    upvoted: true,
    upvotes: 48569,
    downvoted: false,
    downvotes: 34567,
    comments: 5,
    saved: false,
    saves: 98754,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done'],
    yield: 10,
    cookTime: 45,
    estCost: 100,
    filters: ['Gluten Free', 'Dairy Free', 'Vegan', 'Chicken', 'Eggs']
  }
]


//The actual function of the HomeScreen
export function HomeScreen({}){
    return (
      <Container>
        {/* <Text>Cookit Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile', {
            itemID: 4,
            otherParam: "Tony Czajka"
          })}
        /> */}

        {/*Maps out each card to the item passed in*/}
        <StatusBar style="auto" />
        <FlatList
          data = {Posts}
          renderItem = {({item}) => <RecipeCard item = {item} />}
          keyExtractor = {item=>item.id}
          showsVerticalScrollIndicator = {false}
        />
      </Container>
    );
  }
  
  export default HomeScreen;