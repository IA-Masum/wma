
import { ToastContainer } from 'react-toastify';
import AppProviders from "./AppProviders";
import { getToken } from "./config";

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/CSS/common.css";

getToken();

function App() {
  return (
    
    <>
      <AppProviders/>
      <ToastContainer autoClose={2500} position="top-center" />
    </>
  );
}

export default App;
