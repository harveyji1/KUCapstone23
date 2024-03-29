/*
Purpose: This file is the recipe card component
Author: Harvey Ji
Editors: Audrey Pino
*/

//imports
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  DescriptionText,
  RecipeText,
  IngredientsText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  DishNameText,
  IngredientsWrapper,
  IngredientsWord,
  InstructionsWrapper,
  InstructionsWord,
  InstructionsText,
  Divider,
  PostDivider,
  GroupedInteraction,
  FollowButton,
  FollowButtonText,
  FilterPill,
  FiltersWrapper,
} from "../../styles/FeedStyles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SavedReactionIcon,
  SavedReactionOutlineIcon,
  UpReactionIcon,
  DownReactionIcon,
  UpReactionOutlineIcon,
  DownReactionOutlineIcon,
  CommentReactionIcon,
} from "../../../assets/reaction-icons";

// Need to fix saved
// need to fix profile image, currently null
// needs description

//RecipeCard component
const RecipeCard: React.FC<{ post: any }> = ({ post }) => {
  const navigation = useNavigation(); // Initialize navigation

  const handleCardPress = () => {
    // Navigate to the expanded recipe screen passing item as route params
    navigation.navigate("RecipeExpanded", { post });
  };
  console.log("Post from Recipie Card: ", post);
  // Set the icons for the upvote, downvote, and save buttons
  var upvotedIcon = post.isLikedByUser ? (
    <UpReactionIcon />
  ) : (
    <UpReactionOutlineIcon />
  );
  var downvotedIcon = post.isDislikedByUser ? (
    <DownReactionIcon />
  ) : (
    <DownReactionOutlineIcon />
  );
  // var saveIcon = post.saved ? (
  //   <SavedReactionIcon />
  // ) : (
  //   <SavedReactionOutlineIcon />
  // );
  var IconColor = "#345C50"; // Set color

  const handleFollowPress = () => {
    // Logic to follow the user
  };

  // Map the ingredients to a list of text components
  function stringToIngredients(ingredientsString: string) {
    return ingredientsString.split("|").map((ingredient) => {
      const [amount, name, unit] = ingredient.split("~");
      return { amount, name, unit };
    });
  }
  const extractedIngredients = stringToIngredients(post.ingredients);
  const filterPills = extractedIngredients.map((ingredient, index) => (
    <FilterPill key={index}>{ingredient.name}</FilterPill>
  ));

  //some minor logic to determine the appearance of each card
  var upvoteText;
  if (post.numOfLikes <= 9999) {
    upvoteText =
      post.numOfLikes <= 999
        ? post.numOfLikes
        : (post.numOfLikes / 1000).toFixed(1) + "k";
  } else {
    upvoteText = Math.floor(post.numOfLikes / 1000) + "k";
  }

  var downvoteText;
  if (post.numOfDislikes <= 9999) {
    downvoteText =
      post.numOfDislikes <= 999
        ? post.numOfDislikes
        : (post.numOfDislikes / 1000).toFixed(1) + "k";
  } else {
    downvoteText = Math.floor(post.numOfDislikes / 1000) + "k";
  }

  // var saveText;
  // if (post.saves <= 9999) {
  //   saveText =
  //     post.saves <= 999 ? post.saves : (post.saves / 1000).toFixed(1) + "k";
  // } else {
  //   saveText = Math.floor(post.saves / 1000) + "k";
  // }

  if (post.numOfComments == 1) {
    var commentText = "1 Comment";
  } else if (post.numOfComments > 1) {
    var commentText = post.numOfComments + " Comments";
  } else {
    var commentText = "Comment";
  }

  // encode url so that its in the correct format to pull the image
  const [encodedUrl, setEncodedUrl] = useState("");
  useEffect(() => {
    const imageUrl = post.image;
    console.log("original url: ", imageUrl);
    if (imageUrl) {
      setEncodedUrl(imageUrl.replace(/ /g, "%20"));
      console.log("Encoded URL:", encodedUrl);
    } else {
      console.log("no profile pic");
    }
  }, []);

  //returns the actual card
  return (
    <Card>
      <TouchableOpacity onPress={handleCardPress} activeOpacity={1.0}>
        <PostDivider />
        <PostImg source={{ uri: encodedUrl }} />
        <UserInfo>
          <UserImg source={post.userImg} />
          <UserName>{post.handle}</UserName>
          <PostTime>{post.createdAt}</PostTime>
          <FollowButton onPress={handleFollowPress}>
            <FollowButtonText>+ Follow</FollowButtonText>
          </FollowButton>
        </UserInfo>
        <DishNameText> {post.title} </DishNameText>
        <DescriptionText>{post.description}</DescriptionText>
        <FiltersWrapper>{filterPills}</FiltersWrapper>
        <Divider />
        <InteractionWrapper>
          <GroupedInteraction>
            <Interaction active={post.isLikedByUser}>
              {upvotedIcon}
              <InteractionText>{upvoteText}</InteractionText>
            </Interaction>
            <Interaction active={post.isDislikedByUser}>
              {downvotedIcon}
              <InteractionText>{downvoteText}</InteractionText>
            </Interaction>
          </GroupedInteraction>
          <GroupedInteraction>
            <Interaction>
              <CommentReactionIcon />
              <InteractionText>{commentText}</InteractionText>
            </Interaction>
          </GroupedInteraction>
          <GroupedInteraction>
            {/* <Interaction active={post.saved}>
              {saveIcon}
              <InteractionText>{saveText}</InteractionText>
            </Interaction> */}
          </GroupedInteraction>
        </InteractionWrapper>
      </TouchableOpacity>
    </Card>
  );
};

//default export stmt

export default RecipeCard;
