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
import { LoanContext } from "../Contexts/LoanContext";
import { LoanSectorContext } from "../Contexts/LoanSectorContext";

function Loans() {
  const { user, loadUser } = useContext(AuthContext);
  const { loanSectors, loadLoanSectors } = useContext(LoanSectorContext);

  const { loading, loans, loadLoans, addLoan, deleteLoan } =
    useContext(LoanContext);
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

      if (loans.length <= 0) {
        loadLoans();
      }

      if (loanSectors.length <= 0) {
        loadLoanSectors();
      }
    }
  }, []);

  const submitHandler = (loan) => {
    addLoan(loan, () => {
      setShowAddModal(false);
    });
  };

  const handleDelete = () => {
    deleteLoan(workingID, () => {
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
                <h4 className="mb-0">Loans</h4>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-success btn-sm"
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
              <hr />
              {loans.map((loan) => (
                <SingleLoan
                  data={loan}
                  key={loan.id}
                  showDeleteModalHandler={showDeleteModalHandler}
                />
              ))}
            </Container>
          </div>
          <AddModal
            show={showAddModal}
            setShowAddModal={setShowAddModal}
            submitHandler={submitHandler}
            loanSectors={loanSectors}
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
export default Loans;

const SingleLoan = ({ data, showDeleteModalHandler }) => {
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
        <small className="float-end">Sector: {data.loan_sector_id}</small>
      </div>
    </div>
  );
};

function AddModal({ show, setShowAddModal, submitHandler, loanSectors }) {
  const [loan, setLoan] = useState({});
  const onChangeHandler = (e) => {
    setLoan((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClose = () => {
    setShowAddModal(false);
    setLoan({});
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <label htmlFor="type">Loan Type <span className="text-danger">*</span></label>
          <select
            id="type"
            className="form-control form-select mt-2"
            onChange={onChangeHandler}
            defaultValue={loan.type}
            value={loan.type}
          >
            <option value="">SELECT</option>
            <option value="Old">Old</option>
            <option value="New">New</option>
          </select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="loan_sector_id">Loan Sector <span className="text-danger">*</span> </label>
          <select
            id="loan_sector_id"
            className="form-control form-select mt-2"
            onChange={onChangeHandler}
            defaultValue={loan.loan_sector_id}
            value={loan.loan_sector_id}
          >
            <option value="">SELECT</option>
            {loanSectors.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.name}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup className="mt-2">
          <label htmlFor="authority">Authority <span className="text-danger">*</span></label>
          <input
            type="text"
            id="authority"
            className="form-control"
            onChange={onChangeHandler}
            value={loan.authority}
          />
        </FormGroup>
        <FormGroup className="mt-2">
          <label htmlFor="amount">Amount <span className="text-danger">*</span></label>
          <input
            type="number"
            step="0.001"
            id="amount"
            className="form-control"
            onChange={onChangeHandler}
            value={loan.amount}
          />
        </FormGroup>

        <FormGroup className="mt-2">
          <label htmlFor="purpose">Purpose <span className="text-danger">*</span></label>
          <input
            type="text"
            id="purpose"
            className="form-control"
            onChange={onChangeHandler}
            value={loan.purpose}
          />
        </FormGroup>
        <FormGroup className="mt-2">
          <label htmlFor="target_paid_date">Target Paid Date</label>
          <input
            type="date"
            id="target_paid_date"
            className="form-control"
            onChange={onChangeHandler}
            value={loan.target_paid_date}
          />
        </FormGroup>
        <FormGroup className="mt-2">
          <label htmlFor="next_installment_date">Next Installment Date</label>
          <input
            type="date"
            id="next_installment_date"
            className="form-control"
            onChange={onChangeHandler}
            value={loan.next_installment_date}
          />
        </FormGroup>
        <FormGroup className="mt-2">
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            className="form-control"
            onChange={onChangeHandler}
            value={loan.note}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => submitHandler(loan)}
          className="btn btn-success w-100"
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}
