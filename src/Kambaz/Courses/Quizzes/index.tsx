/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { GoTriangleDown } from "react-icons/go";
import QuizControls from "./QuizControls";
import { PiNotePencilDuotone } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import QuizControlButtons from "./QuizControlButtons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addQuiz, setQuizzes } from "./reducer";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as accountClient from "../../Account/client";
import { deleteQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const isFaculty = currentUser && currentUser.role === "FACULTY";

  const handleEdit = (quizId: string) => {
    navigate(handleQuizClick(quizId));
  };

  const handleQuizClick = (quizId: string) => {
    return `/Kambaz/Courses/${cid}/Quizzes/${quizId}`;
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = { title: "Temp Quiz Name", course: cid };
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
    //dispatch(addquiz(quiz)); -- TODO ADD THIS?
  };

  const deleteQuizFromCourse = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };
  const toggleQuizPublishStatus = async (quiz: any) => {
    console.log("Before toggle:", quiz.is_published);
    const updatedQuiz = { ...quiz, is_published: !quiz.is_published };
    const updatedQuizBackEnd = await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(
      setQuizzes(
        quizzes.map((q: any) => (q._id === quiz._id ? updatedQuizBackEnd : q))
      )
    );
    console.log("After toggle:", quiz.is_published);
  };

  const [, setName] = useState("");
  // New function to filter quizzes
  const handleSearchQuizzes = async (searchTerm: string) => {
    setName(searchTerm);
    console.log("HERE");
    if (searchTerm) {
      const quizzes = await coursesClient.findQuizzesByPartialName(
        cid as string,
        searchTerm
      );
      dispatch(setQuizzes(quizzes));
    } else {
      fetchQuizzes();
    }
  };

  const calculateTotalPoints = (quiz: { questions: any[]; points: any }) => {
    // Check if quiz has questions array

    if (!quiz.questions || !Array.isArray(quiz.questions)) {
      return quiz.points || 0; // Return the overall quiz points if questions not available
    }

    // Sum up all question points
    return quiz.questions.reduce(
      (total: any, question: { question_points: number }) => {
        // Use question_points if available, otherwise default to 1
        const pointValue = question.question_points || 1;
        return total + pointValue;
      },
      0
    );
  };

  const [lastScores, setLastScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchLastScore = async () => {
      if (!isFaculty) {
        const quizIds = quizzes.map((quiz: any) => quiz._id);

        // at least trying to be a little efficient w/ the promise all call
        // shoutout software engineering
        const scoresPromises = quizIds.map(async (quizId: any) => {
          const answersForQuiz = await accountClient.findQuizAnswersForUser(
            quizId
          );
          if (answersForQuiz && answersForQuiz.length > 0) {
            return answersForQuiz[answersForQuiz.length - 1].score;
          }
          return 0;
        });

        const newScores = await Promise.all(scoresPromises);

        setLastScores([...lastScores, ...newScores]);
      }
    };
    fetchLastScore();
  }, [currentUser, quizzes]);

  return (
    <div>
      <QuizControls
        addQuiz={createQuizForCourse}
        searchQuizzes={handleSearchQuizzes}
      />
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
            {quizzes.length == 0 && isFaculty && (
              <div className="m-3">
                Use the red add quiz button to create a quiz.
              </div>
            )}
            {quizzes.map((quiz: any, index: number) => (
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

                    <span className="body-text">
                      {quiz.avail_date && quiz.until_date
                        ? (() => {
                            const currentDate = new Date();
                            const availDate = new Date(quiz.avail_date);
                            const availUntil = new Date(quiz.until_date);

                            if (currentDate < availDate) {
                              return (
                                <>
                                  <b>Not available until</b>{" "}
                                  {availDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </>
                              );
                            } else if (
                              currentDate >= availDate &&
                              currentDate <= availUntil
                            ) {
                              return <b>Available</b>;
                            } else {
                              return <b> Closed </b>;
                            }
                          })()
                        : "No availability information"}
                    </span>
                    <span> | </span>
                    <span className="bold-text">Due </span>
                    <span className="body-text">
                      {""}
                      {quiz.due_date
                        ? new Date(quiz.due_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "No due date"}
                    </span>
                    <span> | </span>
                    <span className="body-text">
                      {""}
                      {/* TODO ADD SUM OF POINTS HERE  */}
                      {calculateTotalPoints(quiz)}
                    </span>
                    <span className="body-text"> pts </span>
                    <span> | </span>
                    <span className="body-text">
                      {""}
                      {quiz.questions && quiz.questions.length}
                    </span>
                    <span className="body-text"> Questions </span>
                    <br />
                    {currentUser && !isFaculty && (
                      <>
                        <span className="body-text">
                          <b>Most Recent Score: </b>
                          {lastScores && lastScores.length > index
                            ? `${lastScores[index]}`
                            : ""}
                        </span>
                      </>
                    )}
                  </div>
                  {isFaculty && (
                    <div className="ms-auto">
                      <QuizControlButtons
                        quiz={quiz}
                        editQuiz={handleEdit}
                        deleteQuiz={deleteQuizFromCourse}
                        publishQuiz={toggleQuizPublishStatus}
                      />
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
