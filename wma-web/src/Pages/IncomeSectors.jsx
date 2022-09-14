import {
  faEdit,
  faPenAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState, useEffect, useContext } from "react";
import { Container, FormGroup, Modal } from "react-bootstrap";
import BottomNav from "../Components/BottomNav";
import FullPageLoader from "../Components/FullPageLoader";
import TopNav from "../Components/TopNav";
import { AuthContext } from "../Contexts/AuthContext";
import { ProfileContext } from "../Contexts/ProfileContext";

function IncomeSectors() {
  const { user, loadUser, setUser } = useContext(AuthContext);
  const { loading, changeName } = useContext(ProfileContext);

  const [showChangeNameModal, setShowChangeNameModal] = useState(false);

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  return (
    <>
      {!user || loading ? (
        <FullPageLoader />
      ) : (
        <>
          <TopNav />
          <div className="page bg-light pt-2">
            <Container>
              <div className="d-flex justify-content-between align-items-center my-1 border rounded p-2">
                <h4 className="mb-0">Income Sectors</h4>
                <button className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center my-1 border rounded p-2">
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                  />
                </div>
              </div>

              <hr />
              <div className="bg-white">
                <p>Hello</p>
              </div>
            </Container>
          </div>
          <BottomNav />
        </>
      )}
    </>
  );
}

export default IncomeSectors;
