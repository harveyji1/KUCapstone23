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
import axios from "axios";
import { LoginContext } from "../../../LoginProvider";
import { useContext } from "react";

const LOCAL_HOST_NUBMER = "5018";

// Need to fix saved
// need to fix profile image, currently null
// needs description

//RecipeCard component
const RecipeCard: React.FC<{ post: any }> = ({ post }) => {
  const { state } = useContext(LoginContext);
  const loginToken = state;

  const navigation = useNavigation(); // Initialize navigation

  const handleCardPress = () => {
    // Navigate to the expanded recipe screen passing item as route params
    let item = post;
    navigation.navigate("RecipeExpanded", { item });
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
  var saveIcon = post.saved ? (
    <SavedReactionIcon />
  ) : (
    <SavedReactionOutlineIcon />
  );
  var IconColor = "#345C50"; // Set color

  const handleFollowPress = () => {
    // Logic to follow the user
  };

  const handleUpvote = async () => {
    console.log("LOGIN: ", loginToken);
    const action = post.isLikedByUser ? "revertUpvote" : "upvote";
    console.log("ACTION IS: ", action);
    let config = {};
    if (action == "upvote") {
      config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:5018/api/v1.0/upvote?postID=${post.id}`,
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      };
    } else {
      config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `http://localhost:5018/api/v1.0/revertUpvote?postID=${post.id}`,
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      };
    }

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownvote = async () => {
    const action = post.isDislikedByUser ? "revertDownvote" : "downvote";
    console.log("LOGIN: ", loginToken);

    console.log("ACTION IS: ", action);
    let config = {};
    if (action == "downvote") {
      config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:5018/api/v1.0/downvote?postID=${post.id}`,
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      };
    } else {
      config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `http://localhost:5018/api/v1.0/revertDownvote?postID=${post.id}`,
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      };
    }

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (dateString) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${months[monthIndex]} ${day}, ${year}`;
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

  var saveText;
  if(post.save == 0 || post.save == null || post.save == undefined){
    saveText = 0;
  }
  else{
    if (post.saves <= 9999) {
      saveText =
        post.saves <= 999 ? post.saves : (post.saves / 1000).toFixed(1) + "k";
    } else {
      saveText = Math.floor(post.saves / 1000) + "k";
    }
  }

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
          <PostTime>{formatDate(post.createdAt)}</PostTime>
          {/* <FollowButton onPress={handleFollowPress}>
            <FollowButtonText>+ Follow</FollowButtonText>
          </FollowButton> */}
        </UserInfo>
        <DishNameText> {post.title} </DishNameText>
        <DescriptionText>{post.description}</DescriptionText>
        <FiltersWrapper>{filterPills}</FiltersWrapper>
        <Divider />
        <InteractionWrapper>
          <GroupedInteraction>
            <Interaction active={post.isLikedByUser} onPress={handleUpvote}>
              {upvotedIcon}
              <InteractionText>{upvoteText}</InteractionText>
            </Interaction>
            <Interaction
              active={post.isDislikedByUser}
              onPress={handleDownvote}
            >
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
            <Interaction active={post.saved}>
              {saveIcon}
              <InteractionText>{saveText}</InteractionText>
            </Interaction>
          </GroupedInteraction>
        </InteractionWrapper>
      </TouchableOpacity>
    </Card>
  );
};

//default export stmt

export default RecipeCard;
