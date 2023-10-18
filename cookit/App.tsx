import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './src/screens/Profile';
import { LoginPage } from './src/screens/Login';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { StyleSheet, View, StatusBar, Button, Text } from 'react-native';


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

const Stack = createNativeStackNavigator();
const getIsSignedIn = () => {
  // custom logic
  return false;
};
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
        component={ProfileScreen}
        initialParams={{ itemID: 0, otherParam: 'nothing' }} />
    </Stack.Navigator>}</NavigationContainer>
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
