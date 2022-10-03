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
import { IncomeContext } from "../Contexts/IncomeContext";
import { IncomeSectorContext } from "../Contexts/IncomeSectorContext";

function Incomes() {
  const { user, loadUser } = useContext(AuthContext);
  const { incomeSectors, loadIncomeSectors } = useContext(IncomeSectorContext);

  const { loading, incomes, loadIncomes, addIncome, deleteIncome } =
    useContext(IncomeContext);
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

      if (incomes.length <= 0) {
        loadIncomes();
      }

      if (incomeSectors.length <= 0) {
        loadIncomeSectors();
      }
    }
  }, []);

  const submitHandler = (income) => {
    addIncome(income, () => {
      setShowAddModal(false);
    });
  };

  const handleDelete = () => {
    deleteIncome(workingID, () => {
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
                <h4 className="mb-0">Incomes</h4>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-success btn-sm"
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
              <hr />
              {incomes.map((inc) => (
                <SingleIncome
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
            incomeSectors={incomeSectors}
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
export default Incomes;

const SingleIncome = ({ data, showDeleteModalHandler }) => {
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
        <small className="float-end">Sector: {data.income_sector_id}</small>
      </div>
    </div>
  );
};

function AddModal({ show, setShowAddModal, submitHandler, incomeSectors }) {
  const [income, setIncome] = useState({});
  const onChangeHandler = (e) => {
    setIncome((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClose = () => {
    setShowAddModal(false);
    setIncome({});
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="income_sector_id">Income Sector</label>
          <select
            id="income_sector_id"
            className="form-control form-select mt-2"
            onChange={onChangeHandler}
            defaultValue={income.income_sector_id}
            value={income.income_sector_id}
          >
            <option value="">SELECT</option>
            {incomeSectors.map((sec) => (
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
            value={income.amount}
          />
        </FormGroup>

        <FormGroup className="mt-2">
          <label htmlFor="source">Source</label>
          <input
            type="text"
            id="source"
            className="form-control"
            onChange={onChangeHandler}
            value={income.source}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => submitHandler(income)}
          className="btn btn-success w-100"
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}
