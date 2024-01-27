/*
  Purpose: This is the Home Screen of the App that contains the home feed
  Author:Harvey Ji
  Editors:
*/

//all the imports
import * as React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Container} from '../styles/FeedStyles';
import PostCard from '../components/Posts/PostCard'
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
    liked: false,
    likes: 14,
    comments: 5,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done']
  },
  {
    id: '2',
    userName: 'Harvey Ji',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '10 minutes ago',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: true,
    likes: 14,
    comments: 5,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done']
  },
  {
    id: '3',
    userName: 'Audrey Pino',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '1 hour ago',
    description: 'I am a big doo doo head',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: false,
    likes: 0,
    comments: 0,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done']
  },
  {
    id: '4',
    userName: 'Aiden Frevert',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '1 day ago',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: true,
    likes: 1,
    comments: 1,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done']
  },
  {
    id: '5',
    userName: 'Tony Czajka',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: 'November 3rd',
    description: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: true,
    likes: 14,
    comments: 5,
    dishName: 'Stir-Fry Chicken',
    prepTime: 10,
    estimatedCost: 10,
    ingredients: ['1 lb of Chicken', '4 oz of rice', '3 oz Broccoli', 'ingredient 4', 'ingredient 5', 'ingredient 6', 'ingredient 7'],
    instructions: ['cook chicken', 'cook rice', 'cook broccoli', 'this is the 4th instruction and it is actually pretty long so that i can see what it looks like', 'done']
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
          renderItem = {({item}) => <PostCard item = {item} />}
          keyExtractor = {item=>item.id}
          showsVerticalScrollIndicator = {false}
        />
      </Container>
    );
  }
  
  export default HomeScreen;