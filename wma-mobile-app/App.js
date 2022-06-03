import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import NoInternet from "./Screens/NoInternet";
import FullPageLoader from "./Components/FullPageLoader";

const Stack = createNativeStackNavigator();

const App = () => (
  <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Welcome} />
        <Stack.Screen options={{headerShown: false}} name="NoInternet" component={NoInternet} />
      </Stack.Navigator>

      {/* <FullPageLoader /> */}
      {/* <NoInternet /> */}
      {/* <Welcome /> */}
    </NavigationContainer>
  </>
);

export default App;
