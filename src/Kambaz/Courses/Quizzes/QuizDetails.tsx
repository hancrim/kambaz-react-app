import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
  const { qid } = useParams();
  return (
    <div>
      <b>Quiz Details</b>
      {/* FIX THIS SPACING */}
      <div className="d-flex justify-content-between align-items-center">
        <Button className="btn-secondary">Preview</Button>
        <Button className="btn-secondary">
          <FaPencil className=" me-3" />
          Edit
        </Button>
      </div>
      <hr />
      <h3>{qid}</h3>
    </div>
  );
}
