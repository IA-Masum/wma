import { Flip, ToastContainer } from "react-toastify";
import AppProviders from "./AppProviders";
import { getToken } from "./config";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/CSS/common.css";

getToken();

function App() {
  return (
    <>
      <AppProviders />
      <ToastContainer
        autoClose={2000}
        position="bottom-center"
        transition={Flip}
        theme="dark"
      />
    </>
  );
}

export default App;
