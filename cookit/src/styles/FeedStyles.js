import styled from 'styled-components'

export const Container = styled.View`
    background-color: #fff;
    flex: 1;
    align-items: center;
    overflow-y: auto;
    width: 100%;
`;

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`; 

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    font-family: 'SweetSansProRegular'
`;

export const PostTime = styled.Text`
    font-size: 12px;
    font-family: 'SweetSansProRegular'
    color: #666;
`;

export const PostText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
    padding: 15px;
`;

export const RecipeText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
`;

export const IngredientsText = styled.Text`
    font-size: 18px;
    font-family: 'SweetSansProRegular'
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-Direction: row;
    justify-content: space-around;
    padding: 15px;
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