import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export const ExpenceSectorContext = React.createContext();

export const ExpenceSectorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [expenceSectors, setExpenceSectors] = useState([]);

  const loadExpenceSectors = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/show-all-expence-sectors`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          setExpenceSectors(data);
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

  const addExpenceSector = (name, callback) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add-expence-sector`, { name })
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setExpenceSectors((prev) => [...prev, data]);
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

  const editExpenceSector = (id, name,  callback) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/update-expence-sector/${id}`, {name})
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          let oldData = [...expenceSectors];
          let index = oldData.findIndex((s) => s.id === data.id);
          oldData[index] = data;

          setExpenceSectors(oldData);
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
  const deleteExpenceSector = (id, callback) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/delete-expence-sector/${id}`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          toast.success(message);
          setExpenceSectors((prev) => prev.filter((se) => se.id !== data.id));
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
    <ExpenceSectorContext.Provider
      value={{
        loading,
        expenceSectors,
        loadExpenceSectors,
        addExpenceSector,
        deleteExpenceSector,
        editExpenceSector,
      }}
    >
      {children}
    </ExpenceSectorContext.Provider>
  );
};
