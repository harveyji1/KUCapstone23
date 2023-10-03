import * as React from 'react'
import {Text, View, Button } from 'react-native';

export function DetailsScreen({route, navigation}) {
    const { itemID, otherParam } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>Item ID: {JSON.stringify(itemID)}</Text>
        <Text>Name: {otherParam}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details')}
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }