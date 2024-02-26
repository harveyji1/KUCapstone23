/*
  Purpose: Review Post screen component, users will be able to see what their post will look like before they actually post it.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import { Text, View, Button } from "react-native";
import { LoginContext } from "../../../LoginProvider";
import axios from "axios";

export function ReviewPostScreen({ navigation, route }) {
  const { state } = React.useContext(LoginContext);
  let loginToken = state;
  const {
    recipeName,
    description,
    combinedCookTime,
    image,
    ingredientsList,
    instructions,
    estimatedPrice,
  } = route.params;
  const LOCAL_HOST_NUBMER = "5018";

  const HandlePost = async () => {
    // convert list to string
    let ingredientsString = ingredientsList.join(", "); // Join the array elements with a comma and a space
    // convert image to binary

    const url = `http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/posts`;
    const formData = new FormData();
    formData.append("Title", recipeName);
    formData.append("Ingredients", ingredientsString);
    formData.append("Instructions", instructions);
    formData.append("Cost", estimatedPrice);
    formData.append("PrepTime", combinedCookTime);
    // need to append bob for image later

    // const data = {
    //   Title: recipeName,
    //   Ingredients: ingredientsString,
    //   Cost: estimatedPrice,
    //   PrepTime: combinedCookTime,
    //   PostImage: image,
    // };
    const config = {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    };

    try {
      // API call
      const response1 = await fetch(image);
      const blob = await response1.blob();
      formData.append("PostImage", blob, blob._data.name);

      // Debug stuff
      console.log("Recipe Name: ", recipeName);
      console.log("Description: ", description);
      console.log("cookingTime: ", combinedCookTime);
      console.log("cost: ", estimatedPrice);
      console.log("imageBlob: ", blob._data.name);
      console.log("ingredients list: ", ingredientsString);
      console.log("INstructions: ", instructions);

      const response = await axios.post(url, formData, config);
      console.log("Response: ", response.data);

      // Navigate back to create post
      navigation.navigate("CreatePost");
    } catch (error) {
      // Error handle api call
      console.error("Error: ", error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ReviewPost Screen</Text>
      <Button title="Make Post" onPress={HandlePost} />
    </View>
  );
}
