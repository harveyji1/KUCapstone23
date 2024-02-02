/*
Purpose: This file is the recipe card component
Author: Harvey Ji
Editors: 
*/

//imports
import React, { useState } from 'react';
import {Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, DescriptionText, RecipeText, IngredientsText, PostImg, InteractionWrapper, Interaction, InteractionText, DishNameText, IngredientsWrapper, IngredientsWord, InstructionsWrapper, InstructionsWord, InstructionsText} from '../../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';


//type for the RecipeItemType that is passed in to each Post component
type RecipeItemType = {
    id: string;
    userName: string;
    userImg: string; 
    postTime: string;
    description: string;
    postImg: string; 
    upvoted: boolean;
    downvoted: boolean;
    upvotes: number; 
    downvotes: number;
    saved: boolean;
    saves: number;
    comments: number;
    prepTime: number;
    estimatedCost: number;
    ingredients: string[];
    instructions: string[];
    dishName: string;
    yield: number;
    cookTime: number;
    estCost: number;
  }


 
  const RecipeCard: React.FC<{ item: RecipeItemType }> = ({ item }) => {

    const navigation = useNavigation(); // Initialize navigation

    const handleCardPress = () => {
        // Navigate to the expanded recipe screen passing item as route params
        navigation.navigate('RecipeExpanded', { item });
    };
  
   var upvotedIcon = item.upvoted ? 'arrow-up-circle' : 'arrow-up-circle-outline';
   var upvotedIconColor = item.upvoted ? 'black' : '#333'
   var downvotedIcon = item.downvoted ? 'arrow-down-circle' : 'arrow-down-circle-outline';
   var downvotedIconColor = item.downvoted ? 'black' : '#333'
   var saveIcon = item.saved ? 'bookmark-outline' : 'bookmark'
   var saveIconColor = item.saved ? 'black' : '#333'

//some minor logic to determine the appearance of each card
    var upvoteText;
    if (item.upvotes <= 9999) {
        upvoteText = item.upvotes <= 999 ? item.upvotes : (item.upvotes / 1000).toFixed(1) + 'k';
    } else {
        upvoteText = Math.floor(item.upvotes / 1000) + 'k';
    }

    var downvoteText;
    if (item.downvotes <= 9999) {
        downvoteText = item.downvotes <= 999 ? item.downvotes : (item.downvotes / 1000).toFixed(1) + 'k';
    } else {
      downvoteText = Math.floor(item.downvotes / 1000) + 'k';
    }

    var saveText;
    if (item.saves <= 9999) {
      saveText = item.saves <= 999 ? item.saves : (item.saves / 1000).toFixed(1) + 'k';
    } else {
      saveText = Math.floor(item.saves / 1000) + 'k';
    }

    if(item.comments==1){
        var commentText = '1 Comment';
    } else if (item.comments > 1) {
        var commentText = item.comments + ' Comments';
    } else{
        var commentText = 'Comment'
    }


    //returns the actual card
    return(
        <Card>
          <TouchableOpacity onPress={handleCardPress}>
          {/* The basic top part of the post such as the image, dish name, user info, and description */}

          <PostImg source = {item.postImg}/>

          <UserInfo>
            <UserImg source = {item.userImg}/>
            <UserName> {item.userName} </UserName>
            <PostTime> {item.postTime}</PostTime>
          </UserInfo>
          <DishNameText> {item.dishName} </DishNameText>
          <DescriptionText>{item.description}</DescriptionText>

          {/* This is imcomplete, but this is the interaction with the posts. It needs to be connected with the backend to be complete */}

          <InteractionWrapper>
            <Interaction active = {item.upvoted}>
              <Ionicons name = {upvotedIcon} size = {25} color = {upvotedIconColor}></Ionicons>
              <InteractionText>{upvoteText}</InteractionText>
            </Interaction>
            <Interaction active = {item.downvoted}>
              <Ionicons name = {downvotedIcon} size = {25} color = {downvotedIconColor}></Ionicons>
              <InteractionText>{downvoteText}</InteractionText>
            </Interaction>
            <Interaction>
              <Ionicons name = "md-chatbubble-outline" size = {25}></Ionicons>
              <InteractionText>{commentText}</InteractionText>
            </Interaction>
            <Interaction active = {item.saved}>
              <Ionicons name = {saveIcon} size = {25} color = {saveIconColor}></Ionicons>
              <InteractionText>{saveText}</InteractionText>
            </Interaction>
          </InteractionWrapper>
          </TouchableOpacity>
        </Card>
    );
}

//default export stmt

export default RecipeCard;