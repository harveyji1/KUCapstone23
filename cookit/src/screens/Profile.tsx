/*
  Purpose: This is the Profile Screen of the App that contains the each persons profile
  Author:Harvey Ji
  Editors:Tony Czajka
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
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Button,
} from "react-native";
import { useState, useEffect, useContext } from "react"; // <-- Import useState and useEffect
import axios from "axios";
import { LoginContext } from "../../LoginProvider";
import { useFocusEffect } from "@react-navigation/native";

type UserProfile = {
  profilePicture: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  user: string;
  fullName: string;
  bio: string;
};

const LOCAL_HOST_NUBMER = "5018";
type ProfileScreenRouteParams = {
  itemID: string;
  otherParam: string;
};
const screenWidth = Dimensions.get("window").width;
let profileID = 6;

export function ProfileScreen({ navigation }) {
  const { state } = useContext(LoginContext);
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
  // 1. Create state variables for profile data
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [encodedUrl, setEncodedUrl] = useState("");
  const [postsArray, setPostsArray] = useState("");

  // 2. Use the useEffect hook to fetch profile data when the component mounts
  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .get(`http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/profile`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      })
      .then((response) => {
        console.log("Profile Return: ", response.data);

        // getting data
        setProfile(response.data);
        setPostsArray(response.data.posts.$values);

        // encode url so that its in the correct format to pull the image
        const imageUrl = response.data.profilePicture;
        if (imageUrl) {
          setEncodedUrl(imageUrl.replace(/ /g, "%20"));
          console.log("Encoded URL:", encodedUrl);
        } else {
          console.log("no profile pic");
        }

        // testing posts response
        console.log("Posts: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (!profile) {
    return <Text>Loading...</Text>; // Display loading text until the profile data is fetched
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.cost}>${item.cost}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: encodedUrl ? encodedUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
        ></Image>
        <View style={styles.postContainer}>
          <Text style={styles.numberOfPosts}>{profile.postCount}</Text>
          <Text style={styles.postWord}>Posts</Text>
        </View>
        <View style={styles.followersContainer}>
          <Text style={styles.numOfFollowers}>{profile.followerCount}</Text>
          <Text style={styles.followersWord}>Followers</Text>
        </View>
        <View style={styles.followingContainer}>
          <Text style={styles.numOfFollowing}>{profile.followingCount}</Text>
          <Text style={styles.followingWord}>Following</Text>
        </View>
      </View>
      <Text style={styles.userName}>
        {/*props.userName*/}
        {profile.fullName}
      </Text>
      <Text style={styles.bio}>{profile.bio}</Text>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.border}></View>
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
  container: {
    backgroundColor: "#F4EAD7",
    height: "100%",
  },
  // ====== STATS: CONTAINER ======
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 40,
    width: "100%",
  },
  // ====== STATS: POSTS ======
  postContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15, // Add horizontal margin
    marginLeft: 50,
  },
  numberOfPosts: {
    fontWeight: "400",
    fontSize: 18,
    color: "#345C50",
  },
  postWord: {
    fontSize: 12,
    paddingTop: 5,
    color: "#667B68",
    fontFamily: "SweetSansProRegular",
  },
  // ====== STATS: FOLLOWERS ======
  followersContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15, // Add horizontal margin
  },
  numOfFollowers: {
    fontWeight: "400",
    fontSize: 18,
    color: "#345C50",
  },
  followersWord: {
    paddingTop: 5,
    fontSize: 12,
    color: "#667B68",
    fontFamily: "SweetSansProRegular",
  },
  // ====== STATS: FOLLOWING ======
  followingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15, // Add horizontal margin
  },
  numOfFollowing: {
    fontWeight: "400",
    fontSize: 18,
    color: "#345C50",
  },
  followingWord: {
    paddingTop: 5,
    fontSize: 12,
    color: "#667B68",
    fontFamily: "SweetSansProRegular",
  },
  // ====== PROFILE PIC & USERNAME ======
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    color: "#345C50",
    marginTop: 15,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "SweetSansProBold",
    marginLeft: 20,
  },
  bio: {
    fontSize: 12,
    color: "#667B68",
    fontFamily: "SweetSansProRegular",
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 20,
  },
  // ====== EDIT PROFILE BUTTON ======
  editProfileButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  editProfileButtonText: {
    color: "#667B68",
    fontSize: 16,
    fontFamily: "SweetSansProBold",
  },
  // ====== DIVIDER ======
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#345C50",
    marginBottom: 5,
  },
  // ====== IMAGES: POSTS ======
  postsContainer: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  postSpacing: {
    paddingLeft: 10, // This creates spacing between images
  },
  recipePosts: {
    // Set only the aspect ratio here
    aspectRatio: 1, // Maintain aspect ratio
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 1, // Add shadow effect for iOS use shadow props
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cost: {
    fontSize: 16,
    color: "#666",
  },
});

export default ProfileScreen;
