import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const RecipeScreen = ({ route }) => {
  const { item } = route.params;

  function stringToIngredients(ingredientsString: string) {
    return ingredientsString.split("|").map((ingredient) => {
      const [amount, name, unit] = ingredient.split("~");
      return { amount, name, unit };
    });
  }
  const extractedIngredients = stringToIngredients(item.ingredients);

  function stringToInstructions(instructionsString: string) {
    return instructionsString.split("|");
  }

  const extractedInstructions = stringToInstructions(item.instructions);

  console.log(item);
  // console.log("Ingredients: ", item.ingredients);
  // console.log(
  //   "Ingredients stringified:",
  //   JSON.stringify(item.ingredients, null, 2)
  // );
  console.log("Type of : ", typeof item.ingredients);
  try {
    const extractedIngredients = stringToIngredients(item.ingredients);
    console.log("Extracted Ingredients: ", extractedIngredients);
    console.log("Instructions: ", item.instructions);
    console.log("Instruction zero: ", item.instructions[0]);
    console.log("Type of instructions : ", typeof item.instructions);
  } catch (e) {
    console.log("Ingredients format error");
  }

  // console.log(" 1: ", item.ingredients[0]);

  const [encodedPic, setPic] = useState("");
  const [encodedProfilePic, setProfilePic] = useState("");

  useEffect(() => {
    const pic = item.image;
    const profilePic = item.profileImage;

    if (pic) {
      setPic(pic.replace(/ /g, "%20"));
      console.log("Encoded URL:", encodedPic);
    } else {
      console.log("no profile pic");
    }

    if (profilePic) {
      setProfilePic(profilePic.replace(/ /g, "%20"));
      console.log("Encoded URL:", encodedProfilePic);
    } else {
      console.log("no profile pic");
    }
  });

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{item.dishName}</Text>
      </View> */}

      <Image style={styles.mainImage} source={{ uri: encodedPic }} />

      <View style={styles.userInfo}>
        <Image style={styles.userAvatar} source={{ uri: encodedProfilePic }} />
        <Text style={styles.username}>{item.handle}</Text>
      </View>

      <View style={styles.recipeTitle}>
        <Text style={styles.titleText}>{item.title}</Text>
      </View>

      <View style={styles.recipeOverview}>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.infoSection}>
        {/* Yield, Prep, Cook, Estimated Cost */}
        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            {/* <Text style={styles.infoTitle}>YIELD</Text> */}
            <Text style={styles.infoContent}>{item.yield} people</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>PREP</Text>
            <Text style={styles.infoContent}>{item.prepTime} mins</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>COOK</Text>
            {/* <Text style={styles.infoContent}>{item.cookTime} mins</Text> */}
          </View>

          <View style={[styles.infoBlock, { borderRightWidth: 0 }]}>
            <Text style={styles.infoTitle}>EST COST</Text>
            <Text style={styles.infoContent}>${item.cost}</Text>
          </View>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.ingredientsSection}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {extractedIngredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.ingredientText}>
              {ingredient.name} | {ingredient.amount} {ingredient.unit}
            </Text>
          </View>
        ))}
      </View>

      {/* Instructions Section */}
      <View style={styles.instructionsSection}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {extractedInstructions.map((instruction, index) => (
          <View key={index} style={styles.instructionItem}>
            <Text style={styles.stepTitle}>Step {index + 1}:</Text>
            <Text style={styles.instructionText}>{instruction}</Text>
          </View>
        ))}
      </View>

      {/* Footer navigation */}
      <View style={styles.footerNav}>{/* Footer buttons and icons */}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainImage: {
    width: "100%",
    height: 260,
  },
  header: {
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 9999,
  },
  username: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  recipeTitle: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },
  recipeOverview: {
    padding: 16,
  },
  description: {
    fontSize: 13,
    color: "black",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 10,
  },
  infoBlock: {
    flex: 1, // Equal width for each block
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    borderRightWidth: 1, // Add right border for the vertical line
    borderRightColor: "grey", // Color of the vertical line
    paddingHorizontal: 10, // Space between text and border
  },
  infoTitle: {
    color: "#345C50",
    fontSize: 13,
    fontWeight: "600",
  },
  infoContent: {
    color: "#345C50",
    fontSize: 14,
  },
  ingredientsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: "#345C50",
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 13,
    color: "black",
  },
  footerNav: {
    height: 61,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginTop: 16,
  },
  instructionItem: {
    marginBottom: 16,
  },
  stepTitle: {
    color: "#345C50",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 13,
    color: "black",
  },
  // ... additional styles ...
});

export default RecipeScreen;
