import { Modal } from "react-bootstrap";

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

export default DeleteModal;