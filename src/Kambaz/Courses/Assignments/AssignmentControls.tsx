import { FaPlus } from "react-icons/fa6";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  const navigate = useNavigate();

  const { cid } = useParams();
  const handleAddAssignment = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  };

  return (
    <div id="wd-modules-controls">
      <div
        id="flex-row-container"
        style={{
          justifyContent: "space-between",
          paddingLeft: "5px",
          flex: "no-wrap",
        }}
      >
        <div>
          <InputGroup size="lg" className="mb-3 w-40 d-flex">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl placeholder="Search..." />
          </InputGroup>
        </div>

        {isFaculty && (
          <div
            id="left-wrapper"
            className="d-flex"
            style={{ display: "inline-block" }}
          >
            <Button
              id="wd-view-progress"
              className="me-2 btn-secondary in-line-block"
              size="lg"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="me-1 in-line-block text-nowrap"
              id="wd-add-module-btn"
              onClick={handleAddAssignment}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
