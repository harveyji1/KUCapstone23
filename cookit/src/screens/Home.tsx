import * as React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Container} from '../styles/FeedStyles';
import PostCard from '../components/PostCard'
import Ionicons from 'react-native-vector-icons/Ionicons';

//This will be replaced by actual data from backend

const Posts = [
  {
    id: '1',
    userName: 'Nick Anaya',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '4 minutes ago',
    postText: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: false,
    likes: 14,
    comments: 5
  },
  {
    id: '2',
    userName: 'Harvey Ji',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '10 minutes ago',
    postText: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: true,
    likes: 14,
    comments: 5
  },
  {
    id: '3',
    userName: 'Audrey Pino',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '1 hour ago',
    postText: 'I am a big doo doo head',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: false,
    likes: 0,
    comments: 0
  },
  {
    id: '4',
    userName: 'Aiden Frevert',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: '1 day ago',
    postText: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: true,
    likes: 1,
    comments: 1
  },
  {
    id: '5',
    userName: 'Tony Czajka',
    userImg: require('../img/defaultpfp.jpeg'),
    postTime: 'November 3rd',
    postText: 'Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think',
    postImg: require('../img/defaultpostimg.jpeg'),
    liked: true,
    likes: 14,
    comments: 5
  }
]

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