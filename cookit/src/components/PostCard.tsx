/*
Purpose: This file is the post component
Author: Harvey Ji
Editors: 
*/

//imports
import React from 'react';
import {Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, DescriptionText, RecipeText, IngredientsText, PostImg, InteractionWrapper, Interaction, InteractionText, DishNameText, IngredientsWrapper, IngredientsWord, InstructionsWrapper, InstructionsWord, InstructionsText} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';


//type for the PostItemType that is passed in to each Post component
type PostItemType = {
    id: string;
    userName: string;
    userImg: string; 
    postTime: string;
    description: string;
    postImg: string; 
    liked: boolean;
    likes: number; 
    comments: number;
    prepTime: number;
    estimatedCost: number;
    ingredients: string[];
    instructions: string[];
    dishName: string;
  }


 
  const PostCard: React.FC<{ item: PostItemType }> = ({ item }) => {

   var likeIcon = item.liked ? 'heart' : 'heart-outline';
   var likeIconColor = item.liked ? 'red' : '#333'

//some minor logic to determine the appearance of each card
    if(item.likes==1){
        var likeText = '1 like';
    } else if (item.likes > 1) {
        var likeText = item.likes + ' Likes';
    } else{
        var likeText = 'Like'
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
          <PostImg source = {item.postImg}/>
          <DishNameText> {item.dishName} </DishNameText>
          <UserInfo>
            <UserImg source = {item.userImg}/>
            <UserInfoText>
            <UserName> {item.userName} </UserName>
            <PostTime> {item.postTime}</PostTime>
            </UserInfoText>
          </UserInfo>
          <DescriptionText>Description: {item.description}</DescriptionText>
          <InteractionWrapper>
            <Interaction active = {item.liked}>
              <Ionicons name = {likeIcon} size = {25} color = {likeIconColor}></Ionicons>
              <InteractionText>{likeText}</InteractionText>
            </Interaction>
            <Interaction>
              <Ionicons name = "md-chatbubble-outline" size = {25}></Ionicons>
              <InteractionText>{commentText}</InteractionText>
            </Interaction>
          </InteractionWrapper>
          <IngredientsWrapper>
          <IngredientsWord>Ingredients:</IngredientsWord>
      {item.ingredients.map((ingredient, index) => (
        <IngredientsText key={index}>- {ingredient}</IngredientsText>
      ))}
          </IngredientsWrapper>
        <InstructionsWrapper>
        <InstructionsWord>Instructions:</InstructionsWord>
      {item.instructions.map((instruction, index) => (
        <InstructionsText key={index}>Step {index + 1}: {instruction}</InstructionsText>
      ))}
        </InstructionsWrapper>
        </Card>
    );
}

//default export stmt

export default PostCard;