import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { useCallback } from "react/cjs/react.production.min";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVarify, setShowVarify] = useState(false);

  const register = (name, email, password, password_confirmation) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((res) => {
        let { status, message } = res.data;
        setLoading(false);
        if (status) {
          setShowVarify(true);
          Alert.alert("Success!", message);
        } else {
          Alert.alert("Error!", message);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error!", "Server Error!");
      });
  };

  const varifyEmail = (email, code, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/varify-email`, { email, code })
      .then((res) => {
        setLoading(false);
        let { status, message, data } = res.data;
        if (status) {
          let { user, access_token } = data;
          setShowVarify(false);
          callback();
          setUserInfo(user);
          AsyncStorage.setItem("userInfo", JSON.stringify(user));

          Alert.alert("Success", message);
        } else {
          Alert.alert("Error!", message);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error!", "Server Error!");
        console.log(err);
      });
  };

  const login = (email, password, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, { email, password })
      .then((res) => {
        let { status, message, data } = res.data;
        setLoading(false);
        if (status) {
          callback();
          setUserInfo(data.user);
          AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
          Alert.alert("Success!", message);
        } else {
          Alert.alert("Error!", message);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error!", "Server Error!");
      });
  };

  const resendCode = (email, callback) => {
    setLoading(true);

    axios.post(`${BASE_URL}/resend-code`, {email}).then(res => {
      let {status, message} = res.data;
      setLoading(false);
      if(status){
        callback();
        Alert.alert('Success!', message);
      }else{
        Alert.alert('Error!', message);
      }
    }).catch(e => {
      setLoading(false);
      Alert.alert('Error!', "Server Error!");
    })
  }

  return (
    <AuthContext.Provider
      value={{ register, varifyEmail, resendCode ,login, userInfo, showVarify, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
