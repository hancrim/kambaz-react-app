/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as accountClient from "../../Account/client";
import * as coursesClient from "../client";
import { Button, ListGroup } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function QuizAnswerReview() {
  const { qid, aid } = useParams();
  const [userQuizAnswers, setUserQuizAnswers] = useState<any>({});
  // user's answer FOR THIS QUIZ,
  // found by filtering all of the user's answers
  const [quiz, setQuiz] = useState<any>({});

  // help determine if an answer is correct
  const isCorrectAnswer = (question: any, chosenAnswer: string) => {
    if (question.question_type === "Fill in the Blank") {
      return question.answers.some(
        (answer: any) =>
          answer.answer_text === chosenAnswer && answer.is_correct
      );
    } else {
      const answerIndex = parseInt(chosenAnswer, 10);
      if (
        !isNaN(answerIndex) &&
        answerIndex >= 0 &&
        answerIndex < question.answers.length
      ) {
        return question.answers[answerIndex].is_correct === true;
      }
      return false;
    }
  };

  const getCorrectAnswer = (question: any) => {
    if (question.question_type === "Fill in the Blank") {
      const correctAnswer = question.answers.find((a: any) => a.is_correct);
      return correctAnswer
        ? correctAnswer.answer_text
        : "No correct answer provided";
    } else {
      const correctIndex = question.answers.findIndex((a: any) => a.is_correct);
      return correctIndex !== -1
        ? question.answers[correctIndex].answer_text
        : "No correct answer provided";
    }
  };

  useEffect(() => {
    const fetchUserQuizAnswers = async () => {
      const quizAnswers = await accountClient.findQuizAnswersForUser(
        qid as string
      );

      setUserQuizAnswers(
        quizAnswers.find((attempt: any) => attempt._id === aid)
      );
    };

    const fetchQuiz = async () => {
      const quiz = await coursesClient.findQuizById(qid as string);
      console.log("quiz is " + JSON.stringify(quiz));

      setQuiz(quiz);
    };
    fetchUserQuizAnswers();
    fetchQuiz();
  }, [qid, aid]);

  return (
    <div>
      <h1>Quiz Answer Review</h1>
      <ListGroup className="mb-5">
        {quiz?.questions?.map((question: any, qIndex: number) => {
          const userAnswer = userQuizAnswers?.answered?.find(
            (a: any) => a.question_id === question._id
          );

          const isCorrect = userAnswer
            ? isCorrectAnswer(question, userAnswer.chosenAnswer)
            : false;

          return (
            <ListGroup.Item key={qIndex} className="mb-3 border">
              <div className="d-flex align-items-start mb-2">
                <div className="me-2 mt-1">
                  {isCorrect ? (
                    <FaCheckCircle size={20} className="text-success" />
                  ) : (
                    <FaTimesCircle size={20} className="text-danger" />
                  )}
                </div>
                <div>
                  <h5>
                    Question {qIndex + 1}: {question.question_text}
                  </h5>
                </div>
              </div>

              {question.question_type === "Fill in the Blank" ? (
                <div className="ms-4 mb-3">
                  <div className="mb-2">
                    <strong>Your answer:</strong>
                    <span
                      className={
                        isCorrect ? "text-success ms-2" : "text-danger ms-2"
                      }
                    >
                      {userAnswer
                        ? userAnswer.chosenAnswer
                        : "No answer provided"}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div>
                      <strong>Correct answer:</strong>
                      <span className="text-success ms-2">
                        {getCorrectAnswer(question)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <ListGroup variant="flush" className="ms-4">
                  {question.answers.map((answer: any, aIndex: number) => {
                    const isUserChoice =
                      userAnswer &&
                      userAnswer.chosenAnswer === aIndex.toString();
                    let className = "";

                    if (isUserChoice && answer.is_correct) {
                      className = "text-success fw-bold";
                    } else if (isUserChoice && !answer.is_correct) {
                      className = "text-danger fw-bold";
                    } else if (!isUserChoice && answer.is_correct) {
                      className = "text-success";
                    }

                    return (
                      <ListGroup.Item
                        key={aIndex}
                        className={className}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        {isUserChoice ? "✓ " : "   "}
                        {answer.answer_text}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Button className="btn-secondary">
        <Link to={`../../`} relative="path">Exit</Link>
      </Button>
    </div>
  );
}
