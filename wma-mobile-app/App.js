import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import NoInternet from "./Screens/NoInternet";
import Register from "./Screens/Register";
import LogIn from "./Screens/Login";
import Home from "./Screens/Home";
import { AuthProvider } from "./Contexts/AuthContext";

const Stack = createNativeStackNavigator();

const App = () => (
  <>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
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
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  </>
);

export default App;
