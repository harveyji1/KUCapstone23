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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LoginContext } from "../../../LoginProvider";
import {
  SearchOutlineIcon,
  TrashIcon,
  DropDownIcon,
  AddOutlineIcon,
  AddIcon,
} from "../../../assets/recipe-icons";
import { Dropdown } from 'react-native-element-dropdown';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export function IngredientsScreen({ navigation, route }) {
  const [ingredient, setIngredient] = React.useState<string>("");
  const [ingredientsList, setIngredientsList] = React.useState<Ingredient[]>([]);

  const { state } = useContext(LoginContext);
  const profileID = state.sub;

  const {
    recipeName,
    tagsChef,
    combinedPrepTime,
    combinedCookTime,
    estimatedPrice,
    description,
    image,
  } = route.params;

    // Function to add an ingredient to the list
    const addIngredient = () => {
      if (ingredient) {
        const newIngredient = { name: ingredient, amount: '', unit: 'unit' };
        setIngredientsList([...ingredientsList, newIngredient]);
        setIngredient("");
      }
    };

  // Function to update the unit of an ingredient
  const updateUnit = (index: number, newUnit: string) => {
    const newList = [...ingredientsList];
    newList[index].unit = newUnit;
    setIngredientsList(newList);
  };  

  // Function to update the amount of an ingredient
  const updateAmount = (index: number, newAmount: string) => {
    const newList = [...ingredientsList];
    newList[index].amount = newAmount;
    setIngredientsList(newList);
  };
  
  // Function to remove an ingredient from the list
  const removeIngredient = (index: number) => {
    const newList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newList);
  };

  // Main return statement rendering the UI elements
  return (
    <View style={styles.container}>
      {/* Search bar for adding ingredients */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchOutlineIcon />
          <TextInput
            style={styles.inputBox}
            onChangeText={setIngredient}
            value={ingredient}
            placeholder="Add Ingredient"
            placeholderTextColor={"#9CA3AF"}
          />
        </View>
        {/* Add button */}
        <TouchableOpacity 
          onPress={addIngredient} 
          style={styles.addIconContainer}>
            <AddIcon />
        </TouchableOpacity>
      </View>
      {/* Adding ingredient name, amount, and dropdown for unit */}
      <FlatList
        data={ingredientsList}
        renderItem={({ item, index }) => (
          <View style={styles.ingredientItemContainer}>
            <Text style={styles.ingredientItem}>{item.name}</Text>
            <TextInput
              style={styles.inputAmount}
              onChangeText={(newAmount) => updateAmount(index, newAmount)}
              value={item.amount}
              placeholder="Amount"
              keyboardType="numeric"
            />
            
            <Dropdown
              style={styles.dropdownStyle}
              data={[
                { label: 'unit', value: 'unit' },
                { label: 'tsp', value: 'tsp' },
                { label: 'ml', value: 'ml' },
                { label: 'gram', value: 'gram' },
                { label: 'tbsp', value: 'tbsp' },
                { label: 'cups', value: 'cups' },
                { label: 'pieces', value: 'pieces' },

              ]}
              labelField="label"
              valueField="value"
              value={item.unit}
              onChange={(selectedItem) => updateUnit(index, selectedItem.value)}
              containerStyle={styles.dropdownContainerStyle}
              fontFamily="SF-Pro-Display-Regular"
              selectedTextStyle={styles.selectedTextStyle}
              activeColor="#E3F3EE"
              itemTextStyle={styles.textStyle}
              itemContainerStyle={styles.optionsContainerStyle}
              renderRightIcon={() => <DropDownIcon />}
            />
            <TouchableOpacity onPress={() => removeIngredient(index)}>
              <TrashIcon />
            </TouchableOpacity>
          </View>
        )}

        keyExtractor={(_, index) => index.toString()}
      />
    
    {/* Button to navigate to next page */}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start", 
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%", 
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#F7F7F9",
    backgroundColor: "#F7F7F9",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputBox: {
    flex: 1,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 12,
    fontFamily: "SF-Pro-Display-Regular",
    marginRight: 10, 
    marginLeft: 10,
  },
  addIconContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  ingredientItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    width: '100%',
  },
  ingredientItem: {
    flex: 1, 
    marginLeft: 10,
    marginRight: 5,
    fontSize: 15,
    color: "#111827",
    fontFamily: "SF-Pro-Display-Medium",
  },
  inputAmount: {
    width: 80,
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    textAlign: 'center',
    height: 28, 
    fontSize: 14,
    fontFamily: "SF-Pro-Display-Regular",
    color: "#111827",
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
  dropdownStyle: {
    height: 28, 
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    width: 60,
    padding: 5,
  },
  dropdownContainerStyle: {
  },
  selectedTextStyle: {
    alignItems: 'center',
    color: "#345C50",
    fontSize: 14,
  },
  textStyle: {
    alignItems: 'center',
    color: "#345C50",
    fontSize: 12,
  },
  optionsContainerStyle: {
    margin: -5,
  },
});
