import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Screens/Home";
import LogIn from "../Screens/Login";
import NoInternet from "../Screens/NoInternet";
import Register from "../Screens/Register";
import Welcome from "../Screens/Welcome";
import { AuthContext } from "../Contexts/AuthContext";
import VarifyEmail from "../Screens/VarifyEmail";
import colors from "../utils/colors";
import HomeHeader from "./Headers/HomeHeader";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Navigation() {
  const { userInfo } = useContext(AuthContext);
  return (
    <>
      <NavigationContainer>
        {userInfo ? (
          
            <Drawer.Navigator
            >
              <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: (props) => (
                    <HomeHeader {...props} name={userInfo.name} />
                  ),
                  headerStyle: {
                    backgroundColor: colors.dark2,
                  },
                }}
              />

              <Drawer.Screen
                name="About"
                component={Home}
                options={{
                  headerTitle: (props) => (
                    <HomeHeader {...props} name={userInfo.name} />
                  ),
                  headerStyle: {
                    backgroundColor: colors.dark2,
                  },
                }}
              />
            </Drawer.Navigator>
          
        ) : (
          
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
              <Stack.Screen
                options={{ headerShown: false }}
                name="VarifyEmail"
                component={VarifyEmail}
              />
            </Stack.Navigator>
          
        )}
      </NavigationContainer>
    </>
  );
}

export default Navigation;
