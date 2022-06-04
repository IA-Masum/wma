import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import NoInternet from "./Screens/NoInternet";
import FullPageLoader from "./Components/FullPageLoader";
import Register from "./Screens/Register";
import LogIn from "./Screens/Login";

const Stack = createNativeStackNavigator();

const App = () => (
  <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Welcome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="NoInternet"
          component={NoInternet}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LogIn"
          component={LogIn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default App;
