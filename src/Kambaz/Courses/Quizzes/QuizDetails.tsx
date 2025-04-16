/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as accountClient from "../../Account/client";
import * as coursesClient from "../client";

export default function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [quiz, setQuiz] = useState<any>({});
  const isFaculty = currentUser.role === "FACULTY"; // Faculty get preview

  useEffect(() => {
    const fetchUserQuizAnswers = async () => {
      const quizAnswers = await accountClient.findQuizAnswersForUser(
        qid as string
      );

      setCurrentAnswers(quizAnswers);
    };

    const fetchQuiz = async () => {
      const quiz = await coursesClient.findQuizById(qid as string);

      setQuiz(quiz);
    };
    fetchUserQuizAnswers();
    fetchQuiz();
  }, [qid]);

  return (
    <div>
      <b>Quiz Details</b>
      {isFaculty && (
        <div className="d-flex justify-content-between align-items-center">
          <Button className="btn-secondary">
            <Link to={`Viewer/${isFaculty ? "true" : "false"}`}>Preview</Link>
          </Button>
          <Button className="btn-secondary">
            <FaPencil className=" me-3" />
            <Link to={`Editor`}>Edit</Link>
          </Button>
        </div>
      )}
      <hr />
      <h3 className="text-center">{quiz?.title}</h3>
      <hr/>
      <h3>Previous Attempts</h3>
      {Array.isArray(currentAnswers) && currentAnswers.length > 0 ? (
        <ListGroup className="mt-3">
          {currentAnswers.map((answer: any, index: number) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>Attempt {index + 1}</div>
              <div>{" Score: " + answer.score}</div>
              { index === currentAnswers.length - 1 && (
              <Link
                to={`Answers/${answer._id}`}
                className="btn btn-outline-primary"
              >
                View Results
              </Link>)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No previous attempts found.</p>
      )}
      <br />
      {quiz?.num_attempts > currentAnswers.length || isFaculty ? (
        <Button
          onClick={() => navigate(`Viewer/${isFaculty ? "true" : "false"}`)}
        >
          Begin Quiz
        </Button>
      ) : (
        <Button className="btn-danger">Maximum quiz attempts reached</Button>
      )}
      {isFaculty && (<p>Faculy have no limit on the number of times they can attempt a quiz.</p>)}
    </div>
  );
}
