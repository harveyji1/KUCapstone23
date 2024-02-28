/*
  Purpose: Main application file for a React Native app with navigation and splash screen handling.
  Author: Tony Czajka
  Editors: Audrey Pino
*/

// import components, navigation, and custom screens
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
import { GetStartedPage } from "./src/screens/GetStarted";
import { LoginProvider } from "./LoginProvider";
import { EditProfileScreen } from "./src/screens/EditProfile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RecipeScreen from "./src/screens/RecipeScreen";
import {
  HomeIcon,
  HomeOutlineIcon,
  SearchIcon,
  SearchOutlineIcon,
  PostIcon,
  PostOutlineIcon,
  SavedIcon,
  SavedOutlineIcon,
  ProfileIcon,
  ProfileOutlineIcon,
} from "./assets/nav-icons";
import { LoginRegisterToggle } from "./src/screens/LoginRegisterToggle";

// Prevents splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Creating stack navigators for different navigation layers
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const Stack3 = createNativeStackNavigator();

// BottomTabs component: Renders the bottom tab navigation

function BottomTabs() {
  // Setup for the bottom tab navigator with custom styles and icons
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#345C50",
        tabBarInactiveTintColor: "#667B68",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "CookIt",
          headerStyle: {
            backgroundColor: "#345C50",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontFamily: "SweetSansProBold",
            fontSize: 20,
          },
          tabBarIcon: ({ focused }) =>
            focused ? <HomeIcon /> : <HomeOutlineIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "CookIt",
          headerStyle: {
            backgroundColor: "#345C50",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontFamily: "SweetSansProBold",
            fontSize: 20,
          },
          tabBarIcon: ({ focused }) =>
            focused ? <SearchIcon /> : <SearchOutlineIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <PostIcon /> : <PostOutlineIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="SavedRecipies"
        component={SavedRecipiesScreen}
        options={{
          title: "CookIt",
          headerStyle: {
            backgroundColor: "#345C50",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontFamily: "SweetSansProBold",
            fontSize: 20,
          },
          tabBarIcon: ({ focused }) =>
            focused ? <SavedIcon /> : <SavedOutlineIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CreateProfileStack}
        options={{
          headerStyle: { 
            backgroundColor: '#fff', 
            shadowColor: 'transparent',
            elevation: 0,
            height: 50,
          },
          headerTintColor: "#FFF",
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileIcon /> : <ProfileOutlineIcon />,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

// CreatePostStack component: Navigates through the post creation process
function CreatePostStack() {
  // Setup for the stack navigator used in the CreatePost process
  return (
    <Stack.Navigator>
      <Stack2.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Add New Recipe",
          headerStyle:{
            backgroundColor: "#FFF"
          },
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontFamily: "SF-Pro-Display-Semibold",
            fontSize: 18,
          },
          headerBackTitleVisible: false }} 
      /> 
      <Stack2.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          title: "Add Ingredients",
          headerStyle:{
            backgroundColor: "#FFF"
          },
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontFamily: "SF-Pro-Display-Semibold",
            fontSize: 18,
          },
          headerBackTitleVisible: false }} 
      />
      <Stack2.Screen
        name="Instructions"
        component={InstructionsScreen}
        options={{
          title: "Add Instructions",
          headerStyle:{
            backgroundColor: "#FFF"
          },
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontFamily: "SF-Pro-Display-Semibold",
            fontSize: 18,
          },
          headerBackTitleVisible: false }} 
      />
      <Stack2.Screen
        name="Review"
        component={ReviewPostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// CreateProfileStack component: Navigates through the profile editing
function CreateProfileStack() {
  return (
    <Stack.Navigator>
      <Stack3.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack3.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerStyle:{
            backgroundColor: "#FFF"
          },
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontFamily: "SF-Pro-Display-Semibold",
            fontSize: 18,
          },
          headerBackTitleVisible: false }} 
      />
    </Stack.Navigator>
  );
}

// Main App component
export default function App() {
  // Load custom fonts and handle font loading status
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

    "SF-Pro-Display-Black": require("./assets/fonts/SF-Pro-Display-Black.otf"),
    "SF-Pro-Display-BlackItalic": require("./assets/fonts/SF-Pro-Display-BlackItalic.otf"),
    "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SF-Pro-Display-BoldItalic": require("./assets/fonts/SF-Pro-Display-BoldItalic.otf"),
    "SF-Pro-Display-Heavy": require("./assets/fonts/SF-Pro-Display-Heavy.otf"),
    "SF-Pro-Display-HeavyItalic": require("./assets/fonts/SF-Pro-Display-HeavyItalic.otf"),
    "SF-Pro-Display-Light": require("./assets/fonts/SF-Pro-Display-Light.otf"),
    "SF-Pro-Display-LightItalic": require("./assets/fonts/SF-Pro-Display-LightItalic.otf"),
    "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
    "SF-Pro-Display-MediumItalic": require("./assets/fonts/SF-Pro-Display-MediumItalic.otf"),
    "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-RegularItalic": require("./assets/fonts/SF-Pro-Display-RegularItalic.otf"),
    "SF-Pro-Display-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
    "SF-Pro-Display-SemiboldItalic": require("./assets/fonts/SF-Pro-Display-SemiboldItalic.otf"),
    "SF-Pro-Display-Thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Pro-Display-ThinItalic": require("./assets/fonts/SF-Pro-Display-ThinItalic.otf"),
    "SF-Pro-Display-Ultralight": require("./assets/fonts/SF-Pro-Display-Ultralight.otf"),
    "SF-Pro-Display-UltralightItalic": require("./assets/fonts/SF-Pro-Display-UltralightItalic.otf"),
    "SF-Pro-Italic": require("./assets/fonts/SF-Pro-Italic.ttf"),
    "SF-Pro-Rounded-Black": require("./assets/fonts/SF-Pro-Rounded-Black.otf"),
    "SF-Pro-Rounded-Bold": require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "SF-Pro-Rounded-Heavy": require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "SF-Pro-Rounded-Light": require("./assets/fonts/SF-Pro-Rounded-Light.otf"),
    "SF-Pro-Rounded-Medium": require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SF-Pro-Rounded-Regular": require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "SF-Pro-Rounded-Semibold": require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "SF-Pro-Rounded-Thin": require("./assets/fonts/SF-Pro-Rounded-Thin.otf"),
    "SF-Pro-Rounded-Ultralight": require("./assets/fonts/SF-Pro-Rounded-Ultralight.otf"),
    "SF-Pro-Text-Black": require("./assets/fonts/SF-Pro-Text-Black.otf"),
    "SF-Pro-Text-BlackItalic": require("./assets/fonts/SF-Pro-Text-BlackItalic.otf"),
    "SF-Pro-Text-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    "SF-Pro-Text-BoldItalic": require("./assets/fonts/SF-Pro-Text-BoldItalic.otf"),
    "SF-Pro-Text-Heavy": require("./assets/fonts/SF-Pro-Text-Heavy.otf"),
    "SF-Pro-Text-HeavyItalic": require("./assets/fonts/SF-Pro-Text-HeavyItalic.otf"),
    "SF-Pro-Text-Light": require("./assets/fonts/SF-Pro-Text-Light.otf"),
    "SF-Pro-Text-LightItalic": require("./assets/fonts/SF-Pro-Text-LightItalic.otf"),
    "SF-Pro-Text-Medium": require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    "SF-Pro-Text-MediumItalic": require("./assets/fonts/SF-Pro-Text-MediumItalic.otf"),
    "SF-Pro-Text-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    "SF-Pro-Text-RegularItalic": require("./assets/fonts/SF-Pro-Text-RegularItalic.otf"),
    "SF-Pro-Text-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    "SF-Pro-Text-SemiboldItalic": require("./assets/fonts/SF-Pro-Text-SemiboldItalic.otf"),
    "SF-Pro-Text-Thin": require("./assets/fonts/SF-Pro-Text-Thin.otf"),
    "SF-Pro-Text-ThinItalic": require("./assets/fonts/SF-Pro-Text-ThinItalic.otf"),
    "SF-Pro-Text-Ultralight": require("./assets/fonts/SF-Pro-Text-Ultralight.otf"),
    "SF-Pro-Text-UltralightItalic": require("./assets/fonts/SF-Pro-Text-UltralightItalic.otf"),
    "SF-Pro.ttf": require("./assets/fonts/SF-Pro.ttf"),
  });

  // Hide the splash screen once fonts are loaded
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  // Show nothing while fonts are loading
  if (!isLoaded) {
    return null;
  }

  // Main app layout with navigation and initial route setup
  return (
    <>
      <LoginProvider>
        <View style={styles.font} onLayout={handleOnLayout}></View>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="GetStarted">
            <Stack.Screen
              name="GetStarted"
              component={GetStartedPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginRegister"
              component={LoginRegisterToggle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecipeExpanded"
              component={RecipeScreen}
              options={{
                title: "CookIt",
                headerStyle: {
                  backgroundColor: "#345C50",
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontFamily: "SweetSansProBold",
                  fontSize: 20,
                },
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoginProvider>
    </>
  );
}
// StyleSheet for styling components
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
