import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";


function Home() {

  const onPressHandler = () => {

  };

  return (
    <>
      <StatusBar style="light" />
      <View
        style={[styles.container, styles.horizontal, styles.mainContainer]}
      >
        <View style={styles.balanceContainer}>
          <Text>your balance</Text>
          <Text>200</Text>
        </View>
        
       
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 200,
    backgroundColor: 'red'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
  },
  balanceContainer:{
    backgroundColor: 'red'  
  }
});
