/*
  Purpose: This is the Home Screen of the App that contains the home feed
  Author: Harvey Ji
  Editors: Audrey Pino
*/

//all the imports
import * as React from "react";
import { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Container } from "../styles/FeedStyles";
import RecipeCard from "../components/Recipes/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { LoginContext } from "../../LoginProvider";
import { EditProfileIcon } from "../../assets/recipe-icons";

//This will be replaced by actual data from backend
//For now this is passing in the posts
export const Posts = [
  {
    id: "1",
    userName: "Nick Anaya",
    userImg: require("../img/defaultpfp.jpeg"),
    postTime: "4 minutes ago",
    description:
      "Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think",
    postImg: require("../img/defaultpostimg.jpeg"),
    upvoted: false,
    upvotes: 14,
    downvoted: false,
    downvotes: 3,
    comments: 5,
    saved: false,
    saves: 4,
    dishName: "Stir-Fry Chicken",
    prepTime: 10,
    estimatedCost: 10,
    ingredients: [
      "1 lb of Chicken",
      "4 oz of rice",
      "3 oz Broccoli",
      "ingredient 4",
      "ingredient 5",
      "ingredient 6",
      "ingredient 7",
    ],
    instructions: [
      "cook chicken",
      "cook rice",
      "cook broccoli",
      "this is the 4th instruction and it is actually pretty long so that i can see what it looks like",
      "done",
    ],
    yield: 2,
    cookTime: 20,
    estCost: 30,
    filters: ["Gluten Free", "Dairy Free", "Vegan", "Chicken"],
  },
  {
    id: "2",
    userName: "Harvey Ji",
    userImg: require("../img/defaultpfp.jpeg"),
    postTime: "10 minutes ago",
    description:
      "Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think",
    postImg: require("../img/defaultpostimg.jpeg"),
    upvoted: true,
    upvotes: 14,
    downvoted: true,
    downvotes: 9,
    comments: 5,
    saved: true,
    saves: 56,
    dishName: "Stir-Fry Chicken",
    prepTime: 10,
    estimatedCost: 10,
    ingredients: [
      "1 lb of Chicken",
      "4 oz of rice",
      "3 oz Broccoli",
      "ingredient 4",
      "ingredient 5",
      "ingredient 6",
      "ingredient 7",
    ],
    instructions: [
      "cook chicken",
      "cook rice",
      "cook broccoli",
      "this is the 4th instruction and it is actually pretty long so that i can see what it looks like",
      "done",
    ],
    yield: 6,
    cookTime: 15,
    estCost: 15,
    filters: ["Gluten Free", "Low Calories", "Eggs"],
  },
  {
    id: "3",
    userName: "Audrey Pino",
    userImg: require("../img/defaultpfp.jpeg"),
    postTime: "1 hour ago",
    description: "I am a big doo doo head",
    postImg: require("../img/defaultpostimg.jpeg"),
    upvoted: false,
    upvotes: 14,
    downvoted: true,
    downvotes: 1,
    comments: 0,
    saved: false,
    saves: 0,
    dishName: "Stir-Fry Chicken",
    prepTime: 10,
    estimatedCost: 10,
    ingredients: [
      "1 lb of Chicken",
      "4 oz of rice",
      "3 oz Broccoli",
      "ingredient 4",
      "ingredient 5",
      "ingredient 6",
      "ingredient 7",
    ],
    instructions: [
      "cook chicken",
      "cook rice",
      "cook broccoli",
      "this is the 4th instruction and it is actually pretty long so that i can see what it looks like",
      "done",
    ],
    yield: 4,
    cookTime: 25,
    estCost: 45,
    filters: ["Rice", "Chicken", "Chinese"],
  },
  {
    id: "4",
    userName: "Aiden Frevert",
    userImg: require("../img/defaultpfp.jpeg"),
    postTime: "1 day ago",
    description:
      "Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think",
    postImg: require("../img/defaultpostimg.jpeg"),
    upvoted: false,
    upvotes: 1234,
    downvoted: false,
    downvotes: 3456,
    comments: 1,
    saved: true,
    saves: 8746,
    dishName: "Stir-Fry Chicken",
    prepTime: 10,
    estimatedCost: 10,
    ingredients: [
      "1 lb of Chicken",
      "4 oz of rice",
      "3 oz Broccoli",
      "ingredient 4",
      "ingredient 5",
      "ingredient 6",
      "ingredient 7",
    ],
    instructions: [
      "cook chicken",
      "cook rice",
      "cook broccoli",
      "this is the 4th instruction and it is actually pretty long so that i can see what it looks like",
      "done",
    ],
    yield: 1,
    cookTime: 8,
    estCost: 13,
    filters: ["Vegan"],
  },
  {
    id: "5",
    userName: "Tony Czajka",
    userImg: require("../img/defaultpfp.jpeg"),
    postTime: "November 3rd",
    description:
      "Hi everyone! This is one of my favorite recipes ever! Please enjoy and let me know what you think",
    postImg: require("../img/defaultpostimg.jpeg"),
    upvoted: true,
    upvotes: 48569,
    downvoted: false,
    downvotes: 34567,
    comments: 5,
    saved: false,
    saves: 98754,
    dishName: "Stir-Fry Chicken",
    prepTime: 10,
    estimatedCost: 10,
    ingredients: [
      "1 lb of Chicken",
      "4 oz of rice",
      "3 oz Broccoli",
      "ingredient 4",
      "ingredient 5",
      "ingredient 6",
      "ingredient 7",
    ],
    instructions: [
      "cook chicken",
      "cook rice",
      "cook broccoli",
      "this is the 4th instruction and it is actually pretty long so that i can see what it looks like",
      "done",
    ],
    yield: 10,
    cookTime: 45,
    estCost: 100,
    filters: ["Gluten Free", "Dairy Free", "Vegan", "Chicken", "Eggs"],
  },
];

const LOCAL_HOST_NUBMER = "5018";

//The actual function of the HomeScreen
export function HomeScreen({}) {
  // Login Conetext
  const { state } = useContext(LoginContext);
  const loginToken = state;

  const [feed, setFeed] = useState();
  const [refreshCount, setRefreshCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  function getFeed() {
    axios
      .get(`http://localhost:${LOCAL_HOST_NUBMER}/api/Feed/getFeed`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      })
      .then((response) => {
        console.log("Feed response: ", response.data.$values);
        setFeed(response.data.$values);
      })
      .catch((error) => {
        console.error("Error Fetching Feed: ", error);
      });
  }
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.headerUsernameContainer}>
          <Text style={styles.headerUsername}>Refresh -{">"} </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setRefreshCount(refreshCount + 1);
          }}
        >
          <View style={styles.headerEditButton}>
            <EditProfileIcon />
          </View>
        </TouchableOpacity>
      </View>
      <Container>
        {/*Maps out each card to the item passed in*/}
        <StatusBar style="auto" />
        <FlatList
          data={feed}
          renderItem={({ item }) => {
            console.log("Post from home: ", item);
            console.log("Item id: ", item.id);
            return <RecipeCard post={item} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: "#FFF",
  //   height: "100%",
  // },
  // ====== HEADER: USERNAME ======
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerUsernameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 26,
  },
  headerUsername: {
    fontSize: 20,
    color: "#4B5563",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerEditButton: {
    paddingRight: 2,
  },

  // ====== EDIT PROFILE BUTTON ======
  editProfileButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  // ====== REACTIONS ======
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  reactionContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
    // padding: 10,
    // borderColor: "#718093",
    // borderWidth: 1,
  },
  icon: {
    paddingBottom: 2,
    paddingLeft: 3,
  },
  reactionText: {
    fontSize: 12,
    color: "#718093",
    fontFamily: "SF-Pro-Text-Regular",
  },
});

// Yes, you can achieve this behavior by using a combination of useEffect and a state variable to track whether the component has mounted. Here's an example of how you can do this:

// javascript
// Copy code
// import React, { useState, useEffect } from 'react';

// function ExampleComponent() {
//   const [count, setCount] = useState(0);
//   const [hasMounted, setHasMounted] = useState(false);

//   // Run once when the component mounts
//   useEffect(() => {
//     console.log('Component mounted');
//     setHasMounted(true);
//   }, []);

//   // Run when `count` changes, but only after the component has mounted
//   useEffect(() => {
//     if (hasMounted) {
//       console.log(`Count changed to ${count}`);
//     }
//   }, [count, hasMounted]);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }

// export default ExampleComponent;

export default HomeScreen;
