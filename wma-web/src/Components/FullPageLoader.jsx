import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/CSS/fullpageloader.css";

function FullPageLoader() {
  return (
    <>
      <div className="full-page-loader">
          <FontAwesomeIcon icon={faSpinner} />
      </div>
    </>
  );
}

export default FullPageLoader;
