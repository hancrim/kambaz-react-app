/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import Editor from "react-simple-wysiwyg";
import { useState } from "react";
import * as quizzesClient from "./client.ts";
import * as coursesClient from "../client.ts";
import { updateQuiz } from "./reducer";

export default function QuizDetailsEditor() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(
    currentQuiz || {
      _id: "new",
      //   TO DO Fill in rest with defualt placeholder values
    }
  );

  const handleSavePublish = async () => {
    const updatedQuiz = { ...quiz, is_published: !quiz.is_published };
    if (qid !== "new") {
      const serverQuiz = await quizzesClient.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(serverQuiz));
    } else {
      const serverQuiz = await coursesClient.createQuizForCourse(
        cid as string,
        updatedQuiz
      );
      dispatch(updateQuiz(serverQuiz));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleSave = async () => {
    if (qid !== "new") {
      await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    } else {
      await coursesClient.createQuizForCourse(cid as string, quiz);
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const [instructionsValue, setInstructionsValue] = useState(
    quiz.instructions || ""
  );

  const handleInstructionsChange = (e: any) => {
    const newInstructions = e.target.value;
    setInstructionsValue(newInstructions);
    setQuiz({
      ...quiz,
      instructions: newInstructions,
    });
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
  function onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <div
      id="wd-quiz-editor"
      style={{ paddingLeft: "50px", paddingRight: "150px" }}
    >
      <div id="wd-quiz-editor-header">
        <FormGroup className="mb-3" controlId="textarea2">
          <FormControl
            as="textarea"
            rows={1}
            className="w-100"
            placeholder="Quiz Name"
            value={quiz ? quiz.title : ""}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
          <br />
          {/* TODO - add from github example editor - look at piazza */}
          <FormLabel style={{ textAlign: "right" }}>
            Quiz Instructions:
          </FormLabel>
          <Editor
            id="wd-quiz-instructions"
            value={instructionsValue || "Enter Instructions here"}
            onChange={handleInstructionsChange}
          />

          <FormGroup as={Row} className="mt-3 mb-3">
            <FormLabel
              column
              sm={2}
              style={{ textAlign: "right" }}
              htmlFor="wd-quiz-type"
            >
              Quiz Type
            </FormLabel>

            <Col>
              <FormSelect
                id="wd-quiz-type"
                value={quiz ? quiz.quiz_type : "Graded Quiz"}
                onChange={(e) =>
                  setQuiz({ ...quiz, quiz_type: e.target.value })
                }
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Pracitce Quiz">Practice Quiz</option>
                <option value="Graded Survy">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </FormGroup>
          <FormGroup as={Row} className="mb-3">
            <FormLabel
              column
              sm={2}
              style={{ textAlign: "right" }}
              htmlFor="wd-group"
            >
              Assignment Group
            </FormLabel>
            <Col>
              <FormSelect
                id="wd-quiz-group"
                value={quiz ? quiz.assignment_group : "Quizzes"}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignment_group: e.target.value })
                }
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Projects">Projects</option>
              </FormSelect>
            </Col>
          </FormGroup>
        </FormGroup>
      </div>
      <div id="wd-quiz-editor-details">
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-points"
          >
            Points
          </FormLabel>
          {/* CANNOT EDIT BC OF ACTIVE CALC - TODO - IS THAT FINE? */}
          <Col>
            <FormControl
              type="number"
              id="wd-points"
              placeholder="100"
              value={calculateTotalPoints(quiz) || "0"}
              onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
            />
          </Col>
        </FormGroup>
        <FormGroup id="wd-detail-settings" as={Row} className="mb-3">
          <FormLabel
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-shuffle"
          >
            {"Options"}
          </FormLabel>
          <Col>
            <FormCheck
              type="checkbox"
              id="wd-shuffle"
              label="Shuffle Answers"
              checked={quiz.shuffle_answers}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  shuffle_answers: e.target.checked,
                })
              }
            />
            <div className="d-flex">
              <FormCheck
                className="me-2 mt-3"
                type="checkbox"
                id="wd-time"
                label="Time Limit"
                checked={quiz.has_time_limit}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    has_time_limit: e.target.checked,
                  })
                }
              />
              {quiz && quiz.has_time_limit && (
                <div className="d-flex">
                  <FormControl
                    type="number"
                    id="wd-time-limit-minutes"
                    placeholder="Min"
                    value={quiz.time_limit || "20"}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        time_limit: e.target.value,
                      })
                    }
                    style={{ marginTop: "10px", width: "60px" }}
                  />
                  <div className="ms-3 mt-3">Minutes</div>
                </div>
              )}
            </div>
            <div
              className=" mt-2 border border-dark rounded"
              id="wd-multiple-attempts"
            >
              <FormCheck
                className="mt-2 ms-2 mb-2"
                type="checkbox"
                id="wd-multiple-attempts"
                label="Multiple Attempts"
                checked={quiz.allow_multiple_attempts}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    allow_multiple_attempts: e.target.checked,
                  })
                }
              />
            </div>
            <div className="d-flex" id="wd-answers-details">
              <FormGroup>
                <FormLabel
                  column
                  sm={2}
                  style={{ textAlign: "right" }}
                  htmlFor="wd-shuffle"
                >
                  {""}
                </FormLabel>
                <Col>
                  <div className="d-flex">
                    <FormCheck
                      className="mt-2 mb-2"
                      type="checkbox"
                      id="wd-show-correct-answers"
                      label="Show Correct Answers"
                      checked={quiz.show_correct_answers}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          show_correct_answers: e.target.checked,
                        })
                      }
                    />
                    {quiz && quiz.show_correct_answers && (
                      <div className="d-flex">
                        <input
                          placeholder="May 13, 2024, 11:59PM"
                          value={quiz.show_correct_answers_date || ""}
                          id="wd-show-correct-date"
                          className="form-control ms-2"
                          type="date"
                          style={{ width: "100%", height: "45px" }}
                          onChange={(e) =>
                            setQuiz({
                              ...quiz,
                              show_correct_answers_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  <FormCheck
                    className="mt-2 mb-2"
                    type="checkbox"
                    id="wd-one-question-at-a-time"
                    label="One Question at a Time"
                    checked={quiz.one_question_at_a_time}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        one_question_at_a_time: e.target.checked,
                      })
                    }
                  />
                  {/* TODO Add in default as NO for new quiz */}
                  <FormCheck
                    className="mt-2 mb-2"
                    type="checkbox"
                    id="wd-web-cam"
                    label="Webcam Required"
                    checked={quiz.webcam_required}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        webcam_required: e.target.checked,
                      })
                    }
                  />
                  {/* TODO Add in default as NO for new quiz */}
                  <FormCheck
                    className="mt-2 mb-2"
                    type="checkbox"
                    id="wd-lock-questions"
                    label="Lock Questions After Answering"
                    checked={quiz.lock_questions_after_answering}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        lock_questions_after_answering: e.target.checked,
                      })
                    }
                  />
                </Col>
              </FormGroup>
            </div>
          </Col>
        </FormGroup>
      </div>
      <div id="wd-quiz-editor-access-code">
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-access-code"
          >
            Access Code
          </FormLabel>
          <Col>
            <FormControl
              as="textarea"
              rows={1}
              className="w-100"
              placeholder="Access Code"
              value={quiz ? quiz.access_code : ""}
              onChange={(e) =>
                setQuiz({ ...quiz, access_code: e.target.value })
              }
            />
          </Col>
        </FormGroup>
      </div>

      <div>
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-available-from"
          >
            Assign{" "}
          </FormLabel>
          <Col
            style={{
              outline: "2px solid gray",
              padding: "10px",
              borderRadius: "5px",
              marginLeft: "12px",
            }}
          >
            <br />
            <FormGroup as={Row} className="mb-3">
              <Col>
                <FormLabel className="bold-title" htmlFor="wd-available-from">
                  Available From
                </FormLabel>
                <input
                  placeholder="May 13, 2024, 11:59PM"
                  value={quiz ? quiz.avail_date : ""}
                  id="wd-available-from"
                  className="form-control"
                  type="date"
                  style={{ width: "100%", height: "45px" }}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      avail_date: e.target.value,
                    })
                  }
                />
              </Col>

              <Col>
                <FormLabel className="bold-title" htmlFor="wd-available-until">
                  Until
                </FormLabel>
                <input
                  placeholder="May 13, 2024, 11:59PM"
                  value={quiz ? quiz.available_until : ""}
                  id="wd-available-until"
                  className="form-control"
                  type="date"
                  style={{ width: "100%", height: "45px" }}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      available_until: e.target.value,
                    })
                  }
                />
              </Col>
            </FormGroup>
            <label className="bold-title" htmlFor="wd-due-date">
              Due
            </label>
            <input
              placeholder="May 13, 2024, 11:59PM"
              value={quiz ? quiz.due_date : ""}
              id="wd-due-date"
              className="form-control"
              type="date"
              style={{ width: "100%", height: "45px" }}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  due_date: e.target.value,
                })
              }
            />
          </Col>
        </FormGroup>
      </div>
      <div
        id="wd-submit-btns"
        style={{
          borderTopColor: "gray",
          borderWidth: "10pt",
          alignContent: "right",
        }}
      >
        <FormGroup as={Row} className="mb-3">
          <Col sm={2}></Col>
          <Col>
            <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
              <Button
                id="wd-save-publsish"
                className="btn-danger float-end ms-2 me-2"
                size="lg"
                onClick={handleSavePublish}
              >
                Save & Publish
              </Button>
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
                <Button
                  variant="danger"
                  size="lg"
                  id="wd-save"
                  className="float-end"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Link>
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
                <Button
                  id="wd-cancel"
                  className="btn-secondary float-end me-2"
                  size="lg"
                >
                  Cancel
                </Button>
              </Link>
            </Link>
          </Col>
        </FormGroup>
      </div>
    </div>
  );
}
