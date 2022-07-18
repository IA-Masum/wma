import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Register() {
  return (
    <div className="wma-container-full wma-color-white wma-bg-dark">
      <FontAwesomeIcon icon={faWallet} style={{ fontSize: "3rem" }} />
      <h2 className="wma-my-20">REGISTER</h2>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="input-group">
        <label htmlFor="conPassword">Confirm Password</label>
        <input type="password" id="conPassword" />
      </div>
      <button className="wma-btn wma-btn-light">REGISTER</button>
      <div className="wma-mt-20">
        Already Registered? Please <a href="#">Login</a>.
      </div>
    </div>
  );
}

export default Register;
