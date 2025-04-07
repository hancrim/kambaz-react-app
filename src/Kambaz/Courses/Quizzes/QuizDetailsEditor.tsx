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
import { useSelector } from "react-redux";
import { Form, Link, useParams } from "react-router";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { HiOutlineX } from "react-icons/hi";
import { useState } from "react";
export default function QuizDetailsEditor() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  //const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(
    currentQuiz || {
      _id: "new",
      //   TO DO Fill in rest with defualt placeholder values
    }
  );

  const handleTitleChange = (e: any) => {
    console.log(e.target.value);
    setQuiz({ ...quiz, title: e.target.value });
    // add dispatch to update quiz in redux store
    // add call to API to update quiz in database
  };

  //   TODO below implement save function
  function handleSave(): void {
    console.log("Save button clicked");
  }

  return (
    <div
      id="wd-quiz-editor"
      style={{ paddingLeft: "50px", paddingRight: "150px" }}
    >
      <div>
        <FormGroup className="mb-3" controlId="textarea2">
          <FormControl
            as="textarea"
            rows={1}
            className="w-100"
            placeholder="Quiz Name"
            value={quiz ? quiz.title : ""}
            onChange={handleTitleChange}
          />
          <br />
          {/* TODO - add from github example editor - look at piazza */}
          <FormLabel
            htmlFor="wd-quiz-instructions"
            style={{ textAlign: "right" }}
          >
            Quiz Instructions:
          </FormLabel>
          <FormControl
            as="textarea"
            className="w-100"
            style={{ height: "300px" }}
            placeholder={"Enter instructions..."}
            value={quiz ? quiz.instructions : ""}
            onChange={(e) => setQuiz({ ...quiz, instructions: e.target.value })}
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
      <div>
        <FormGroup as={Row} className="mb-3">
          {/* TODO - should this be active calculation of sum of all points in quiz? Prob yes so
            implement */}
          <FormLabel
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-points"
          >
            Points
          </FormLabel>
          <Col>
            <FormControl
              type="number"
              id="wd-points"
              placeholder="100"
              value={quiz ? quiz.points : ""}
              onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
            />
          </Col>
        </FormGroup>
        <FormGroup id="wd-shuffle" as={Row} className="mb-3">
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
              checked={quiz ? quiz.shuffle_answers === "Yes" : false}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  shuffle_answers: e.target.checked ? "Yes" : "No",
                })
              }
            />
            <div className="d-flex">
              <FormCheck
                className="me-2 mt-3"
                type="checkbox"
                id="wd-time"
                label="Time Limit"
                checked={quiz ? quiz.time_limit_bool === "Yes" : false}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    time_limit_bool: e.target.checked ? "Yes" : "No",
                  })
                }
              />
              {quiz && quiz.time_limit_bool === "Yes" && (
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
                checked={quiz ? quiz.multiple_attempts === "Yes" : false}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    multiple_attempts: e.target.checked ? "Yes" : "No",
                  })
                }
              />
            </div>
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
                      avail_date_text: new Date(e.target.value).toDateString(),
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
                  due_date_text: new Date(e.target.value).toDateString(),
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
                variant="danger"
                size="lg"
                id="wd-add-module-btn"
                className="float-end"
                onClick={handleSave}
              >
                Save
              </Button>
            </Link>
            <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
              <Button
                id="wd-collapse-all"
                className="btn-secondary float-end me-2"
                size="lg"
              >
                Cancel
              </Button>
            </Link>
          </Col>
        </FormGroup>
      </div>
    </div>
  );
}
