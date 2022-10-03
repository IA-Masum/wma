import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const IncomeContext = React.createContext();

export const IncomeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const loadIncomes = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/income-history`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setIncomes(data);
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

  const addIncome = (income, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add-income`, income)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setIncomes((prev) => [data.income, ...prev]);
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

  const deleteIncome = (id, callback) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/delete-income/${id}`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setIncomes((prev) => prev.filter((inc) => inc.id !== data.income.id));
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
    <IncomeContext.Provider
      value={{ loading, incomes, loadIncomes, addIncome, deleteIncome }}
    >
      {children}
    </IncomeContext.Provider>
  );
};
