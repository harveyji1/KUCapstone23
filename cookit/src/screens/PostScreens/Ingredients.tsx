import * as React from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

export function IngredientsScreen({ navigation }) {
  const [ingredient, setIngredient] = React.useState<string>('');
  const [ingredientsList, setIngredientsList] = React.useState<string[]>([]);

  const addIngredient = () => {
    if (ingredient && !ingredientsList.includes(ingredient)) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    const newList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newList);
  };

  return (
    <View style={styles.ingredientPageContainer}>
      <Text style={styles.headerText}>Add Your Ingredients</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setIngredient}
        value={ingredient}
        placeholder="Enter an ingredient"
        placeholderTextColor={"#3D5147"}
      />
      <Button title="Add Ingredient" onPress={addIngredient} color="#46996F" />
      <FlatList
        data={ingredientsList}
        renderItem={({ item, index }) => (
          <View style={styles.ingredientsList}>
            <View style={styles.ingredientItemContainer}>
              <Text style={styles.ingredientItem}>{item}</Text>
              <TouchableOpacity onPress={() => removeIngredient(index)}>
                <Text style={styles.removeIcon}><Feather name="x" size={15} /></Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Button
        color={"#46996F"}
        title="Next Screen"
        onPress={() => navigation.navigate("Instructions")}
      />
    </View>
  );

}

// Add your styles here

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'SweetSansProBold',
    marginBottom: 20,
    marginTop: 20,
    color: '#345C50',
  },
  ingredientsList: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5,
    marginBottom: 5,
  },
  ingredientItem: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'SweetSansProRegular',
    fontSize: 16,
    color: '#345C50',
  },
  ingredientItemContainer: {
    borderColor: '#345C50',
    borderWidth: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 8,
    backgroundColor: '#DDE6D5',
  },
  inputBox: {
    height: 60, 
    borderColor: "#667B68", // --color-forest-green
    borderWidth: 4, 
    borderRadius: 15,
    padding: 10,
    width: '80%', 
    marginBottom: 10,
    fontFamily: "PlayfairDisplay-Medium",
    fontSize: 16,
    color: "#3D5147", // --color-forest-green
  },
  ingredientPageContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F4EAD7',
  },
  removeIcon: {
    color: '#345C50',
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 5,
  
  },
});