import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
} from "react-native";


function Home({ navigation }) {

  const onPressHandler = () => {

  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={[styles.container, styles.horizontal, styles.mainContainer]}
      >
        
       
      </SafeAreaView>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2E0249",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  }
});
