import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import LogIn from "../Screens/Login";
import NoInternet from "../Screens/NoInternet";
import Register from "../Screens/Register";
import Welcome from "../Screens/Welcome";
import { AuthContext } from "../Contexts/AuthContext";
import VarifyEmail from "../Screens/VarifyEmail";
const Stack = createNativeStackNavigator();

function Navigation() {
  const { userInfo } = useContext(AuthContext);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {userInfo ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
            <>
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
                name="VarifyEmail"
                component={VarifyEmail}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Navigation;
