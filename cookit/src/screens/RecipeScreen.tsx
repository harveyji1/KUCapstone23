import React from 'react';
import { View, Text } from 'react-native';

const RecipeScreen = ({ route }) => {
  // Access the item parameter from the route
  const { item } = route.params;

  // Now you can use the item data in your component
  return (
    <View>
      <Text>{item.dishName}</Text>
      {/* Display other recipe details */}
    </View>
  );
};

export default RecipeScreen;