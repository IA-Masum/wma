import { faCircleDollarToSlot, faFilterCircleDollar, faHandHoldingDollar, faHomeAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/CSS/bottomNav.css";
function BottomNav() {
  return (
    <div className="bottom-nav">
      <a href="#" className="bottom-link active">
        <FontAwesomeIcon icon={faHomeAlt} />
      </a>
      <a href="#" className="bottom-link">
        <FontAwesomeIcon icon={faHandHoldingDollar} />
      </a>
      <a href="#" className="bottom-link">
        <FontAwesomeIcon icon={faPlusCircle} />
      </a>
      <a href="#" className="bottom-link">
        <FontAwesomeIcon icon={faFilterCircleDollar} />
      </a>
      <a href="#" className="bottom-link">
        <FontAwesomeIcon icon={faCircleDollarToSlot} />
      </a>
    </div>
  );
}

export default BottomNav;
