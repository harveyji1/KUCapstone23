import * as React from "react";
import { Text, View, Button } from "react-native";

export function InstructionsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Instructions Screen</Text>
      <Button
        color={"#46996F"}
        title="NextScreen"
        onPress={() => navigation.navigate("Review")}
      />
    </View>
  );
}
