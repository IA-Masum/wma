import { faEdit, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState, useEffect, useContext } from "react";
import { Container, FormGroup, Modal } from "react-bootstrap";
import BottomNav from "../Components/BottomNav";
import FullPageLoader from "../Components/FullPageLoader";
import TopNav from "../Components/TopNav";
import { AuthContext } from "../Contexts/AuthContext";
import { ProfileContext } from "../Contexts/ProfileContext";

function ProfilePage() {
  const { user, loadUser, setUser } = useContext(AuthContext);
  const { loading, changeName } = useContext(ProfileContext);

  const [showChangeNameModal, setShowChangeNameModal] = useState(false);

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  const changeNameHandler = (data) => {
    changeName(data, (user) => {
      setUser(user);
      setShowChangeNameModal(false);
    });
  };
  return (
    <>
      {!user || loading ? (
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
                  <button
                    onClick={() => setShowChangeNameModal(true)}
                    className="wma-btn wma-btn-dark wma-btn-sm"
                  >
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
          <ChangeNameModal
            show={showChangeNameModal}
            changeNameHandler={changeNameHandler}
            user={user}
            setShowChangeNameModal={setShowChangeNameModal}
          />
        </>
      )}
    </>
  );
}

export default ProfilePage;

function ChangeNameModal({
  show,
  setShowChangeNameModal,
  user,
  changeNameHandler,
}) {
  const [name, setName] = useState(user.name);
  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShowChangeNameModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control mt-2"
            id="name"
            onChange={onChangeHandler}
            value={name}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => changeNameHandler({name})}
          className="btn btn-success w-100"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}
