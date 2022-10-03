import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const LoanSectorContext = React.createContext();

export const LoanSectorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loanSectors, setLoanSectors] = useState([]);

  const loadLoanSectors = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/show-all-loan-sectors`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setLoanSectors(data);
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

  const addLoanSector = (name, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add-loan-sector`, { name })
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setLoanSectors((prev) => [...prev, data]);
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

  const editLoanSector = (id, name,  callback) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/update-loan-sector/${id}`, {name})
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          let oldData = [...loanSectors];
          let index = oldData.findIndex((s) => s.id === data.id);
          oldData[index] = data;

          setLoanSectors(oldData);
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
  const deleteLoanSector = (id, callback) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/delete-loan-sector/${id}`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setLoanSectors((prev) => prev.filter((se) => se.id !== data.id));
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
    <LoanSectorContext.Provider
      value={{
        loading,
        loanSectors,
        loadLoanSectors,
        addLoanSector,
        deleteLoanSector,
        editLoanSector,
      }}
    >
      {children}
    </LoanSectorContext.Provider>
  );
};
