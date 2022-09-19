import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const IncomeSectorContext = React.createContext();

export const IncomeSectorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [incomeSectors, setIncomeSectors] = useState([]);

  const loadIncomeSectors = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/show-all-income-sectors`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setIncomeSectors(data);
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

  const addIncomeSector = (name, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add-income-sector`, { name })
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setIncomeSectors((prev) => [...prev, data]);
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

  const editIncomeSector = (id, name,  callback) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/update-income-sector/${id}`, {name})
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          let oldData = [...incomeSectors];
          let index = oldData.findIndex((s) => s.id === data.id);
          oldData[index] = data;

          setIncomeSectors(oldData);
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
  const deleteIncomeSector = (id, callback) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/delete-income-sector/${id}`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setIncomeSectors((prev) => prev.filter((se) => se.id !== data.id));
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
    <IncomeSectorContext.Provider
      value={{
        loading,
        incomeSectors,
        loadIncomeSectors,
        addIncomeSector,
        deleteIncomeSector,
        editIncomeSector,
      }}
    >
      {children}
    </IncomeSectorContext.Provider>
  );
};
