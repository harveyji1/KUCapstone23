/*
Purpose: This file is the post component
Author: Harvey Ji
Editors: 
*/

//imports
import React, { useState } from 'react';
import {Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, DescriptionText, RecipeText, IngredientsText, PostImg, InteractionWrapper, Interaction, InteractionText, DishNameText, IngredientsWrapper, IngredientsWord, InstructionsWrapper, InstructionsWord, InstructionsText} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native';


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

    //use states to help with collapsible parts of component
      const [ingredientsCollapsed, setIngredientsCollapsed] = useState(true);
      const [instructionsCollapsed, setInstructionsCollapsed] = useState(true);

      const toggleIngredients = () => {
        setIngredientsCollapsed(!ingredientsCollapsed);
      };

      const toggleInstructions = () => {
        setInstructionsCollapsed(!instructionsCollapsed);
      };


    //returns the actual card
    return(
        <Card>

          {/* The basic top part of the post such as the image, dish name, user info, and description */}

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

          {/* This is imcomplete, but this is the interaction with the posts. It needs to be connected with the backend to be complete */}

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

          {/* this code is a little complicated but basically what is happening is that touching any part of the ingredients sections will either
          collapse the section or expand the section. if it is collapsed it will still show the first 3 ingredients */}
          <TouchableOpacity onPress={toggleIngredients} >
            {ingredientsCollapsed?
            <IngredientsWrapper>
              <IngredientsWord>Ingredients: (Touch to expand) </IngredientsWord>
              {item.ingredients.map((ingredient, index) => 
                index < 3 && (
                <IngredientsText key={index}>- {ingredient}</IngredientsText>
              ))}
            </IngredientsWrapper> 
            : <Collapsible collapsed = {ingredientsCollapsed}>
              <IngredientsWrapper>
              <IngredientsWord>Ingredients: (Touch to collapse) </IngredientsWord>
              
                {item.ingredients.map((ingredient, index) => (
                    <IngredientsText key={index}>- {ingredient}</IngredientsText>
                  ))}
              </IngredientsWrapper>
              </Collapsible>}
          </TouchableOpacity>
          
          {/* this does the exact same thing as the ingredients except for with instructions. need to look into the spacing for this
          because it looks bad if the instruction spans multiple lines */}
          <TouchableOpacity onPress={toggleInstructions} >
            {instructionsCollapsed?
            <InstructionsWrapper>
              <InstructionsWord>Instructions: (Touch to expand) </InstructionsWord>
              {item.instructions.map((instructions, index) => 
                index < 3 && (
                <InstructionsText key={index}>- {instructions}</InstructionsText>
              ))}
            </InstructionsWrapper> 
            : <Collapsible collapsed = {instructionsCollapsed}>
              <InstructionsWrapper>
              <InstructionsWord>Instructions: (Touch to collapse) </InstructionsWord>
              
                {item.instructions.map((instructions, index) => (
                    <InstructionsText key={index}>- {instructions}</InstructionsText>
                  ))}
              </InstructionsWrapper>
              </Collapsible>}
          </TouchableOpacity>
        </Card>
    );
}

//default export stmt

export default PostCard;