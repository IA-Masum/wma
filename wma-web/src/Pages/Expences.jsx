import {
  faEdit,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { Container, FormGroup, Modal } from "react-bootstrap";
import BottomNav from "../Components/BottomNav";
import DeleteModal from "../Components/DeleteModal";
import FullPageLoader from "../Components/FullPageLoader";
import TopNav from "../Components/TopNav";
import { AuthContext } from "../Contexts/AuthContext";
import { ExpenceContext } from "../Contexts/ExpenceContext";
import { ExpenceSectorContext } from "../Contexts/ExpenceSectorContext";

function Expences() {
  const { user, loadUser } = useContext(AuthContext);
  const { expenceSectors, loadExpenceSectors } = useContext(ExpenceSectorContext);

  const { loading, expences, loadExpences, addExpence, deleteExpence } =
    useContext(ExpenceContext);
  const shouldCall = useRef(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workingID, setWorkingID] = useState(null);


  useEffect(() => {
    if (shouldCall.current) {
      shouldCall.current = false;
      if (!user) {
        loadUser();
      }

      if (expences.length <= 0) {
        loadExpences();
      }

      if (expenceSectors.length <= 0) {
        loadExpenceSectors();
      }
    }
  }, []);

  const submitHandler = (expence) => {
    addExpence(expence, () => {
      setShowAddModal(false);
    });
  };

  const handleDelete = () => {
    deleteExpence(workingID, () => {
      setShowDeleteModal(false);
      setWorkingID(null);
    });
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
                <h4 className="mb-0">Expences</h4>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-success btn-sm"
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
              <hr />
              {expences.map((inc) => (
                <SingleExpence
                  data={inc}
                  key={inc.id}
                  showDeleteModalHandler={showDeleteModalHandler}
                />
              ))}
            </Container>
          </div>
          <AddModal
            show={showAddModal}
            setShowAddModal={setShowAddModal}
            submitHandler={submitHandler}
            expenceSectors={expenceSectors}
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
export default Expences;

const SingleExpence = ({ data, showDeleteModalHandler }) => {
  return (
    <div className="bg-white p-2 rounded shadow-sm mb-2">
      <div className="mb-2 clearfix">
        <strong className="float-start">{data.amount} tk</strong>
        <div className="float-end">
          <FontAwesomeIcon
            onClick={() => showDeleteModalHandler(data.id)}
            icon={faTrash}
            className="mx-2 text-danger"
          />
        </div>
      </div>
      <div className="clearfix text-muted">
        <small className="float-start">
          Added: {moment(data.created_at).format("ll")}
        </small>
        <small className="float-end">Sector: {data.expence_sector_id}</small>
      </div>
    </div>
  );
};

function AddModal({ show, setShowAddModal, submitHandler, expenceSectors }) {
  const [expence, setExpence] = useState({});
  const onChangeHandler = (e) => {
    setExpence((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClose = () => {
    setShowAddModal(false);
    setExpence({});
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Expence</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="expence_sector_id">Expence Sector</label>
          <select
            id="expence_sector_id"
            className="form-control form-select mt-2"
            onChange={onChangeHandler}
            defaultValue={expence.expence_sector_id}
            value={expence.expence_sector_id}
          >
            <option value="">SELECT</option>
            {expenceSectors.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.name}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup className="mt-2">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            step="0.001"
            id="amount"
            className="form-control"
            onChange={onChangeHandler}
            value={expence.amount}
          />
        </FormGroup>

        <FormGroup className="mt-2">
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            className="form-control"
            onChange={onChangeHandler}
            value={expence.note}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => submitHandler(expence)}
          className="btn btn-success w-100"
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}
