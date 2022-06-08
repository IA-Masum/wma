import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useContext } from "react";
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
import { faDollar, faL, faWallet } from "@fortawesome/free-solid-svg-icons";
import colors from "../utils/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import validator from "validator";
import { AuthContext } from "../Contexts/AuthContext";
import FullPageLoader from "../Components/FullPageLoader";

function Register({ navigation }) {
  const { register, loading, showVarify, varifyEmail } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [code, setCode] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const conPasswordRef = useRef();
  const codeRef = useRef();

  const onPressHandler = () => {
    //  Empty Check
    if (!name) {
      Alert.alert("Empty Input", "Name Is Required!");
      nameRef.current.focus();
      return;
    }

    if (!password) {
      Alert.alert("Empty Input", "Password Is Required!");
      passwordRef.current.focus();
      return;
    }
    if (!conPassword) {
      Alert.alert("Empty Input", "Please Confirm Password!");
      conPasswordRef.current.focus();
      return;
    }
    // End Empty Check

    // Valid Chekc
    if (email && !validator.isEmail(email)) {
      Alert.alert("Invalid Input", "Please Enter a Valid Email!");
      emailRef.current.focus();
      return;
    }

    if (password !== conPassword) {
      Alert.alert("Invalid Input", "Passwords Didn't Match!");
      passwordRef.current.focus();
      return;
    }

    if (!agree) {
      Alert.alert(
        "Invalid Input",
        "You Have To Accept Our Terms & Conditions!"
      );
      return;
    }

    register(name, email, password, conPassword);
  };

  const onSendCode = () => {
    if(!code){
      Alert.alert("Empty Input", "Code is Required!");
      codeRef.current.focus();
      return;
    }

    if(code.length < 6){
      Alert.alert("Invalid", "Code is Invalid!");
      codeRef.current.focus();
      return;
    }

    varifyEmail(email, code, resetInputs);
  }

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConPassword("");
    setAgree(false);
    setCode("");
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={[styles.container, styles.horizontal, styles.mainContainer]}
      >
        {loading ? (
          <FullPageLoader />
        ) : (
          <>
            <FontAwesomeIcon icon={faWallet} color={colors.light} size={60} />
            <Text style={styles.textStyle}>Registration</Text>
            <ScrollView style={{ width: "100%" }}>
              {showVarify ? (
                <>
                  <View style={[styles.container, styles.horizontal]}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.labelText}>Code</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={codeRef}
                          value={code}
                          onChangeText={(text) => setCode(text)}
                          style={styles.input}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={onSendCode}
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
                        Varify
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={[styles.container, styles.horizontal]}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.labelText}>Name</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={nameRef}
                          value={name}
                          onChangeText={(text) => setName(text)}
                          style={styles.input}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.labelText}>Email</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={emailRef}
                          value={email}
                          onChangeText={(text) => setEmail(text)}
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
                    <View style={styles.inputGroup}>
                      <Text style={styles.labelText}>Confirm Password</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={conPasswordRef}
                          value={conPassword}
                          onChangeText={(text) => setConPassword(text)}
                          secureTextEntry={true}
                          style={styles.input}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: 320,
                      }}
                    >
                      <View style={styles.inputGroup}>
                        <BouncyCheckbox
                          text="I am Agree With"
                          fillColor={colors.light}
                          onPress={(isChecked) => setAgree(isChecked)}
                        />
                      </View>
                      <Text
                        style={{
                          marginTop: 17,
                          marginLeft: 5,
                          fontSize: 16,
                          color: colors.white,
                          textDecorationLine: "underline",
                        }}
                      >
                        Terms And Contitions.
                      </Text>
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
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

export default Register;

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
