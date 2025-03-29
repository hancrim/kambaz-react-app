import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import AssignmentDelete from "./AssignmentDelete";
import { useState } from "react";
export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignmentAction,
}: {
  assignmentId: string;
  deleteAssignmentAction: (assignmentId: string) => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="float-end d-flex">
      <FaTrash className="text-danger me-2 mt-1" onClick={() => handleShow()} />
      <AssignmentDelete
        dialogTitle="Delete Assignment"
        show={show}
        handleClose={handleClose}
        deleteAssignmentAction={deleteAssignmentAction}
        assignmentId={assignmentId}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="mt-1 fs-4" />
    </div>
  );
}
