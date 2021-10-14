import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "../../screens/initialScreen/InitialScreen.screen";
import Login from "../../screens/login";
import Register from "../../screens/register";
import Home from "../../screens/home";
import firebase from "firebase";
import UserAccount from "../../screens/userAccount";
import MainScreen from "../../screens/mainScreen/MainScreen.screen";
import AddEbookForm from "../../screens/addEbookForm";

const Stack = createStackNavigator();

export default function AplicationNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // eslint-disable-next-line no-shadow
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTintColor: "#FFF",
          headerStyle: { backgroundColor: "#E79A36" },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="UserAccount"
              component={UserAccount}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="AddEbookForm"
              component={AddEbookForm}
              options={{
                headerBackTitle: "Profile",
                headerTitle: "Add Ebook Form",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={InitialScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
