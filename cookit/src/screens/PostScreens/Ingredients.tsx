/*
  Purpose: This is the Ingredeients Screen of the Create Post Screens that allows the user to enter in the ingredients of their recipe
  Author: Audrey Pino & Harvey Ji
  Editors:
*/

import * as React from "react";
import { useContext } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LoginContext } from "../../../LoginProvider";
import {
  SearchOutlineIcon,
} from "../../../assets/recipe-icons";

export function IngredientsScreen({ route, navigation }) {
  const [ingredient, setIngredient] = React.useState<string>("");
  const [ingredientsList, setIngredientsList] = React.useState<string[]>([]);

  const { state } = useContext(LoginContext);
  const profileID = state.sub;

  const { recipeName, tagsChef, combinedPrepTime, combinedCookTime, estimatedPrice, description, image } = route.params;

  const addIngredient = () => {
    if (ingredient && !ingredientsList.includes(ingredient)) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    const newList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newList);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>Add Your Ingredients</Text> */}
      <View style={styles.searchContainer}>
        <SearchOutlineIcon />
        <TextInput
          style={styles.inputBox}
          onChangeText={setIngredient}
          value={ingredient}
          placeholder="Search Ingredients"
          placeholderTextColor={"#9CA3AF"}
        />
      </View>

      <Button title="Add Ingredient" onPress={addIngredient} color="#46996F" />
      <FlatList
        data={ingredientsList}
        renderItem={({ item, index }) => (
          <View style={styles.ingredientsList}>
            <View style={styles.ingredientItemContainer}>
              <Text style={styles.ingredientItem}>{item}</Text>
              <TouchableOpacity onPress={() => removeIngredient(index)}>
                <Text style={{ color: "red" }}>
                  <Feather name="x" size={15} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    <View style={styles.buttonContainer}>
      <View style={styles.button}>
          <Button
            color="#FFF"
            title="Next"
            onPress= {() =>
              navigation.navigate('Instructions', {
                recipeName,
                tagsChef,
                combinedPrepTime,
                combinedCookTime,
                estimatedPrice,
                description,
                image,
                ingredientsList,
              })
            }
          />
          </View>
        </View>
    </View>
  );
}

// Add your styles here

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredientsList: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  ingredientItem: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: "SF-Pro-Display-Medium",
    fontSize: 16,
    color: "#345C50",
  },
  ingredientItemContainer: {
    borderColor: "#345C50",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F4EAD7",
  },
  inputBox: {
    flex: 1, 
    marginLeft: 10, 
    height: 40,
    borderColor: 'transparent', 
    borderWidth: 0, 
    borderRadius: 12,
    fontFamily: "SF-Pro-Display-Regular",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#F7F7F9",
    backgroundColor: "#F7F7F9",
    borderWidth: 2,
    borderRadius: 15,
    // padding: 10,
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 50,
    width: 343,
    height: 55,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#345C50", 
  },

});
