import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const ExpenceContext = React.createContext();

export const ExpenceProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [expences, setExpences] = useState([]);

  const loadExpences = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/expence-history`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setExpences(data);
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

  const addExpence = (expence, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add-expence`, expence)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setExpences((prev) => [data.expence, ...prev]);
          callback();
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

  const deleteExpence = (id, callback) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/delete-expence/${id}`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setExpences((prev) => prev.filter((inc) => inc.id !== data.expence.id));
          callback();
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
    <ExpenceContext.Provider
      value={{ loading, expences, loadExpences, addExpence, deleteExpence }}
    >
      {children}
    </ExpenceContext.Provider>
  );
};
