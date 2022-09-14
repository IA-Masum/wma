import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const ProfileContext = React.createContext();

export const ProfileProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const changeName = (data, callback) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/change-name`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          callback(data);
        } else {
          toast.error(message);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Server Error!");
        setLoading(false);
        console.log(err);
      });
  };

  const changeEmail = (data, callback) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/change-email`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          callback(data);
        } else {
          toast.error(message);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Server Error!");
        setLoading(false);
        console.log(err);
      });
  };

  const changePassword = (data, callback) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/change-password`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          callback(data);
        } else {
          toast.error(message);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Server Error!");
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <ProfileContext.Provider value={{ changeName,changeEmail, changePassword, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};
