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
  const { loading, changeName, changeEmail, changePassword } =
    useContext(ProfileContext);

  const [showChangeNameModal, setShowChangeNameModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

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

  const changeEmailHandler = (data) => {
    changeEmail(data, (user) => {
      setUser(user);
      setShowChangeEmailModal(false);
    });
  };

  const changePasswordHandler = (data) => {
    changePassword(data, (user) => {
      setUser(user);
      setShowChangePasswordModal(false);
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
                  <button
                    onClick={() => setShowChangeEmailModal(true)}
                    className="wma-btn wma-btn-dark wma-btn-sm"
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Email
                  </button>
                  <button
                    onClick={() => setShowChangePasswordModal(true)}
                    className="wma-btn wma-btn-dark wma-btn-sm"
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Password
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
          <ChangeEmailModal
            show={showChangeEmailModal}
            changeEmailHandler={changeEmailHandler}
            user={user}
            setShowChangeEmailModal={setShowChangeEmailModal}
          />

          <ChangePasswordModal
            show={showChangePasswordModal}
            changePasswordHandler={changePasswordHandler}
            setShowChangePasswordModal={setShowChangePasswordModal}
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
          onClick={() => changeNameHandler({ name })}
          className="btn btn-success w-100"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function ChangeEmailModal({
  show,
  setShowChangeEmailModal,
  user,
  changeEmailHandler,
}) {
  const [email, setEmail] = useState(user.email);
  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShowChangeEmailModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Email
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="email">New Email</label>
          <input
            type="email"
            className="form-control mt-2"
            id="email"
            onChange={onChangeHandler}
            value={email}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => changeEmailHandler({ email })}
          className="btn btn-success w-100"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function ChangePasswordModal({
  show,
  setShowChangePasswordModal,
  changePasswordHandler,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCon, setNewPasswordCon] = useState("");
  const onOldChangeHandler = (e) => {
    setOldPassword(e.target.value);
  };

  const onNewChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const onConChangeHandler = (e) => {
    setNewPasswordCon(e.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShowChangePasswordModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="old_password">Old Password</label>
          <input
            type="password"
            className="form-control mt-2"
            id="old_password"
            onChange={onOldChangeHandler}
            value={oldPassword}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="new_password">New Password</label>
          <input
            type="password"
            className="form-control mt-2"
            id="new_password"
            onChange={onNewChangeHandler}
            value={newPassword}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="new_password_confirmation">
            New Password Confirm
          </label>
          <input
            type="password"
            className="form-control mt-2"
            id="new_password_confirmation"
            onChange={onConChangeHandler}
            value={newPasswordCon}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() =>
            changePasswordHandler({
              old_password: oldPassword,
              new_password: newPassword,
              new_password_confirmation: newPasswordCon,
            })
          }
          className="btn btn-success w-100"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}
