import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import colors from "../utils/colors";
import { useState } from "react";
import FullPageLoader from "../Components/FullPageLoader";

const Welcome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 1000);
  return (
    <>
      <StatusBar style="light" />
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <View style={[styles.container, styles.horizontal]}>
            <FontAwesomeIcon icon={faWallet} color={colors.light} size={80} />
            <Text style={styles.textStyle}>Wallet Manager</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={[
                styles.btn,
                { marginTop: 100, backgroundColor: colors.light },
              ]}
            >
              <Text style={{ fontSize: 20, color: colors.white, textTransform: "uppercase" }}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("LogIn")}
              style={[styles.btn, { backgroundColor: colors.light2 }]}
            >
              <Text style={{ fontSize: 20, color: colors.white , textTransform: "uppercase"}}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("VarifyEmail")}
              style={[styles.btn, { backgroundColor: colors.dark2 }]}
            >
              <Text style={{ fontSize: 20, color: colors.white, textTransform: "uppercase" }}>Varify Email</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

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
    color: colors.white,
    marginTop: 30,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  btn: {
    padding: 15,
    alignItems: "center",
    width: 300,
    marginTop: 20,
    borderRadius: 15,
  },
});

export default Welcome;
