/*
Purpose: This file is the recipe folder component
Author: Harvey Ji
Editors:
*/

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Container } from "../styles/FeedStyles";
import RecipeCard from "../components/Recipes/RecipeCard";
import {
  ProfileSavedReactionIcon,
  ProfileSavedReactionOutlineIcon,
  ProfileUpReactionIcon,
  ProfileUpReactionOutlineIcon,
  ProfileDownReactionIcon,
  ProfileDownReactionOutlineIcon,
  ProfileCommentReactionIcon,
} from "../../assets/reaction-icons";

export function RecipeFolderScreen({ navigation, route }) {
  console.log(route);

  const { posts } = route.params;
  console.log(posts.$values);

  const formatCount = (count) => {
    if (count <= 999) {
      return count; // Return the count as is if less than 999
    } else if (count <= 9999) {
      // If count is between 1000 and 9999, format with one decimal place
      return (count / 1000).toFixed(1) + "k";
    } else {
      // If count is 10000 or more, format as an integer with 'k'
      return Math.floor(count / 1000) + "k";
    }
  };

  const renderItem = ({ item }) => {
    // Format the counts for likes, dislikes, comments, and saves
    const likesText = formatCount(item.numOfLikes);
    const dislikesText = formatCount(item.numOfDislikes);
    const commentsText = formatCount(item.numOfComments);
    const savesText = formatCount(item.numOfSaves);
    const encodedImage = item.postImage.replace(/ /g, "%20");

    // Determine which reaction icon to display based on whether the user has liked or disliked the post
    var upvotedIcon = item.isLikedByUser ? (
      <ProfileUpReactionIcon />
    ) : (
      <ProfileUpReactionOutlineIcon />
    );
    var downvotedIcon = item.isDislikedByUser ? (
      <ProfileDownReactionIcon />
    ) : (
      <ProfileDownReactionOutlineIcon />
    );

    // Render the post item
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeExpanded", { item })}
      >
        <View style={styles.itemContainer}>
          <View style={styles.postDetailContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.reactionContainer}>
                <View style={styles.icon}>{upvotedIcon}</View>
                <Text style={styles.reactionText}>{likesText}</Text>
              </View>

              <View style={styles.reactionContainer}>
                <View style={styles.icon}>{downvotedIcon}</View>
                <Text style={styles.reactionText}>{dislikesText}</Text>
              </View>

              <View style={styles.reactionContainer}>
                <View style={styles.icon}>
                  <ProfileCommentReactionIcon />
                </View>
                <Text style={styles.reactionText}>{commentsText}</Text>
              </View>

              <View style={styles.reactionContainer}>
                <View style={styles.icon}>
                  <ProfileSavedReactionOutlineIcon />
                </View>
                <Text style={styles.reactionText}>{savesText}</Text>
              </View>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: encodedImage }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // return (
  //   <Container>
  //     <StatusBar style="auto" />
  //     <FlatList
  //       data={posts.$values}
  //       renderItem={({ item }) => {
  //         //console.log("Why isn't the picture showing: ", posts.$values);
  //         return <RecipeCard post={item} />;
  //       }}
  //       keyExtractor={(item) => item.id}
  //       showsVerticalScrollIndicator={false}
  //     />
  //   </Container>
  // );
  return (
    <View style={styles.container}>
      <FlatList
        data={posts.$values}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  // ====== STATS: CONTAINER ======
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    borderBottomWidth: 4,
    borderBottomColor: "#F3F4F6",
    marginBottom: 6,
  },
  // ====== STATS: POSTS ======
  postContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
  },
  numberOfPosts: {
    fontSize: 18,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Medium",
  },
  postWord: {
    fontSize: 12,
    paddingTop: 5,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Regular",
  },
  // ====== STATS: FOLLOWERS ======
  followersContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
  },
  numOfFollowers: {
    fontSize: 18,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Medium",
  },
  followersWord: {
    paddingTop: 5,
    fontSize: 12,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Regular",
  },
  // ====== STATS: FOLLOWING ======
  followingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
  },
  numOfFollowing: {
    fontSize: 18,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Medium",
  },
  followingWord: {
    paddingTop: 5,
    fontSize: 12,
    color: "#111827",
    fontFamily: "SF-Pro-Text-Regular",
  },
  // ====== PROFILE PIC & USERNAME ======
  profileAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  profilePicContainer: {
    paddingHorizontal: 20,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 50,
    // borderColor: "#345C50",
    // borderWidth: 1,
  },
  userName: {
    fontSize: 18,
    color: "#111827",
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "SF-Pro-Text-Medium",
    marginLeft: 20,
  },
  bio: {
    fontSize: 12,
    color: "#4B5563",
    fontFamily: "SF-Pro-Text-Regular",
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 20,
  },
  nameBioContainer: {
    flex: 1,
  },
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
  // ====== IMAGES: POSTS ======
  listContainer: {
    // padding: 5,
    // paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 0,
    marginVertical: 8,
    elevation: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  postDetailContainer: {
    flex: 1,
    paddingTop: 5,
  },
  titleContainer: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  cost: {
    fontSize: 16,
    color: "#666",
  },
  imageContainer: {
    paddingTop: 0,
    paddingRight: 25,
  },
  image: {
    height: 80,
    width: 80,
    // borderColor: "#345C50",
    // borderWidth: 1,
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

export default RecipeFolderScreen;
