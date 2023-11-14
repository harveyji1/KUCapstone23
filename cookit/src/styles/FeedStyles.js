/*
  Purpose: This is the Styles page for PostCard aka the feed
  Author:Harvey Ji
  Editors:
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
    background-color: #dde6d5;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
`;

export const UserInfo = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    padding: 5px;
`;

export const UserImg = styled.Image`
    width: 25px;
    height: 25px;
    border-radius: 10px;
`; 

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 12px;
    font-weight: bold;
    font-family: 'SweetSansProRegular'
`;

export const PostTime = styled.Text`
    font-size: 8px;
    font-family: 'SweetSansProRegular'
    color: #666;
`;

export const DescriptionText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
    padding: 10px 15px 5px 15px;
    color: #345c50;
`;

export const RecipeText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
`;

export const DishNameText = styled.Text`
    font-size: 24px;
    font-family: 'SweetSansProRegular';
    text-align: center;
    color: #345c50;
    padding-top: 10px;
`;

export const PrepTimeText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
`;

export const EstimatedCostText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
`;

export const InstructionsWrapper = styled.View`
    flex-direction: column;
    margin-left: 10px;
    padding-bottom: 10px;
`;

export const InstructionsWord = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
    color: #345c50;
    padding-bottom: 5px;
    font-weight: bold;
`;

export const InstructionsText = styled.Text`
    font-size: 16px;
    font-family: 'SweetSansProRegular'
    color: #345c50;
`;

export const IngredientsWrapper = styled.View`
    flex-direction: column;
    margin-left: 10px;
    padding-bottom: 15px;
`;

export const IngredientsWord = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
    color: #345c50;
    padding-bottom: 5px;
`;

export const IngredientsText = styled.Text`
    font-size: 16px;
    font-family: 'SweetSansProRegular'
    color: #345c50;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-Direction: row;
    justify-content: space-around;
    padding: 0px 15px 5px 15px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
    // background-color: ${ props => props.active ? '#2e64e6' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'SweetSansProRegular'
    font-weight: bold;
    color: #333
    margin-left: 5px;
    margin-top: 8px;
`;