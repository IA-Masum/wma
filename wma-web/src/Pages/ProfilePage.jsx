import { faEdit, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";
import { useContext } from "react";
import { Container, Modal } from "react-bootstrap";
import BottomNav from "../Components/BottomNav";
import FullPageLoader from "../Components/FullPageLoader";
import TopNav from "../Components/TopNav";
import { AuthContext } from "../Contexts/AuthContext";

function ProfilePage() {
  const { user, changeName, changeEmail } = useContext(AuthContext);
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);
  return (
    <>
      {!user ? (
        <FullPageLoader />
      ) : (
        <>
          <TopNav />
          <div className="page bg-light pt-2">
            <Container>
              <div className="border rounded shadow-sm p-3">
                <span>
                  Name: <strong>{user.name}</strong>
                </span>
                <br />
                <span>Email: </span>
                <a href={`mailto:${user.email}`}>{user.email}</a>
                <br />
                <span>
                  User From: {moment(user.created_at).format("D MMM, y")}
                </span>
                <div className="mt-4">
                  <button onClick={() => setShowChangeNameModal(true)} className="wma-btn wma-btn-dark wma-btn-sm">
                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Name
                  </button>
                  <button className="wma-btn wma-btn-dark wma-btn-sm">
                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Email
                  </button>
                  <button className="wma-btn wma-btn-dark wma-btn-sm">
                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Passowrd
                  </button>
                </div>
              </div>
            </Container>
          </div>
          <BottomNav />
          <ChangeNameModal show={showChangeNameModal} />
        </>
      )}
    </>
  );
}

export default ProfilePage;

function ChangeNameModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button>Save</button>
      </Modal.Footer>
    </Modal>
  );
}
