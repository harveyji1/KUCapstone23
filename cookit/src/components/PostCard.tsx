import React from 'react';
import {Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, PostText, RecipeText, IngredientsText, PostImg, InteractionWrapper, Interaction, InteractionText} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PostItemType {
    id: string;
    userName: string;
    userImg: string; 
    postTime: string;
    postText: string;
    postImg: string; 
    liked: boolean;
    likes: number; 
    comments: number;
  }

  const PostCard: React.FC<{ item: PostItemType }> = ({ item }) => {

   var likeIcon = item.liked ? 'heart' : 'heart-outline';
   var likeIconColor = item.liked ? 'red' : '#333'

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

    return(
        <Card>
          <UserInfo>
            <UserImg source = {item.userImg}/>
            <UserInfoText>
            <UserName> {item.userName} </UserName>
            <PostTime> {item.postTime}</PostTime>
            </UserInfoText>
          </UserInfo>
          <PostText>{item.postText}</PostText>
          <PostImg source = {item.postImg}/>
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
        </Card>
    );
}

export default PostCard;