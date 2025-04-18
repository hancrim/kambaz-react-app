/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import { FaCircleExclamation, FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionBox from "./QuizQuestion";
import * as accountClient from "../../Account/client";
import { addQuizAnswer } from "./reducer";

export default function QuizViewer() {
  const { cid, qid, isPreview } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  // keeps track of current question
  // in one-at-a-time display mode
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [startDate, setStartDate] = useState<string>("");

  // make date format pretty
  function formatDate(date: Date): string {
    const month = date.toLocaleString("en-US", { month: "short" });
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

  const quiz = currentQuiz || {
    _id: "new",
    title: "Example Quiz",
    description: "Example description",
    instructions: "Take the quiz using a calculator",
    course: cid,
    quiz_type: "Graded Quiz",
    assignment_group: "Quizzes",
    shuffle_answers: true,
    has_time_limit: true,
    time_limit: 20,
    allow_multiple_attempts: true,
    num_attempts: 3,
    show_correct_answers: true,
    show_correct_answers_date: "2025-05-14",
    access_code: "",
    one_question_at_time: true,
    webcam_required: false,
    lock_questions_after_answering: false,
    is_published: true,
    due_date: "2025-05-13",
    avail_date: "2025-05-06",
    until_date: "2025-05-14",
    questions: [],
  };

  const isOneQuestionAtATime = quiz.one_question_at_time;

  const [chosenAnswers, setChosenAnswers] = useState(
    new Array(quiz.questions?.length).fill("")
  );

  const submitQuiz = async () => {
    if (!qid) return;

    let score = 0;

    const answered = chosenAnswers.map((ans: any, index: number) => {
      const questionType = quiz.questions[index].question_type;
      if (questionType === "Fill in the Blank") {
        if (
          quiz.questions[index].answers.some(
            (answer: { answer_text: string; is_correct: boolean }) =>
              answer.answer_text === ans
          )
        ) {
          score++;
        }
      } else if (
        questionType === "Multiple Choice" ||
        questionType === "True or False"
      ) {
        const answerIndex = parseInt(ans, 10);

        if (
          !isNaN(answerIndex) &&
          answerIndex >= 0 &&
          answerIndex < quiz.questions[index].answers.length
        ) {
          if (quiz.questions[index].answers[answerIndex].is_correct === true) {
            score++;
          }
        }
      }

      return {
        question_id: quiz.questions[index]._id,
        chosenAnswer: ans,
      };
    });

    const scorePercentage =
      Math.round((score / quiz.questions.length) * 100 * 100) / 100;
    console.log("score that was earned is " + scorePercentage);

    const toSend = {
      answered: answered,
      score: scorePercentage,
    };

    const answer = await accountClient.createAnswerForQuiz(qid, toSend);
    dispatch(addQuizAnswer(answer));
  };

  const handleQuizSubmit = async () => {
    await submitQuiz();
    navigate("../..", { relative: "path" });
  };

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
        <div className="position-relative">
        <QuestionBox
          questionNum={currentQuestion}
          question={{
            body: quiz.questions[currentQuestion - 1].question_text,
            type: quiz.questions[currentQuestion - 1].question_type,
            answers: quiz.questions[currentQuestion - 1].answers,
          }}
          chosenAnswers={chosenAnswers}
          setChosenAnswers={setChosenAnswers}
        />
          <Button
            className="position-absolute top-0 end-0 mt-2 me-2 btn-sm"
            variant="outline-primary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/true`)}
            title="Edit Question"
          >
            <FaPencil />
          </Button>
          </div>
      )}
      {!isOneQuestionAtATime && quiz.questions && (
        <ListGroup>
          {quiz.questions.map((q: any, index: any) => (
            <ListGroup.Item key={index} className="mb-3 border-0">
              <QuestionBox
                questionNum={index + 1}
                question={{
                  body: q.question_text,
                  type: q.question_type,
                  answers: q.answers,
                }}
                chosenAnswers={chosenAnswers}
                setChosenAnswers={setChosenAnswers}
              />
              {isPreview === "true" && (
                <Button
                  className="position-absolute top-0 end-0 mt-2 me-3 btn-sm"
                  variant="outline-primary"
                  onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/true`)}
                  title="Edit Question"
                >
                  <FaPencil />
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <br />
      {/* using this to create the next and previous buttons */}
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
        <Button
          variant="light"
          className="border border-black"
          onClick={() => {
            handleQuizSubmit();
          }}
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
