/*
  Purpose: Review Post screen component, users will be able to see what their post will look like before they actually post it.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import { Text, View, Button } from "react-native";
import { LoginContext } from "../../../LoginProvider";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export function ReviewPostScreen({ navigation, route }) {
  const { state } = React.useContext(LoginContext);
  let loginToken = state;
  const {
    recipeName,
    description,
    combinedCookTime,
    image,
    ingredientsString,
    instructions,
    estimatedPrice,
  } = route.params;
  const LOCAL_HOST_NUBMER = "5018";

  const HandlePost = async () => {
    // convert list to string
    let priceAsString = parseFloat(estimatedPrice).toFixed(2);
    // convert image to binary

    const url = `http://localhost:${LOCAL_HOST_NUBMER}/api/v1.0/posts`;

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

      // file system stuff
      // Read the image file as a base64-encoded string
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Create a Blob object from the base64 string
      // const blob = new Blob([base64], { type: "image/jpeg" }); // Replace 'image/jpeg' with the correct MIME type of your image
      // const contents = await FileSystem.readAsStringAsync(image);

      const formData = new FormData();
      formData.append("Title", recipeName);
      formData.append("Ingredients", ingredientsString);
      formData.append("Instructions", instructions);
      formData.append("Cost", priceAsString);
      formData.append("PrepTime", combinedCookTime);
      formData.append("Description", description);
      // Append the base64 image to the FormData
      formData.append("PostImage", {
        uri: `data:image/jpeg;base64,${base64}`,
        name: "image.jpg",
        type: "image/jpeg",
      });
      // formData.append("PostImage", blob);

      // Debug stuff
      console.log("Recipe Name: ", recipeName);
      console.log("Description: ", description);
      console.log("cookingTime: ", combinedCookTime);
      console.log("cost: ", estimatedPrice);
      console.log("imageBlob: ", "Test");
      console.log("ingredients list: ", ingredientsString);
      console.log("INstructions: ", instructions);

      // // Log each key-value pair
      // for (let [key, value] of formData.entries()) {
      //   if ((key = "PostImage")) {
      //     console.log("BLOB HERE");
      //   } else {
      //     console.log(`${key}: ${value}`);
      //   }
      // }

      const response = await axios.post(url, formData, config);
      console.log("Response: ", response.data);

      // Navigate back to create post
      navigation.navigate("CreatePost");
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ReviewPost Screen</Text>
      <Button title="Make Post" onPress={HandlePost} />
    </View>
  );
}
