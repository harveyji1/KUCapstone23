/*
  Purpose: Review Post screen component, users will be able to see what their post will look like before they actually post it.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import { Text, View, Button } from "react-native";

export function ReviewPostScreen({ navigation }) {
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
