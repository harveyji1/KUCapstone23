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
import { EditProfileIcon, FilterIcon } from "../../assets/recipe-icons";


const LOCAL_HOST_NUBMER = "5018";

//The actual function of the HomeScreen
export function HomeScreen({ navigation }) {
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
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Vegan</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Gluten Free</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Chicken</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View style={styles.filterContainer}>
            <FilterIcon />
            <Text style={styles.filterHeader}> Filter</Text>
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
    // borderBottomWidth: 1,
    // borderBottomColor: "#345C50",
    backgroundColor: "#345C50",
    borderWidth: 1,
    borderColor: "#345C50",
  },
  headerUsernameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 26,
  },
  headerUsername: {
    fontSize: 20,
    color: "#FFF",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  filterContainer: {
    paddingRight: 2,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 2,
  },
  filterHeader: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "SF-Pro-Text-Medium",
    marginLeft: 5,
    marginTop: 3,
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
  // ====== TAGS ======
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 10,
    // backgroundColor: "#345C50",
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(227, 243, 238, 0.3)',
    borderRadius: 16,
    marginHorizontal: 2,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    margin: 4,
  },
  tagText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "SF-Pro-Text-Regular",
    opacity: 0.7,
  },
});


export default HomeScreen;
