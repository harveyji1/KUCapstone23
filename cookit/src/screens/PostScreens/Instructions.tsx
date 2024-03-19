/*
  Purpose: This is the Insturctions Screen of the Create Post Screens that allows the user to enter in the instructions of their recipe
  Author: Audrey Pino & Harvey Ji
  Editors: Audrey Pino
*/

import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { PlusIcon, TrashIcon, MenuIcon } from "../../../assets/recipe-icons";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

interface instructions {
  id: string;
  instruction: string;
}

export function InstructionsScreen({ route, navigation }) {
  const {
    recipeName,
    // tagsChef,
    combinedPrepTime,
    combinedCookTime,
    estimatedPrice,
    description,
    tagInput,
    image,
    ingredientsString,
  } = route.params;
  // console.log("Instructions screen ingredients string: ", ingredientsString);
  // State to store the instructions and set the initial state to have 2 empty instructions
  const [instructions, setInstructions] = useState<Array<instructions>>(
    Array.from({ length: 2 }, (_, i) => ({
      id: `step-${i}`,
      instruction: "",
    }))
  );

  // Function to reorder the instructions
  const onReordered = async (fromIndex: number, toIndex: number) => {
    const copy = [...instructions];
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]);
    setInstructions(copy);
  };

  // Function to add an instruction to the list
  const addInstructionStep = () => {
    const newId = `step-${instructions.length + 1}`; // Updated to keep the id format consistent
    const newStep = { id: newId, instruction: "" }; // Create a new step with an empty instruction
    setInstructions([...instructions, newStep]);
  };

  // Function to update the instruction step
  const updateInstructionStep = (text: string, index: number) => {
    const newInstructions = [...instructions];
    newInstructions[index].instruction = text;
    setInstructions(newInstructions);
  };

  // Function to remove an instruction step
  const removeInstructionStep = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  // Function to render the instruction step
  const renderItem = ({ item, index, onDragStart, onDragEnd }) => {
    if (item === "AddMoreButton") {
      return (
        <TouchableOpacity
          key={item}
          style={[styles.addMoreButton]}
          onPress={addInstructionStep}
        >
          <PlusIcon />
          <Text style={styles.addMoreButtonText}>Add more</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={[
            styles.instructionInputContainer,
            item.isActive && styles.active,
          ]}
          key={item.id}
        >
          <TouchableOpacity
            onPressIn={onDragStart}
            onPressOut={onDragEnd}
            style={styles.menuButton}
          >
            <MenuIcon />
          </TouchableOpacity>
          <TextInput
            style={styles.instructionInput}
            onChangeText={(text) => updateInstructionStep(text, index)}
            value={item.instruction}
            placeholder={`Step ${index + 1}`}
            multiline
          />
          <TouchableOpacity onPress={() => removeInstructionStep(index)}>
            <Text>
              <TrashIcon />
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // Function to extract the key from the item
  const keyExtractor = (item: any) => {
    return typeof item === "object" ? item.id.toString() : item;
  };

  // Main return statement rendering the UI elements and the button to navigate to the next screen
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DragList
          data={[...instructions, "AddMoreButton"]}
          renderItem={({ item, index, onDragStart, onDragEnd }) =>
            renderItem({ item, index, onDragStart, onDragEnd })
          }
          onReordered={onReordered}
          keyExtractor={keyExtractor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            color="#FFF"
            title="Post"
            onPress={() =>
              navigation.navigate("Review", {
                recipeName,
                // tagsChef,
                combinedPrepTime,
                combinedCookTime,
                estimatedPrice,
                description,
                tagInput,
                image,
                ingredientsString,
                instructions: instructions.map(
                  (instruction) => instruction.instruction
                ), // Pass the instructions text only
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
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  instructionInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  instructionInput: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    fontFamily: "SF-Pro-Display-Medium",
  },
  addMoreButton: {
    flexDirection: "row",
    marginRight: 0,
    alignSelf: "flex-end",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  addMoreButtonText: {
    color: "#345C50",
    fontSize: 14,
    fontFamily: "SF-Pro-Display-Bold",
  },
  menuButton: {
    marginRight: 10,
  },
  active: {
    borderColor: "#345C50",
  },
  button: {
    borderRadius: 50,
    width: 343,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#345C50",
  },
});
