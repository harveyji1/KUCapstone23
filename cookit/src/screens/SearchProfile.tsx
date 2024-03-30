/*
  Purpose: This is the Profile Screen that shows a users profile after searching
  Author:Aiden Frevert
*/

//all the imports
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react"; // <-- Import useState and useEffect
import { LoginContext } from "../../LoginProvider";
import { EditProfileIcon } from "../../assets/recipe-icons";
import {
  ProfileSavedReactionOutlineIcon,
  ProfileUpReactionIcon,
  ProfileUpReactionOutlineIcon,
  ProfileDownReactionIcon,
  ProfileDownReactionOutlineIcon,
  ProfileCommentReactionIcon,
} from "../../assets/reaction-icons";
import { HeaderBackButton } from '@react-navigation/elements';


export function SearchProfile({ route, navigation }) {
  const { state } = useContext(LoginContext);
  const { profile } = route.params;
  let loginToken = state;
  // profileID = state.sub;
  // console.log("Profile");
  // console.log(state.sub);
  // console.log(profileID);
  // profileID = state.decodedToken.sub;
  const data = [
    {
      postimage:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/02/Mediterranean-Cod-en-Papillote-6.jpg",
    },
    {
      postimage:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/05/Chicken-Stir-Fry-9.jpg",
    },
    {
      postimage:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/03/Shrimp-Scampi-5.jpg",
    },
    {
      postimage:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/01/Baked-Chicken-Breasts-11.jpg",
    },
  ];
  const [encodedUrl, setEncodedUrl] = useState("");
  const [postsArray, setPostsArray] = useState("");
  const [following, setFollowing] = useState(false);

  useEffect(() => {

        // encode url so that its in the correct format to pull the image
        const imageUrl = profile.profilePicture;
        if (imageUrl) {
          setEncodedUrl(imageUrl.replace(/ /g, "%20"));
          console.log("Encoded URL:", encodedUrl);
        } else {
          console.log("no profile pic");
        }

        // testing posts response
        console.log("Posts: ", profile.posts);

        // Check if posts and $values exist
        if (profile.posts && profile.posts.$values) {
          const encodedPosts = profile.posts.$values.map((post) => {
            return {
              ...post,
              postImage: post.image
                ? post.image.replace(/ /g, "%20")
                : post.image,
            };
          });
          setPostsArray(encodedPosts);
        }
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (!profile) {
    return <Text>Loading...</Text>; // Display loading text until the profile data is fetched
  }

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
            <Image style={styles.image} source={{ uri: item.postImage }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <View style={styles.headerEditButton}>
            <HeaderBackButton label=" " tintColor="#000000" onPress={() => navigation.navigate("SearchScreen")}/>
          </View>
        </TouchableOpacity>
        <View style={styles.headerUsernameContainer}>
          <Text style={styles.headerUsername}>{profile.handle}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.profileAndNameContainer}>
          <View style={styles.profilePicContainer}>
            <Image
              style={styles.profilePic}
              source={{
                uri: encodedUrl
                  ? encodedUrl
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
            />
          </View>
          <View style={styles.nameBioContainer}>
            <Text style={styles.userName}>{profile.fullName}</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
            {/* Follow Button */}
    <TouchableOpacity
      style={following ? styles.unfollowButton : styles.followButton}
      onPress={() => {
        console.log("Follow Button Pressed");
        setFollowing(!following);
        // Implement your follow action here
      }}
    >
      <Text style={styles.followButtonText}>{following ? 'Unfollow' : 'Follow'}</Text>
    </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.postContainer}>
            <Text style={styles.numberOfPosts}>{profile.postCount}</Text>
            <Text style={styles.postWord}>Posts</Text>
          </View>
          <View style={styles.followersContainer}>
            <Text style={styles.numOfFollowers}>{following ? profile.followerCount + 1 : profile.followerCount}</Text>
            <Text style={styles.followersWord}>Followers</Text>
          </View>
          <View style={styles.followingContainer}>
            <Text style={styles.numOfFollowing}>{profile.followingCount}</Text>
            <Text style={styles.followingWord}>Following</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={postsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  followButton: {
    marginTop: 10,
    paddingHorizontal: 10,
    maxWidth: 275,
    paddingVertical: 8,
    backgroundColor: "#345C50", // Example button color, adjust as needed
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  unfollowButton: {
    marginTop: 10,
    paddingHorizontal: 10,
    maxWidth: 275,
    paddingVertical: 8,
    backgroundColor: "#718093", // Example button color, adjust as needed
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  followButtonText: {
    color: "#ffffff", // Example text color, adjust as needed
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingTop: 50
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
    marginRight: 20,
  },
  bio: {
    fontSize: 12,
    color: "#4B5563",
    fontFamily: "SF-Pro-Text-Regular",
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 0,
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
    marginRight: 35,
  },
  headerUsername: {
    fontSize: 20,
    color: "#4B5563",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerEditButton: {
    paddingLeft:2,
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

export default SearchProfile;
