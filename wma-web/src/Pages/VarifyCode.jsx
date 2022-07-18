import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function VarifyCode() {
  return (
    <div className="wma-container-full wma-color-white wma-bg-dark">
      <FontAwesomeIcon icon={faWallet} style={{ fontSize: "3rem" }} />
      <h2 className="wma-my-20">IDENTITY VARIFICATION</h2>
      <div className="input-group">
        <label htmlFor="code">Code</label>
        <input type="text" id="code" />
      </div>
      <button className="wma-btn wma-btn-light">Varify</button>
    </div>
  );
}

export default VarifyCode;
