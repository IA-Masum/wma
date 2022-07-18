import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import FullPageLoader from "../Components/FullPageLoader";
import { AuthContext } from "../Contexts/AuthContext";

function Login() {
  const { loading, login } = useContext(AuthContext);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const loginHander = () => {
    login(email, password, resetForm);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div className="wma-container-full wma-color-white wma-bg-dark">
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <FontAwesomeIcon icon={faWallet} style={{ fontSize: "3rem" }} />
          <h2 className="wma-my-20">Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="wma-btn wma-btn-light" onClick={loginHander}>
            LOG IN
          </button>
          <div className="wma-mt-20">
            New to Wallent Manager? Please <a href="#">Register</a>.
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
