import * as React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export function HomeScreen({navigation}){
    return (
      <View style={styles.container} >
        <Text style={styles.text}>Cookit Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile', {
            itemID: 4,
            otherParam: "Tony Czajka"
          })}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#EEEBD3',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    text: {
      // color: '#437c90'
    },
    font: {
      // fontFamily: 'SweetSansProRegular',
    }
  });