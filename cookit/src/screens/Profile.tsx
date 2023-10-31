import * as React from 'react'
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView, TouchableHighlight, Button } from 'react-native';



type ProfileScreenRouteParams = {
    itemID: string;
    otherParam: string;
  };
  

export function ProfileScreen() {
  const data=[
    {
      postimage:
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/02/Mediterranean-Cod-en-Papillote-6.jpg'
    },
    {
      postimage:
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/05/Chicken-Stir-Fry-9.jpg'
    },
    {
      postimage:
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/03/Shrimp-Scampi-5.jpg'
    },
    {
      postimage:
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/01/Baked-Chicken-Breasts-11.jpg'
    },

  ]
    return (
      <View style={styles.container}>
        <View style = {styles.infoContainer}>
          <Image style={styles.profilePic} source = {require('../img/defaultpfp.jpeg')}></Image>
          <View>
            <Text style = {styles.numberOfPosts}>
              {/* in the future this will be like props.numberOfPosts*/}
              10
            </Text>
            <Text style={styles.postWord}>Posts</Text>
          </View>
          <View>
            <Text style = {styles.numOfFollowers}>
              {/* in the future this will be like props.numberOfFollowers*/}
              130
            </Text>
            <Text style={styles.followersWord}>Followers</Text>
          </View>
          <View>
            <Text style = {styles.numOfFollowing}>
              {/* in the future this will be like props.numberOfFollowing*/}
              341
            </Text>
            <Text style={styles.followingWord}>Following</Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {/*props.userName*/}
          Default User
        </Text>
        <Button title= 'Edit Profile'/>
        {/*Change the style of this button later but making own button */}
        <View style = {styles.border}>
        </View>
        <FlatList data = {data}
        numColumns={3}
        horizontal={false}
        keyExtractor={(item, index)=>{
            return index.toString();
        }}
        renderItem={({item})=>{
          return(
              <View style={styles.postsContainer}>
                  <Image source={{uri:item.postimage}} style = {styles.recipePosts}/>
              </View>
          )
        }}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
      backgroundColor: '#F4EAD7',
      height: "100%"
    },
    infoContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop:75,
      marginLeft: 10,
      width: '100%',
    },
    profilePic:{
      height: 60,
      width: 60,
      borderRadius: 50
    },
    numberOfPosts: {
      fontWeight: '400',
      fontSize: 20,
      paddingHorizontal: 10,
      marginLeft:25
    },
    postWord:{
      fontSize:20,
      color: 'grey',
      paddingHorizontal: 28
    },
    numOfFollowers: {
      fontWeight: '400',
      fontSize: 20,
      paddingHorizontal: 10,
      marginLeft:25
    },
    followersWord:{
      fontSize:20,
      color: 'grey',
      paddingHorizontal: 10
    },
    numOfFollowing: {
      fontWeight: '400',
      fontSize: 20,
      paddingHorizontal: 10,
      marginLeft:25
    },
    followingWord:{
      fontSize:20,
      color: 'grey',
      paddingHorizontal: 10
    },
    userName:{
      fontSize: 18,
      color: 'black',
      paddingHorizontal: 10,
      marginTop:10,
      fontWeight: 'bold',
      marginBottom:20
    },
    border:{
      borderWidth: StyleSheet.hairlineWidth, 
      borderColor:'black'
    },
    postsContainer:{
        flex: 1,
        padding: 10,
        backgroundcolor: 'white',
        paddingVertical:10,
        alignItems: 'flex-start'

    },
    recipePosts:{
      width: 120,
      height: 120
    }
  });

  export default ProfileScreen;