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
import {
  EditProfileIcon,
} from "../../assets/recipe-icons";

type UserProfile = {
  profilePicture: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  handle: string;
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
      <View style={styles.postDetailContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.cost}>${item.cost}</Text>
          {/* <Text style={styles.cost}>{item.ingredients}</Text> */}
        </View>

      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.PostImage }} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

<View style={styles.headerContainer}>
  <View style={styles.headerUsernameContainer}>
    <Text style={styles.headerUsername}>{profile.handle}</Text>
  </View>
  <TouchableOpacity
    onPress={() => navigation.navigate("EditProfile")}
  >
    <View style={styles.headerEditButton}><EditProfileIcon/></View>
  </TouchableOpacity>
</View>

  <View style={styles.infoContainer}>
    <View style={styles.profileAndNameContainer}>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: encodedUrl,
          }}
        />
      </View>
      <View style={styles.nameBioContainer}>
        <Text style={styles.userName}>
          {profile.fullName}
        </Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
    </View>

    <View style={styles.statsContainer}>
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
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  // ====== STATS: CONTAINER ======
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 20,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', 
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
  nameBioContainer : {
    flex: 1,
  },
  // ====== HEADER: USERNAME ======
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerUsernameContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 26,
  },
  headerUsername: {
    fontSize: 20,
    color: '#4B5563',
    fontFamily: 'SF-Pro-Text-Semibold',
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
    // alignItems: 'center',
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
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
  titleContainer:{
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  cost: {
    fontSize: 16,
    color: "#666",
  },
  detailsContainer: {
    
  },
  imageContainer: {
    paddingTop: 0,
  },
  image: {
    height: 80,
    width: 80,
    borderColor: "#345C50",
    borderWidth: 1,
  },
});

export default ProfileScreen;
