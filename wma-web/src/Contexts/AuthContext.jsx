import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, removeToken, setToken } from "../config";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const register = (name, email, passowrd, password_confirmation) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        passowrd,
        password_confirmation,
      })
      .then((res) => {
        let { status, data, message } = res.dara;
        if (status) {
          toast.success(message);
        } else {
          toast.error(message);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Server Error!");
        console.log(err);
        setLoading(false);
      });
  };

  const resendCode = (email) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/resend-code`, { email })
      .then((res) => {
        setLoading(false);
        let { message, status } = res.data;
        if (status) {
          toast.success(message);
        } else {
          toast.error(message);
          navigate("/register");
        }
      })
      .catch((err) => {
        toast.error("Server Error!!");
        console.log(err);
      });
  };

  const login = (email, password, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, { email, password })
      .then((res) => {
        let { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setToken(data.access_token);
          setUser(data.user);
          callback();
          navigate("/");
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

  const loadUser = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/profile`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setUser(data);
        } else {
          toast.error(message);
          removeToken();
          navigate("/login");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 409 ) {
            setLoading(false);
            removeToken();
            navigate("/login");
          }
        } else {
          console.log(err);
          toast.error("Network Error!");
        }
      });
  };

  const logout = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/logout`)
      .then((res) => {
        setLoading(false);
        let { status, message } = res.data;
        if (status) {
          removeToken();
          toast.success(message);
          navigate("login");
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        toast.error("Server Error!!");
        console.log(err);
      });
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        login,
        register,
        loadUser,
        user,
        logout,
        resendCode,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
