import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";

const NoInternet = () => (
  <View style={[styles.container, styles.horizontal]}>
      <Image source={require("../assets/no-wifi.png")} />
      <Text style={styles.textStyle}>You Are Offline!</Text>
      <Text style={styles.textStyle}>Please Connect To Internet And Refresh.</Text>
  </View>
);

const styles = StyleSheet.create({
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
  },
  textStyle: {
    color: "#fff",
    marginTop: 10,
    fontSize: 18,
    textAlign: "center"
  }

});

export default NoInternet;
