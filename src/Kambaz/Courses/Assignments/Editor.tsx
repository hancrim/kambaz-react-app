import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { HiOutlineX } from "react-icons/hi";
import "./styles.css";

export default function AssignmentEditor() {
  return (
    <div
      id="wd-assignments-editor"
      style={{ paddingLeft: "50px", paddingRight: "150px" }}
    >
      <div>
        <Form.Group className="mb-3" controlId="textarea2">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            as="textarea"
            className="w-100"
            placeholder="Assignment Name"
            value="A1"
          />
          <br />
          <Form.Control
            as="textarea"
            className="w-100"
            style={{ height: "300px" }}
            placeholder={"Enter description here..."}
            value={
              "This assignment is available online.\n \nSubmit a link to the landing page of your web application running on Netlify. \n \n The landing page should include the following:\n \n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambas application\n• Links to all of the relevent source code repositories "
            }
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-points"
          >
            Points
          </Form.Label>
          <Col>
            <Form.Control type="number" id="wd-points" placeholder="100" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-group"
          >
            Assignment Group
          </Form.Label>
          <Col>
            <FormSelect id="wd-group">
              <option selected>ASSIGNMENTS</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormSelect>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-display-grade-as"
          >
            Display Grade as
          </Form.Label>
          <Col>
            <FormSelect id="wd-display-grade-as">
              <option selected>Percentage</option>
              <option value="1">Decimal</option>
              <option value="2">Fraction</option>
              <option value="3">Other</option>
            </FormSelect>
          </Col>
        </Form.Group>
      </div>

      <div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-submission-type"
          >
            Sumbission Type
          </Form.Label>
          <Col
            style={{
              outline: "2px solid gray",
              padding: "10px",
              borderRadius: "5px",
              marginLeft: "12px",
            }}
          >
            <Form.Select id="wd-submission-type">
              <option selected>Online</option>
              <option value="1">In Person</option>
              <option value="2">Other</option>
            </Form.Select>
            <FormGroup id="wd-submission-type">
              <br />
              <b>Online Entry Options</b>
              <FormCheck id="wd-text-entry">
                <FormCheckInput
                  id="wd-text-entry"
                  type="checkbox"
                ></FormCheckInput>
                <FormCheckLabel htmlFor="wd-text-entry">
                  Text Entry
                </FormCheckLabel>
              </FormCheck>
              <FormCheck id="wd-website-url">
                <FormCheckInput
                  id="wd-website-url"
                  type="checkbox"
                ></FormCheckInput>
                <FormCheckLabel htmlFor="wd-website-url">
                  Website URL
                </FormCheckLabel>
              </FormCheck>

              <FormCheck id="wd-media-recordings">
                <FormCheckInput
                  id="wd-media-recordings"
                  type="checkbox"
                ></FormCheckInput>
                <FormCheckLabel id="wd-media-recordings">
                  Media Recordings
                </FormCheckLabel>
              </FormCheck>

              <FormCheck id="wd-student-annotation">
                <FormCheckInput
                  id="wd-student-annotation"
                  type="checkbox"
                ></FormCheckInput>
                <FormCheckLabel id="wd-student-annotation">
                  Student Annotation
                </FormCheckLabel>
              </FormCheck>
              <FormCheck id="wd-file-upload">
                <FormCheckInput
                  id="wd-file-upload"
                  type="checkbox"
                ></FormCheckInput>
                <FormCheckLabel id="wd-file-upload">
                  File Uploads
                </FormCheckLabel>
              </FormCheck>
            </FormGroup>
          </Col>
        </Form.Group>
      </div>
      <div>
        <Form.Group as={Row} className="mb-3">
          <FormLabel
            column
            sm={2}
            style={{ textAlign: "right" }}
            htmlFor="wd-assign-to"
          >
            Assign
          </FormLabel>
          <Col
            style={{
              outline: "2px solid gray",
              padding: "10px",
              borderRadius: "5px",
              marginLeft: "12px",
            }}
          >
            <FormLabel className="bold-title" htmlFor="wd-assign-to">
              Assign To
            </FormLabel>
            {/* HERE */}

            <div className="position-relative d-flex align-items-center border rounded p-2">
              <div className="badge rounded-pill bg-light text-dark d-flex align-items-center me-2">
                Everyone
                <span className="ms-1 text-muted ">
                  {" "}
                  <HiOutlineX />{" "}
                </span>
              </div>
              <input
                type="text"
                id="wd-assign-to"
                className="form-control border-0 shadow-none p-0"
                placeholder="Assign To"
              />
            </div>

            <br />
            <FormGroup as={Row} className="mb-3">
              <Col>
                <FormLabel className="bold-title" htmlFor="wd-available-from">
                  Available From
                </FormLabel>
                <input
                  placeholder="May 13, 2024, 11:59PM"
                  id="wd-available-from"
                  className="form-control"
                  type="date"
                  style={{ width: "100%", height: "45px" }}
                />
              </Col>
              <Col>
                <FormLabel className="bold-title" htmlFor="wd-available-until">
                  Until
                </FormLabel>
                <input
                  placeholder="May 13, 2024, 11:59PM"
                  id="wd-available-until"
                  className="form-control"
                  type="date"
                  style={{ width: "100%", height: "45px" }}
                />
              </Col>
            </FormGroup>
            <label className="bold-title" htmlFor="wd-due-date">
              Due
            </label>
            <input
              placeholder="May 13, 2024, 11:59PM"
              id="wd-due-date"
              className="form-control"
              type="date"
              style={{ width: "100%", height: "45px" }}
            />
          </Col>
        </Form.Group>
      </div>
      <div
        id="wd-submit-btns"
        style={{
          borderTopColor: "gray",
          borderWidth: "10pt",
          alignContent: "right",
        }}
      >
        <Form.Group as={Row} className="mb-3">
          <Col sm={2}></Col>
          <Col>
            <Button
              variant="danger"
              size="lg"
              id="wd-add-module-btn"
              className="float-end"
            >
              Save
            </Button>
            <Button
              id="wd-collapse-all"
              className="btn-secondary float-end me-2"
              size="lg"
            >
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </div>
    </div>
  );
}
