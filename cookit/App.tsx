import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from './src/screens/Profile';
import { LoginPage } from './src/screens/Login';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

function HomeScreen({navigation}){
  return (
    <View style={styles.container} >
      <Text style={styles.text}>Cookit Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          itemID: 4,
          otherParam: "Tony Czajka"
        })}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// function DetailsScreen({route, navigation}) {
//   const { itemID, otherParam } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Text>Item ID: {JSON.stringify(itemID)}</Text>
//       <Text>Name: {otherParam}</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.push('Details')}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

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
  <><View style={styles.font} onLayout={handleOnLayout}></View>
  <NavigationContainer>{<Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginPage} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Overview' }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{ itemID: 0, otherParam: 'nothing' }} />
    </Stack.Navigator>}</NavigationContainer>
    </>
    
  );
}
{/* <NavigationContainer>{
  <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen
    name="Login"
    component={LoginPage}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Overview' }}
    />
    <Stack.Screen 
      name="Details" 
      component={DetailsScreen}
      initialParams={{itemID: 0, otherParam: 'nothing'}}
      />
  </Stack.Navigator>
  
}</NavigationContainer> */}
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


// import * as React from 'react';
// import { Text, TextInput, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen({ navigation, route }) {
//   React.useEffect(() => {
//     if (route.params?.post) {
//       // Post updated, do something with `route.params.post`
//       // For example, send the post to the server
//     }
//   }, [route.params?.post]);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Create post"
//         onPress={() => navigation.navigate('CreatePost')}
//       />
//       <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
//     </View>
//   );
// }

// function CreatePostScreen({ navigation, route }) {
//   const [postText, setPostText] = React.useState('');

//   return (
//     <>
//       <TextInput
//         multiline
//         placeholder="What's on your mind?"
//         style={{ height: 200, padding: 10, backgroundColor: 'white' }}
//         value={postText}
//         onChangeText={setPostText}
//       />
//       <Button
//         title="Done"
//         onPress={() => {
//           // Pass and merge params back to home screen
//           navigation.navigate({
//             name: 'Home',
//             params: { post: postText },
//             merge: true,
//           });
//         }}
//       />
//     </>
//   );
// }

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator mode="modal">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="CreatePost" component={CreatePostScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
