/*
  Purpose: Review Post screen component, users will be able to see what their post will look like before they actually post it.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import { Text, View, Button } from "react-native";

export function ReviewPostScreen({ navigation }) {
  const {
    recipeName,
    description,
    cookingTime,
    cost,
    image,
    ingredientsList,
    instructions,
  } = navigation.params;

  const HandlePost = async () => {
    try {
      // API call
      console.log("Recipe Name: ", recipeName);
      console.log("Description: ", description);
      console.log("cookingTime: ", cookingTime);
      console.log("cost: ", cost);
      console.log("image: ", image);
      console.log("ingredients list: ", ingredientsList);
      console.log("INstructions: ", instructions);
    } catch (error) {
      // Error handle api call
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ReviewPost Screen</Text>
      <Button
        title="Make Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
    </View>
  );
}
