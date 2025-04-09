/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import { FaCircleExclamation } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import QuestionBox from "./QuizQuestion";

export default function QuizViewer() {
  const { cid, qid, isPreview } = useParams();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  function formatDate(date: Date): string {
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Nov"
    const day = date.getDate();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${month} ${day}${suffix} at ${time}`;
  }

  const [startDate, setStartDate] = useState<string>("");

  const quiz = currentQuiz || {
    _id: "new",
    title: "Example Quiz",
    course: cid,
    points: 0,
    description: "Example description",
    isPubslished: false,
    due_date: "2023-10-01T00:00:00Z",
    due_date_text: "blah",
    avail_date: "2023-09-01T00:00:00Z",
    avail_date_text: "blah",
    available_until: "2023-11-01T00:00:00Z",
    lock_questions: "No",
    webcam_required: "No",
    one_question_at_time: "No",
    access_code: "xyz",
    num_attempts: 3,
    multiple_attempts: "Yes",
    time_limit: "No",
    shuffle_questions: "Yes",
    assignment_group: "Assignment Group",
    quiz_type: "Graded",
    show_correct_bool: "Yes",
    show_correct_date: "2023-10-01T00:00:00Z",
    questions: [],
  };

  const isOneQuestionAtATime = false;

  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    const now = new Date();
    setStartDate(formatDate(now));
  }, []);

  return (
    <div>
      <div className="d-flex  align-items-center">
        <Button className="btn-secondary">
          <Link to="../.." relative="path">
            Exit Preview
          </Link>
        </Button>
      </div>
      <br />
      <h1>{quiz.title}</h1>
      {isPreview === "true" && (
        <Alert variant="danger" className="text-left">
          <FaCircleExclamation /> This is a preview of the published version of
          the quiz
        </Alert>
      )}
      Started: {startDate}
      <br />
      <h2>Quiz Instructions</h2>
      <hr />
      {isOneQuestionAtATime && (
        <QuestionBox
          currentQuestion={currentQuestion}
          question={{
            body: quiz.questions[currentQuestion - 1].question_text,
            type: quiz.questions[currentQuestion - 1].question_type,
            answers: quiz.questions[currentQuestion - 1].question_answer,
          }}
        />
      )}
      {!isOneQuestionAtATime && (
        <ListGroup>
          {quiz.questions.map((q: any, index: any) => (
            <ListGroup.Item key={index} className="mb-3 border-0">
              <QuestionBox
                currentQuestion={index + 1}
                question={{
                  body: q.question_text,
                  type: q.question_type,
                  answers: q.question_answer,
                }}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <br />
      {/* use this to generate teh next and previous buttons */}
      {isOneQuestionAtATime && (
        <div className="w-100 p-3 d-flex justify-content-between">
          {currentQuestion > 1 ? (
            <Button
              variant="light border border-black"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentQuestion < quiz.questions.length && (
            <Button
              variant="light border border-black"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next
            </Button>
          )}
        </div>
      )}
      <br />
      <br />
      <div className="w-100 p-3 text-end border border-black">
        <Button variant="light" className="border border-black">
          {isPreview && (
            <Link
              to="../.."
              relative="path"
              className="text-black text-decoration-none"
            >
              Submit Quiz
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
}
