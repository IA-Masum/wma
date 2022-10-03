import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const LoanContext = React.createContext();

export const LoanProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);

  const loadLoans = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/loan-history`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setLoans(data);
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

  const addLoan = (loan, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add-loan`, loan)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setLoans((prev) => [data.loan, ...prev]);
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

  const deleteLoan = (id, callback) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/delete-loan/${id}`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setLoans((prev) => prev.filter((inc) => inc.id !== data.loan.id));
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
    <LoanContext.Provider
      value={{ loading, loans, loadLoans, addLoan, deleteLoan }}
    >
      {children}
    </LoanContext.Provider>
  );
};
