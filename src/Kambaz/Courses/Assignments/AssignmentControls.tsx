import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function AssignmentControls() {
  return (
    <div id="wd-modules-controls">
      <div
        id="flex-row-container"
        className="d-flex"
        style={{ justifyContent: "space-between", paddingLeft: "5px" }}
      >
        {/* DO IN BOOTSTRAP?? InputGroup */}
        <div id="right-wrapper" style={{ display: "inline-block" }}>
          <FaSearch
            id="wd-search-assignment"
            className="position-absolute"
            style={{
              height: "45px",
              color: "gray",
              marginLeft: "10px",
            }}
          />
          <input
            placeholder="Search..."
            id="wd-search-assignment"
            className="form-control"
            type="text"
            style={{ width: "400px", height: "45px", paddingLeft: "2.1rem" }}
          />
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
