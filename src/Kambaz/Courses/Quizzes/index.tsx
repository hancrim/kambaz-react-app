import { ListGroup } from "react-bootstrap";
import { GoTriangleDown } from "react-icons/go";
import { quizzes } from "../../Database";
import QuizControls from "./QuizControls";
import { PiNotePencilDuotone } from "react-icons/pi";
//import { Link } from "react-router";
import { useSelector } from "react-redux";
import QuizControlButtons from "./QuizControlButtons";
import { Link, useParams } from "react-router-dom";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  const handleQuizClick = (quizId: string) => {
    if (isFaculty) {
      return `/Kambaz/Courses/${cid}/Quizzes/${quizId}`;
    } else {
      // SHOULD RETURN QUIZ FOR THE STUDENT -- CHANGE IN FUTURE
      return `/Kambaz/Courses/${cid}/Quizzes`;
    }
  };
  return (
    <div>
      <QuizControls />
      <br />
      <ListGroup>
        <ListGroup.Item className="wd-quiz p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary flex-wrap d-flex">
            {" "}
            <GoTriangleDown />
            <span className="bold-title" style={{ paddingLeft: "5px" }}>
              {" "}
              ASSIGNMENT QUIZZES{" "}
            </span>
          </div>
          <ListGroup className="wd-quizzes rounded-0 w-100">
            {quizzes.map((quiz: any) => (
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* CHANGE THIS TO ROCKETSHIP */}
                  <div>
                    <PiNotePencilDuotone
                      className="me-2 fs-3"
                      style={{ color: "green" }}
                    />
                  </div>
                  <div style={{ paddingLeft: "7px" }}>
                    <Link
                      to={handleQuizClick(quiz._id)}
                      className="bold-title"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      <b>{quiz.title}</b>
                    </Link>
                    <br />
                    {/* TO DO MAKE ALL OF THIS DYNAMIC */}
                    <span className="red-text">Multiple Modules</span>
                    <span> | </span>
                    <span className="bold-text">Not available until </span>
                    <span className="body-text">
                      {""}
                      {quiz.avail_date_text}
                    </span>
                    <span> | </span>
                    <span className="body-text">
                      {""}
                      {quiz.points}
                    </span>
                    <span className="body-text"> points </span>
                    <br />
                    <span className="bold-text">Due </span>
                    <span className="body-text">
                      {""}
                      {quiz.due_date_text}
                    </span>
                  </div>
                  {isFaculty && (
                    <div className="ms-auto">
                      <QuizControlButtons />
                    </div>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
