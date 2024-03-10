/*
Purpose: This file is the recipe card component
Author: Harvey Ji
Editors: Audrey Pino
*/

//imports
import React, { useState } from 'react';
import {Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, DescriptionText, RecipeText, IngredientsText, PostImg, InteractionWrapper, Interaction, InteractionText, DishNameText, IngredientsWrapper, IngredientsWord, InstructionsWrapper, InstructionsWord, InstructionsText, Divider, PostDivider, GroupedInteraction, FollowButton, FollowButtonText, FilterPill, FiltersWrapper} from '../../styles/FeedStyles';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  SavedReactionIcon,
  SavedReactionOutlineIcon,
  UpReactionIcon,
  DownReactionIcon,
  UpReactionOutlineIcon,
  DownReactionOutlineIcon,
  CommentReactionIcon,
} from '../../../assets/reaction-icons';


//type for the RecipeItemType that is passed in to each Post component
export type RecipeItemType = {
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
    filters: string[];
  }

  //RecipeCard component
  const RecipeCard: React.FC<{ item: RecipeItemType }> = ({ item }) => {

    const navigation = useNavigation(); // Initialize navigation

    const handleCardPress = () => {
        // Navigate to the expanded recipe screen passing item as route params
        navigation.navigate('RecipeExpanded', { item });
    };
    
    // Set the icons for the upvote, downvote, and save buttons
    var upvotedIcon = item.upvoted ? <UpReactionIcon/> : <UpReactionOutlineIcon/>;
    var downvotedIcon = item.downvoted ? <DownReactionIcon/> : <DownReactionOutlineIcon/>;
    var saveIcon = item.saved ? <SavedReactionIcon/> : <SavedReactionOutlineIcon/>;
    var IconColor = '#345C50'; // Set color
    
    const handleFollowPress = () => {
      // Logic to follow the user
    };

    // Map the ingredients to a list of text components
    const filterPills = item.filters.map((filter, index) => (
      <FilterPill key={index}>
        {filter}
      </FilterPill>
    ));

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
        <TouchableOpacity onPress={handleCardPress} activeOpacity={1.0}>
          <PostDivider />
          <PostImg source={item.postImg}/>
          <UserInfo>
            <UserImg source={item.userImg}/>
            <UserName>{item.userName}</UserName>
            <PostTime>{item.postTime}</PostTime>
            <FollowButton onPress={handleFollowPress}>
              <FollowButtonText>+ Follow</FollowButtonText>
            </FollowButton>
          </UserInfo>
          <DishNameText> {item.dishName} </DishNameText>
          <DescriptionText>{item.description}</DescriptionText>
          <FiltersWrapper>
            {filterPills}
          </FiltersWrapper>
          <Divider />
          <InteractionWrapper>
            <GroupedInteraction>
              <Interaction active={item.upvoted}>
                {upvotedIcon}
                <InteractionText>{upvoteText}</InteractionText>
              </Interaction>
              <Interaction active={item.downvoted}>
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
              <Interaction active={item.saved}>
                {saveIcon}
                <InteractionText>{saveText}</InteractionText>
              </Interaction>
            </GroupedInteraction>
          </InteractionWrapper>
        </TouchableOpacity>
      </Card>
  );
}

//default export stmt

export default RecipeCard;