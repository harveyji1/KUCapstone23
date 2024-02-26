/*
  Purpose: Review Post screen component, users will be able to see what their post will look like before they actually post it.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import { Text, View, Button } from "react-native";
import { LoginContext } from "../../../LoginProvider";

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

  const HandlePost = async () => {
    try {
      // convert list to string
      let ingredientsString = ingredientsList.join(", "); // Join the array elements with a comma and a space
      // convert image to binary

      // API call
      console.log("Recipe Name: ", recipeName);
      console.log("Description: ", description);
      console.log("cookingTime: ", combinedCookTime);
      console.log("cost: ", estimatedPrice);
      console.log("image: ", image);
      console.log("ingredients list: ", ingredientsString);
      console.log("INstructions: ", instructions);
      navigation.navigate("CreatePost");
    } catch (error) {
      // Error handle api call
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ReviewPost Screen</Text>
      <Button title="Make Post" onPress={HandlePost} />
    </View>
  );
}
