import {
  faEdit,
  faPenAlt,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { Container, FormGroup, Modal } from "react-bootstrap";
import BottomNav from "../Components/BottomNav";
import FullPageLoader from "../Components/FullPageLoader";
import TopNav from "../Components/TopNav";
import { AuthContext } from "../Contexts/AuthContext";
import { IncomeSectorContext } from "../Contexts/IncomeSectorContext";

function IncomeSectors() {
  const { user, loadUser } = useContext(AuthContext);
  const {
    loading,
    incomeSectors,
    loadIncomeSectors,
    addIncomeSector,
    deleteIncomeSector,
    editIncomeSector,
  } = useContext(IncomeSectorContext);
  const shouldCall = useRef(true);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [workingID, setWorkingID] = useState(null);
  const [actionName, setActionName] = useState("Add");

  useEffect(() => {
    if (shouldCall.current) {
      shouldCall.current = false;
      if (!user) {
        loadUser();
      }

      if (incomeSectors.length <= 0) {
        loadIncomeSectors();
      }
    }
  }, []);

  const submitHandler = (sectorName) => {
    if (actionName === "Add") {
      addIncomeSector(sectorName, () => {
        setShowAddEditModal(false);
        setActionName("Add");
        setName("");
        setWorkingID(null);
      });
    } else if (actionName === "Edit") {
      editIncomeSector(workingID, sectorName, () => {
        setShowAddEditModal(false);
        setActionName("Add");
        setName("");
        setWorkingID(null);
      });
    }
  };

  const handleDelete = () => {
    deleteIncomeSector(workingID, () => {
      setShowDeleteModal(false);
      setWorkingID(null);
    });
  };

  const showAddModal = () => {
    setShowAddEditModal(true);
    setActionName("Add");
    setName("");
    setWorkingID(null);
  };

  const showEditModal = (s) => {
    setShowAddEditModal(true);
    setActionName("Edit");
    setName(s.name);
    setWorkingID(s.id);
  };
  const showDeleteModalHandler = (id) => {
    setWorkingID(id);
    setShowDeleteModal(true);
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
              <div className="d-flex justify-content-between align-items-center my-1 border rounded p-2">
                <h4 className="mb-0">Income Sectors</h4>
                <button
                  onClick={showAddModal}
                  className="btn btn-success btn-sm"
                >
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
              {incomeSectors.map((sec) => (
                <Sector
                  data={sec}
                  key={sec.id}
                  showEditModal={showEditModal}
                  showDeleteModalHandler={showDeleteModalHandler}
                />
              ))}
            </Container>
          </div>
          <AddEditModal
            show={showAddEditModal}
            setShowAddEditModal={setShowAddEditModal}
            name={name}
            actionName={actionName}
            submitHandler={submitHandler}
          />
          <DeleteModal
            show={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            handleDelete={handleDelete}
          />
          <BottomNav />
        </>
      )}
    </>
  );
}

export default IncomeSectors;

const Sector = ({ data, showEditModal, showDeleteModalHandler }) => {
  return (
    <div className="bg-white p-2 rounded shadow-sm mb-2">
      <div className="mb-2 clearfix">
        <strong className="float-start">{data.name}</strong>
        <div className="float-end">
          <FontAwesomeIcon
            onClick={() => showEditModal(data)}
            icon={faEdit}
            className="mx-3 text-success"
          />
          <FontAwesomeIcon
            onClick={() => showDeleteModalHandler(data.id)}
            icon={faTrash}
            className="mx-2 text-danger"
          />
        </div>
      </div>
      <div className="clearfix text-muted">
        <small className="float-start">
          From: {moment(data.created_at).format("ll")}
        </small>
        <small className="float-end">Total: {data.total_income} tk</small>
      </div>
    </div>
  );
};

function AddEditModal({
  show,
  setShowAddEditModal,
  name,
  actionName,
  submitHandler,
}) {
  const [sectorName, setSectorName] = useState(name);
  const onChangeHandler = (e) => {
    setSectorName(e.target.value);
  };

  useEffect(() => {
    setSectorName(name);
  }, [name]);

  return (
    <Modal
      show={show}
      onHide={() => setShowAddEditModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {actionName} Income Sector
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mt-2"
            id="name"
            onChange={onChangeHandler}
            value={sectorName}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => submitHandler(sectorName)}
          className="btn btn-success w-100"
        >
          {actionName}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal({ show, setShowDeleteModal, handleDelete }) {
  return (
    <Modal
      show={show}
      onHide={() => setShowDeleteModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Income Sector
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are You Sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="btn btn-info px-4"
        >
          No
        </button>
        <button onClick={handleDelete} className="btn btn-danger px-4">
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
}
