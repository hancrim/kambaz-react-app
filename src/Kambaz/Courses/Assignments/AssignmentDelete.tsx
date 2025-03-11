import { Button, Modal } from "react-bootstrap";

export default function AssignmentDelete({
  show,
  handleClose,
  dialogTitle,
  deleteAssignmentAction,
  assignmentId,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  deleteAssignmentAction: (assignmentId: string) => void;
  assignmentId: string;
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{dialogTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to remove this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            No{" "}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteAssignmentAction(assignmentId);
              handleClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
