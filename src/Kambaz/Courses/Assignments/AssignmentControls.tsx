import { FaPlus } from "react-icons/fa6";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function AssignmentControls() {
  return (
    <div id="wd-modules-controls">
      <div
        id="flex-row-container"
        className="d-flex"
        style={{ justifyContent: "space-between", paddingLeft: "5px" }}
      >
        <div>
          <InputGroup size="lg" className="mb-3 w-40 flex-nowrap">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl placeholder="Search..." />
          </InputGroup>
        </div>
        <div id="left-wrapper" style={{ display: "inline-block" }}>
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
            className="me-1 in-line-block"
            id="wd-add-module-btn"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        </div>
      </div>
    </div>
  );
}
