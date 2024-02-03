/*
  Purpose: This is the Styles page for PostCard aka the feed
  Author:Harvey Ji
  Editors: Audrey Pino
*/
import styled from 'styled-components'

export const Container = styled.View`
    background-color: #fff;
    flex: 1;
    align-items: center;
    overflow-y: auto;
    width: 100%;
`;

export const Card = styled.View`
    background-color: #fff;
    width: 100%;
    margin-bottom: 10px;
`;

export const UserImg = styled.Image`
    width: 25px;
    height: 25px;
    border-radius: 50px;
    border: 1px solid #E5E7EB;
`; 

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'SF-Pro-Text-Medium';
  margin-left: 10px; 
  margin-right: 8px; 
`;

export const PostTime = styled.Text`
  font-size: 13px;
  font-family: 'SF-Pro-Text-Regular';
  color: #666;
  margin-top: 1px;
`;

export const FollowButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 5px 10px;
  border-radius: 15px;
  align-self: center;
  margin-left: auto;
`;

export const FollowButtonText = styled.Text`
  color: #345C50;
  font-size: 14px;
  font-family: 'SF-Pro-Text-Bold';
`;

export const DescriptionText = styled.Text`
    font-size: 13px;
    font-family: 'SF-Pro-Text-Regular'
    padding: 10px 5px 5px 15px;
    color: black;
`;

export const RecipeText = styled.Text`
    font-size: 13px;
    font-family: 'SF-Pro-Text-Regular'
`;

export const DishNameText = styled.Text`
    font-size: 15px;
    font-family: 'SF-Pro-Text-Semibold';
    color: black;
    padding: 10px 5px 0px 10px;
`;

export const PrepTimeText = styled.Text`
    font-size: 18px;
    font-family: 'SF-Pro-Text-Regular'
`;

export const EstimatedCostText = styled.Text`
    font-size: 18px;
    font-family: 'SF-Pro-Text-Regular'
`;

export const InstructionsWrapper = styled.View`
    flex-direction: column;
    margin-left: 10px;
    padding-bottom: 10px;
`;

export const InstructionsWord = styled.Text`
    font-size: 18px;
    font-family: 'SF-Pro-Text-Regular'
    color: #345c50;
    padding-bottom: 5px;
    font-weight: bold;
    margin-left: 10px;
`;

export const InstructionsText = styled.Text`
    font-size: 16px;
    font-family: 'SF-Pro-Text-Regular'
    color: #345c50;
`;

export const IngredientsWrapper = styled.View`
    flex-direction: column;
    margin-left: 10px;
    padding-bottom: 15px;
`;

export const IngredientsWord = styled.Text`
    font-size: 18px;
    font-family: 'SF-Pro-Text-Regular'
    color: #345c50;
    padding-bottom: 5px;
`;

export const IngredientsText = styled.Text`
    font-size: 16px;
    font-family: 'SF-Pro-Text-Regular'
    color: #345c50;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 260px;
`;

export const InteractionWrapper = styled.View`
    flex-Direction: row;
    justify-content: space-around;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    padding: 1px 4px;
    // background-color: ${ props => props.active ? '#2e64e6' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 14px;
    font-family: 'SF-Pro-Text-Regular'
    font-weight: bold;
    color: #111827
    align-self: center;
    margin-left: 5px;
`;

export const Divider = styled.View`
    height: 1px;
    background-color: #F3F4F6;
    margin-vertical: 8px;
`;
export const PostDivider = styled.View`
    height: 4px;
    background-color: #F3F4F6;
`;

export const GroupedInteraction = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #F3F4F6; 
    border-radius: 50px; 
    padding: 2px 5px;
    margin: 4px;
    background-color: transparent; 
`;

export const FiltersWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px 10px;
  align-items: center;
  justify-content: flex-start;
`;

export const FilterPill = styled.Text`
  background-color: #E3F3EE;
  color: #000000;
  height: 29px; 
  font-size: 13px;
  font-family: 'SF-Pro-Text-Regular';
  border-radius: 15px; 
  padding-horizontal: 10px; 
  text-align: center; 
  line-height: 29px; 
  margin: 5px 5px 5px 0; 
  overflow: hidden; 
`;
