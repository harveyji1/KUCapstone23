import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ProfileScreen } from './src/screens/Profile';
import { LoginPage } from './src/screens/Login';
import { HomeScreen } from './src/screens/Home';
import { RegisterScreen } from './src/screens/Register';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { StyleSheet, View, StatusBar, Button, Text } from 'react-native';
import { SearchScreen } from './src/screens/Search';
import { CreatePostScreen } from './src/screens/CreatePost';
import { SavedRecipiesScreen } from './src/screens/SavedRecipies';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name = "Home" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name = "Search" component={SearchScreen} options={{headerShown: false}}/>
      <Tab.Screen name = "CreatePost" component={CreatePostScreen} options={{headerShown: false}}/>
      <Tab.Screen name = "SavedRecipies" component={SavedRecipiesScreen} options={{headerShown: false}}/>
      <Tab.Screen name = "Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoaded] = useFonts({
    'YoungSerif-Regular': require('./assets/fonts/YoungSerif-Regular.ttf'),

    'SweetSansProRegular': require('./assets/fonts/SweetSansProRegular.otf'),
    'SweetSansProBold': require('./assets/fonts/SweetSansProBold.otf'),
    'SweetSansProLight': require('./assets/fonts/SweetSansProLight.otf'),
    'SweetSansProMedium': require('./assets/fonts/SweetSansProMedium.otf'),

    'Trispace-Bold': require('./assets/fonts/Trispace-Bold.ttf'),
    'Trispace-Regular': require('./assets/fonts/Trispace-Regular.ttf'),
    'Trispace-Light': require('./assets/fonts/Trispace-Light.ttf'),
    'Trispace-Medium': require('./assets/fonts/Trispace-Medium.ttf'),
    'Trispace-ExtraBold': require('./assets/fonts/Trispace-ExtraBold.ttf'),
    'Trispace-SemiBold': require('./assets/fonts/Trispace-SemiBold.ttf'),

    'PlayfairDisplay-Black': require('./assets/fonts/PlayfairDisplay-Black.ttf'),
    'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-ExtraBold': require('./assets/fonts/PlayfairDisplay-ExtraBold.ttf'),
    'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
    'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-SemiBold': require('./assets/fonts/PlayfairDisplay-SemiBold.ttf'),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
    <View style={styles.font} onLayout={handleOnLayout}></View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name = "Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name = "Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Home" component={BottomTabs} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
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
