import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencilDuotone } from "react-icons/pi";
import AssignmentControlButtons from "../Assignments/AssignmentControlButtons";
import GroupControlButtons from "./GroupControlButtons";
import AssignmentControls from "./AssignmentControls";
import { GoTriangleDown } from "react-icons/go";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary flex-wrap d-flex">
            {" "}
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown />
            <span className="bold-title" style={{ paddingLeft: "5px" }}>
              {" "}
              ASSIGNMENTS{" "}
            </span>
            {isFaculty && <GroupControlButtons />}
          </div>

          <ListGroup className="wd-lessons rounded-0 w-100">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
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
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        className="bold-title"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {" "}
                        {assignment.title}
                      </Link>
                      <br />
                      {/* TO DO MAKE ALL OF THIS DYNAMIC */}
                      <span className="red-text">Multiple Modules</span>
                      <span> | </span>
                      <span className="bold-text">Not available until </span>
                      <span className="body-text">
                        {""}
                        {assignment.avail_date_text}
                      </span>
                      <br />
                      <span className="bold-text">Due </span>
                      <span className="body-text">
                        {""}
                        {assignment.due_date_text}
                      </span>
                    </div>
                    {isFaculty && (
                      <div className="ms-auto">
                        <AssignmentControlButtons
                          assignmentId={assignment._id}
                          deleteAssignmentAction={(assignmentId) => {
                            dispatch(deleteAssignment(assignmentId));
                          }}
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
