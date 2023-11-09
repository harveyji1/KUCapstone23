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
