import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "./src/screens/Profile";
import { LoginPage } from "./src/screens/Login";
import { HomeScreen } from "./src/screens/Home";
import { RegisterScreen } from "./src/screens/Register";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StyleSheet, View, StatusBar, Button, Text } from "react-native";
import { SearchScreen } from "./src/screens/Search";
import { CreatePostScreen } from "./src/screens/CreatePost";
import { SavedRecipiesScreen } from "./src/screens/SavedRecipies";
import { Octicons } from "@expo/vector-icons";
import { InstructionsScreen } from "./src/screens/PostScreens/Instructions";
import { IngredientsScreen } from "./src/screens/PostScreens/Ingredients";
import { ReviewPostScreen } from "./src/screens/PostScreens/ReviewPost";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#345C50",
        tabBarInactiveTintColor: "#667B68",
        tabBarStyle: {
          backgroundColor: "#E5D3B3",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons
              name="home"
              size={size}
              color={color}
              style={styles.centeredIcon}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons
              name="search"
              size={size}
              color={color}
              style={styles.centeredIcon}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons
              name="plus-circle"
              size={size}
              color={color}
              style={styles.centeredIcon}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="SavedRecipies"
        component={SavedRecipiesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons
              name="bookmark"
              size={size}
              color={color}
              style={styles.centeredIcon}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons
              name="person"
              size={size}
              color={color}
              style={styles.centeredIcon}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

function CreatePostStack() {
  return (
    <Stack.Navigator>
      <Stack2.Screen name="CreatePost" component={CreatePostScreen} options={{headerShown: false}} />
      <Stack2.Screen name="Ingredients" component={IngredientsScreen} options={{headerShown: false}} />
      <Stack2.Screen name="Instructions" component={InstructionsScreen} options={{headerShown: false}} />
      <Stack2.Screen name="Review" component={ReviewPostScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoaded] = useFonts({
    "YoungSerif-Regular": require("./assets/fonts/YoungSerif-Regular.ttf"),

    SweetSansProRegular: require("./assets/fonts/SweetSansProRegular.otf"),
    SweetSansProBold: require("./assets/fonts/SweetSansProBold.otf"),
    SweetSansProLight: require("./assets/fonts/SweetSansProLight.otf"),
    SweetSansProMedium: require("./assets/fonts/SweetSansProMedium.otf"),

    "Trispace-Bold": require("./assets/fonts/Trispace-Bold.ttf"),
    "Trispace-Regular": require("./assets/fonts/Trispace-Regular.ttf"),
    "Trispace-Light": require("./assets/fonts/Trispace-Light.ttf"),
    "Trispace-Medium": require("./assets/fonts/Trispace-Medium.ttf"),
    "Trispace-ExtraBold": require("./assets/fonts/Trispace-ExtraBold.ttf"),
    "Trispace-SemiBold": require("./assets/fonts/Trispace-SemiBold.ttf"),

    "PlayfairDisplay-Black": require("./assets/fonts/PlayfairDisplay-Black.ttf"),
    "PlayfairDisplay-Bold": require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
    "PlayfairDisplay-ExtraBold": require("./assets/fonts/PlayfairDisplay-ExtraBold.ttf"),
    "PlayfairDisplay-Medium": require("./assets/fonts/PlayfairDisplay-Medium.ttf"),
    "PlayfairDisplay-Regular": require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
    "PlayfairDisplay-SemiBold": require("./assets/fonts/PlayfairDisplay-SemiBold.ttf"),

    "Quando-Regular": require("./assets/fonts/Quando-Regular.ttf"),
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
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{
              title: "CookIt",
              headerStyle: {
                backgroundColor: "#E5D3B3",
              },
              headerTintColor: "#345C50",
              headerTitleStyle: {
                fontFamily: "Quando-Regular",
                fontSize: 20,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EEEBD3',
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // color: '#437c90'
  },
  font: {
    // fontFamily: 'SweetSansProRegular',
  },
  centeredIcon: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
