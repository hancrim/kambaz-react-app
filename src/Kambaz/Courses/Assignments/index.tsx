import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencilDuotone } from "react-icons/pi";
import AssignmentControlButtons from "../Modules/LessonControlButtons";
import GroupControlButtons from "./GroupControlButtons";
import AssignmentControls from "./AssignmentControls";
import { GoTriangleDown } from "react-icons/go";
import "./styles.css";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            {" "}
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown />
            <span className="bold-title" style={{ paddingLeft: "5px" }}>
              {" "}
              ASSIGNMENTS{" "}
            </span>
            <GroupControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  <PiNotePencilDuotone
                    className="me-2 fs-3"
                    style={{ color: "green" }}
                  />
                </div>
                <div style={{ paddingLeft: "7px" }}>
                  {/* <span className="bold-title">A1 </span> */}
                  <a
                    href="#/Kambaz/Courses/1234/Assignments/123"
                    className="bold-title"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    A1
                  </a>
                  <br />
                  <span className="red-text">Multiple Modules</span>
                  <span> | </span>
                  <span className="bold-text">Not available until</span>
                  <span className="body-text"> | May 6 at 12:00am | </span>
                  <br />
                  <span className="bold-text">Due </span>
                  <span className="body-text">May 13 at 11:59pm | 100pts </span>
                </div>
                <div style={{ flexGrow: "1" }}>
                  <AssignmentControlButtons />
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  <PiNotePencilDuotone
                    className="me-2 fs-3"
                    style={{ color: "green" }}
                  />
                </div>
                <div style={{ paddingLeft: "7px" }}>
                  <a
                    href="#/Kambaz/Courses/1234/Assignments/123"
                    className="bold-title"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    A2
                  </a>

                  <br />
                  <span className="red-text">Multiple Modules</span>
                  <span> | </span>
                  <span className="bold-text">Not available until</span>
                  <span className="body-text"> | May 13 at 12:00am | </span>
                  <br />
                  <span className="bold-text">Due </span>
                  <span className="body-text">May 20 at 11:59pm | 100pts </span>
                </div>
                <div style={{ flexGrow: "1" }}>
                  <AssignmentControlButtons />
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  <PiNotePencilDuotone
                    className="me-2 fs-3"
                    style={{ color: "green" }}
                  />
                </div>
                <div style={{ paddingLeft: "7px" }}>
                  <a
                    href="#/Kambaz/Courses/1234/Assignments/123"
                    className="bold-title"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    A3
                  </a>
                  <br />
                  <span className="red-text">Multiple Modules</span>
                  <span> | </span>
                  <span className="bold-text">Not available until</span>
                  <span className="body-text"> | May 20 at 12:00am | </span>
                  <br />
                  <span className="bold-text">Due </span>
                  <span className="body-text">May 27 at 11:59pm | 100pts </span>
                </div>
                <div style={{ flexGrow: "1" }}>
                  <AssignmentControlButtons />
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> LESSON 1{" "}
              <AssignmentControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> LESSON 2{" "}
              <AssignmentControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>*/}
      </ListGroup>

      {/* <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </a>
          <br />
          Multiple Modules | <b>Not available until </b>
          May 6 at 12:00am |
          <br />
          <b>Due </b>
          May 13 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          Multiple Modules | <b>Not available until </b>
          May 13 at 12:00am |
          <br />
          <b>Due </b>
          May 20 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          Multiple Modules | <b>Not available until </b>
          May 20 at 12:00am |
          <br />
          <b>Due </b>
          May 27 at 11:59pm | 100 pts
        </li>
      </ul> */}
    </div>
  );
}
