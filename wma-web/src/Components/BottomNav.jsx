import { faCircleDollarToSlot, faFilterCircleDollar, faHandHoldingDollar, faHomeAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import "../assets/CSS/bottomNav.css";
function BottomNav() {
  return (
    <div className="bottom-nav">
      <NavLink to="/" className="bottom-link">
        <FontAwesomeIcon icon={faHomeAlt} />
      </NavLink>
      <NavLink to="/ff" className="bottom-link">
        <FontAwesomeIcon icon={faHandHoldingDollar} />
      </NavLink>
      <NavLink to="/df" className="bottom-link">
        <FontAwesomeIcon icon={faPlusCircle} />
      </NavLink>
      <NavLink to="/dd" className="bottom-link">
        <FontAwesomeIcon icon={faFilterCircleDollar} />
      </NavLink>
      <NavLink to="ll" className="bottom-link">
        <FontAwesomeIcon icon={faCircleDollarToSlot} />
      </NavLink>
    </div>
  );
}

export default BottomNav;
