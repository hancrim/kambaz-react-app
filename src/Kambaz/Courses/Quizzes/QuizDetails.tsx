/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as accountClient from "../../Account/client";
import * as coursesClient from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
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

  const showCorrectAnswersDate = new Date(quiz.show_correct_answers_date);
  const dueDate = new Date(quiz.due_date);
  const availDate = new Date(quiz.avail_date);
  const untilDate = new Date(quiz.until_date);

  return (
    <div>
      <h2>Quiz Details</h2>
      {isFaculty && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-between">
            <Button
              className="btn-secondary me-2"
              style={{ outline: "1px solid darkgray" }}
              onClick={() => navigate(`Viewer/${isFaculty ? "true" : "false"}`)}
            >
              Preview
            </Button>
            <Button
              className="btn-secondary"
              style={{ outline: "1px solid darkgray" }}
              onClick={() => navigate(`Editor`)}
            >
              <FaPencil className="me-3" />
              Edit
            </Button>
          </div>
        </div>
      )}
      <hr />
      <h3 className="text-center">{quiz.title}</h3>
      <div className="d-flex justify-content-center">
        <div className="d-flex">
          <div className="text-end fw-bold me-3">
            <div>Quiz Type</div>
            <div>Points</div>
            <div>Assignment Group</div>
            <div>Shuffle Answers</div>
            <div>Time Limit</div>
            <div>Multiple Attempts</div>
            { quiz.allow_multiple_attempts && 
              <div>Number of Attempts</div>
            }
            <div>Show Correct Answers</div>
            <div>Access Code</div>
            <div>One Question at a Time</div>
            <div>Webcam Required</div>
            <div>Lock Questions After Answering</div>
          </div>
          <div className="text-start">
            <div>{quiz.quiz_type}</div>
            <div>0{/* TODO - sum points here */}</div>
            <div>{quiz.assignment_group}</div>
            <div>{quiz.shuffle_answers ? "No" : "Yes"}</div>
            <div>{quiz.has_time_limit ? quiz.time_limit : "20 Minutes"}</div>
            <div>{quiz.allow_multiple_attempts ? "Yes" : "No"}</div>
            { quiz.allow_multiple_attempts && 
              <div>{quiz.num_attempts ? quiz.num_attempts : "2" }</div>
            }
            <div>
              {quiz.show_correct_answers
                ? showCorrectAnswersDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No"}
            </div>
            <div>{quiz.access_code || "No Access Code"}</div>
            <div>{quiz.one_question_at_time ? "No" : "Yes"}</div>
            <div>{quiz.webcam_required ? "Yes" : "No"}</div>
            <div>{quiz.lock_questions_after_answering ? "Yes" : "No"}</div>
          </div>
        </div>
      </div>
      <div id="wd-due-dates" className="mt-3 d=flex justify-content-center">
        <div className="d-flex justify-content-between">
          <div className="text-center flex-fill fw-bold">Due</div>
          <div className="text-center flex-fill fw-bold">Available From</div>
          <div className="text-center flex-fill fw-bold">Until</div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="text-center flex-fill">
            {dueDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="text-center flex-fill">
            {availDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="text-center flex-fill">
            {untilDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <hr />
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
              <Link
                to={`Answers/${answer._id}`}
                className="btn btn-outline-primary"
              >
                View Results
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No previous attempts found.</p>
      )}
      <br />
      {quiz.avail_date && quiz.until_date ? (
        (() => {
          const currentDate = new Date();
          const availDate = new Date(quiz.avail_date);
          const availUntil = new Date(quiz.until_date);

          if (currentDate < availDate) {
            return (
              <Button className="btn-danger">
                Not available until{" "}
                {availDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Button>
            );
          } else if (currentDate >= availUntil) {
            return <Button className="btn-danger">Closed</Button>;
          } else {
            return quiz?.num_attempts > currentAnswers.length || isFaculty ? (
              <Button
                onClick={() =>
                  navigate(`Viewer/${isFaculty ? "true" : "false"}`)
                }
              >
                Begin Quiz
              </Button>
            ) : (
              <Button className="btn-danger">
                Maximum quiz attempts reached
              </Button>
            );
          }
        })()
      ) : (
        <Button className="btn-danger">No availability information</Button>
      )}
      {isFaculty && (
        <p>
          Faculy have no limit on the number of times they can attempt a quiz.
        </p>
      )}
      <div>
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes`}
          className="btn btn-secondary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          Exit
        </Link>
      </div>
    </div>
  );
}
