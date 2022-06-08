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
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import colors from "../utils/colors";
import validator from "validator";
import { AuthContext } from "../Contexts/AuthContext";
import FullPageLoader from "../Components/FullPageLoader";

function VarifyEmail({ navigation }) {
  const { resendCode, varifyEmail, loading } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [codeSent, setCodeSent] = useState(false);

  const emailRef = useRef();
  const codeRef = useRef();

  const onGetCodeHandler = () => {
    if (!email) {
      Alert.alert("Empty Input", "Email Is Required!");
      emailRef.current.focus();
      return;
    }

    // Valid Chekc
    if (!validator.isEmail(email)) {
      Alert.alert(
        "Invalid Input",
        "Please Enter a Valid Phone Number Or Email!"
      );
      emailRef.current.focus();
      return;
    }

    resendCode(email, () => setCodeSent(true));
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
    setEmail("");
    setCode("");
    setCodeSent(false);
  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={[
          styles.container,
          styles.horizontal,
          styles.mainContainer,
          { paddingTop: 100 },
        ]}
      >
        {loading ? (
          <FullPageLoader />
        ) : (
          <>
            <FontAwesomeIcon icon={faWallet} color={colors.light} size={60} />
            <Text style={styles.textStyle}>Varify Email</Text>
            <ScrollView style={{ width: "100%" }}>
              {codeSent ? (
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

                    <TouchableOpacity
                      onPress={onGetCodeHandler}
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
                        }}
                      >
                        Send Code
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

export default VarifyEmail;

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
