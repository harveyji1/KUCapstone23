import * as React from "react";
import { Text, View, Button } from "react-native";

export function IngredientsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Ingredients Screen</Text>
      <Button
        title="NextScreen"
        onPress={() => navigation.navigate("Instructions")}
      />
    </View>
  );
}
