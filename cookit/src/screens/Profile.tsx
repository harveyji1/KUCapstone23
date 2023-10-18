import * as React from 'react'
import {Text, View, Button } from 'react-native';


type ProfileScreenRouteParams = {
    itemID: string;
    otherParam: string;
  };
  

export function ProfileScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profiles Screen</Text>
      </View>
    );
  }