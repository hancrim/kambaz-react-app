import { FaPlus } from "react-icons/fa6";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";

export default function QuizControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  //const navigate = useNavigate();
  //const { cid } = useParams();
  const handleAddQuiz = () => {
    console.log('Add Quiz button clicked');
    // navigate(`/Kambaz/Courses/${cid}/Quizzes/new`);
  };

  return (
    <div id="wd-quiz-controls">
      <div
        className="d-flex"
        style={{
          justifyContent: "space-between",
          paddingLeft: "5px",
          flex: "no-wrap",
        }}
      >
        <div>
          <InputGroup size="lg" className="w-40 d-flex">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl placeholder="Search For Quiz..." />
          </InputGroup>
        </div>

        {isFaculty && (
          <div
            id="left-wrapper"
            className="d-flex"
            style={{ display: "inline-block" }}
          >
            <Button
              variant="danger"
              size="lg"
              className="me-1 in-line-block text-nowrap"
              id="wd-add-module-btn"
              onClick={handleAddQuiz}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </Button>
            <Button className="btn-secondary">
              <IoEllipsisVertical className="mt-1 fs-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
