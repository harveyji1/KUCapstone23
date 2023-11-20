/*
  Purpose: Screen component in create a post flow where users input the instructions for how to make the recipie.
  Author: Tony Czajka
  Editors: 
*/
import * as React from "react";
import { Text, View, Button } from "react-native";

export function InstructionsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Instructions Screen</Text>
      <Button
        title="NextScreen"
        onPress={() => navigation.navigate("Review")}
      />
    </View>
  );
}
