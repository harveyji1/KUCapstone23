/*
  Purpose: Screen component where users can search for recipies
  Author: Aiden Frevert
  Editors: 
*/
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, Keyboard, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginContext } from '../../LoginProvider';
import { Use } from 'react-native-svg';

const LOCAL_HOST_NUBMER = "5018";

type UserProfile = {
  profilePicture: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  handle: string;
  fullName: string;
  bio: string;
};

export function SearchScreen({ navigation }) {

  const { state } = useContext(LoginContext);
  let loginToken = state;

  const [searchString, setSearchString] = useState<string>('');

  const [searchOn , setSearchOn] = useState( searchString !== '');

  const [profiles, setProfiles] = useState<any | null>(null);


  useEffect(() => {
    setSearchOn( searchString !== '');

    axios
      .get(`http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/Search?keyWord=${searchString}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      })
      .then((response) => {
        console.log("Profile Return: ", response.data["$values"]);

        // getting data
        setProfiles(response.data["$values"]);

        // testing posts response
        console.log("Posts: ", response.data["$values"]);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [searchString])

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor="#345C50" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Discover New Recipes</Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search here..." style={styles.searchInput} onChangeText={(e) => {setSearchString(e)}} />
          <TouchableOpacity style={styles.filtersButton} onPress={Keyboard.dismiss}>
            <MaterialCommunityIcons name="filter-variant" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {searchOn ? 
      <View>
        { profiles ? profiles.map((profile) => {
          return (
          <View style={styles.itemContainer}>
            <Image source={{ uri: profile.profilePicture ? profile.profilePicture.replace(/ /g, "%20") : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{profile.fullName || profile.handle}</Text>
              <Text style={styles.username}>@{profile.handle}</Text>
            </View>
          </View>
          )
        }) : <View/>}
      </View>
     :
     <View style={styles.grid}>
     <CategoryItem title="Trending (Top)" iconName="fire" iconColor="#FF4500" />
     <CategoryItem title="Trending (Local)" iconName="map-marker" iconColor="#4DB8FF" />
     <CategoryItem title="Lunch" iconName="food" iconColor="#FFD700" />
     <CategoryItem title="Dinner" iconName="food-variant" iconColor="#FF6347" />
     <CategoryItem title="Italian" iconName="pizza" iconColor="#FF4500" />
     <CategoryItem title="Vegan" iconName="leaf" iconColor="#32CD32" />
     <CategoryItem title="Indian" iconName="bowl" iconColor="#FF8C00" />
     <CategoryItem title="Chinese" iconName="noodles" iconColor="#FF4500" />
   </View>}
    </View>
  );
}

const CategoryItem = ({ title, iconName, iconColor }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={Keyboard.dismiss}>
    <MaterialCommunityIcons name={iconName} size={50} color={iconColor} />
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "SF-Pro-Text-Regular",
  },
  headerContainer: {
    backgroundColor: '#345c50', // Dark green color similar to the image
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    fontFamily: "SF-Pro-Text-Regular",
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: "SF-Pro-Text-Regular",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    fontFamily: "SweetSansProMedium",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "SweetSansProMedium",
  },
  filtersButton: {
    padding: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 25,
  },
  categoryItem: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    fontFamily: "SweetSansProMedium",
  },
  categoryText: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: "SweetSansProMedium",
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
  },
  username: {
    color: 'grey',
  },
});