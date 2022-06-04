import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDollar, faWallet } from "@fortawesome/free-solid-svg-icons";
import colors from "../utils/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import validator from "validator";

function LogIn({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+880");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const conPasswordRef = useRef();

  const onPressHandler = () => {

    if (!phone) {
      Alert.alert("Empty Input", "Phone Or Email Is Required!");
      phoneRef.current.focus();
      return;
    }

    if (!password) {
      Alert.alert("Empty Input", "Password Is Required!");
      passwordRef.current.focus();
      return;
    }
    // End Empty Check

    // Valid Chekc
    if (!validator.isMobilePhone(phone) && !validator.isEmail(phone)) {
      Alert.alert("Invalid Input", "Please Enter a Valid Phone Number Or Email!");
      phoneRef.current.focus();
      return;
    }

  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={[styles.container, styles.horizontal, styles.mainContainer, {paddingTop: 100}]}
      >
        <FontAwesomeIcon icon={faWallet} color={colors.light} size={60} />
        <Text style={styles.textStyle}>LogIn</Text>
        <ScrollView style={{ width: "100%" }}>
          <View style={[styles.container, styles.horizontal]}>
            <View style={styles.inputGroup}>
              <Text style={styles.labelText}>Phone Or Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={phoneRef}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.labelText}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={passwordRef}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={onPressHandler}
              style={[
                styles.btn,
                { marginTop: 30, backgroundColor: colors.light },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.white,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                LogIn
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default LogIn;

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
  },
  textStyle: {
    color: colors.white,
    marginTop: 30,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  btn: {
    padding: 15,
    alignItems: "center",
    width: 320,
    marginTop: 20,
    borderRadius: 15,
  },
  inputContainer: {
    backgroundColor: "#866C95",
    width: 320,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    height: 55,
    justifyContent: "center",
  },
  labelText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  inputGroup: {
    marginTop: 15,
  },
  input: {
    fontSize: 18,
    color: colors.white,
  },
});
