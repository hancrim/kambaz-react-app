/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard({
  courses,
  allCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  addNewEnrollment,
  removeOldEnrollment,
}: {
  courses: any[];
  allCourses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  addNewEnrollment: (course: any) => void;
  removeOldEnrollment: (course: any) => void;
}) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  const [showCourses, setShowCourses] = useState(false);
  const coursesToDisplay = showCourses ? allCourses : courses;

  const handleUpdateCourse = () => {
    updateCourse();
    setCourse({
      _id: "new",
      name: "New course",
      number: "123",
      description: "New description",
      image: "green.jpeg",
    });
  };

  const handleAddNewCourse = (course: any) => {
    addNewCourse();
    addNewEnrollment(course);
  };

  const handleGoToCourse = (courseId: string) => {
    if (isEnrolled(courseId)) {
      navigate(`/Kambaz/Courses/${courseId}/Home`);
    } else {
      navigate("/Kambaz/Dashboard");
    }
  };

  const isEnrolled = (courseId: string) => {
    return courses.some((course) => course._id === courseId);
  };

  const handleAddEnrollment = (course: any) => {
    addNewEnrollment(course);
  };

  const handleRemoveEnrollment = (course: any) => {
    removeOldEnrollment(course);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {isFaculty && (
        <div>
          <hr />
          <h5>
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => handleAddNewCourse(course)}
            >
              {" "}
              Add{" "}
            </Button>
            <Button
              className="btn btn-warning float-end me-2"
              onClick={() => handleUpdateCourse()}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>

          <br />

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
      )}
      <hr />
      <div className="d-flex">
        <h2 id="wd-dashboard-published">
          Published Courses ({coursesToDisplay.length})
        </h2>

        <Button
          className="ms-auto"
          onClick={() => setShowCourses(!showCourses)}
        >
          Enrollments
        </Button>
      </div>

      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursesToDisplay.map(
            (course: {
              _id: string;
              image: any;
              name: string;
              description: string | undefined;
            }) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      variant="top"
                      src={`/images/${course.image}`}
                      width="100%"
                      height={160}
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </Card.Text>
                    <div className="d-flex">
                      <Button
                        onClick={() => handleGoToCourse(course._id)}
                        variant="primary"
                      >
                        Go
                      </Button>
                      {isFaculty && (
                        <Button
                          onClick={() => {
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger ms-2 float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      )}
                      {isFaculty && (
                        <Button
                          id="wd-edit-course-click"
                          onClick={() => {
                            updateCourse();
                            setCourse(course);
                          }}
                          className="btn btn-warning ms-2 float-end"
                        >
                          Edit
                        </Button>
                      )}
                    </div>

                    {showCourses && (
                      <div className="d-flex pt-2">
                        {!isEnrolled(course._id) && (
                          <Button
                            onClick={() => handleAddEnrollment(course)}
                            className="btn-success"
                          >
                            Enroll
                          </Button>
                        )}
                        {isEnrolled(course._id) && (
                          <Button
                            onClick={() => handleRemoveEnrollment(course)}
                            className="btn-danger"
                          >
                            Unenroll
                          </Button>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
    </div>
  );
}
