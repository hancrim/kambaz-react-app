import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
  const { qid } = useParams();
  const isPreview = "true"; // Only faculty should see this screen
  return (
    <div>
      <b>Quiz Details</b>
      {/* FIX THIS SPACING */}
      <div className="d-flex justify-content-between align-items-center">
        <Button className="btn-secondary">
          <Link to={`Viewer/${isPreview}`}>Preview</Link>
        </Button>
        <Button className="btn-secondary">
          <FaPencil className=" me-3" />
          <Link to={`Editor`}>Edit</Link>
        </Button>
      </div>
      <hr />
      <h3>{qid}</h3>
    </div>
  );
}
