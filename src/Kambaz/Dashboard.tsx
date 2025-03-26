/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addEnrollment, removeEnrollment } from "./Courses/People/reducer";
import { useSelector, useDispatch } from "react-redux";

// NEED TO FIX THIS TO SUPPORT ENROLLMENTS
// SHOWING ALL CLASSES ETC.

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
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  const isStudent = currentUser && currentUser.role === "STUDENT";
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
    const newCourseId = course._id;
    addNewEnrollment(course);
    dispatch(
      addEnrollment({
        courseId: newCourseId,
        userId: currentUser._id,
      })
    );
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
    // dispatch(
    //   addEnrollment({
    //     courseId: course._id,
    //     userId: currentUser._id,
    //   })
    // );
    addNewEnrollment(course);
    console.log("HERE 1");
  };

  const handleRemoveEnrollment = (course: any) => {
    console.log("HERE 23");
    removeOldEnrollment(course);
    // dispatch(
    //   removeEnrollment({
    //     courseId: course._id,
    //     userId: currentUser._id,
    //   })
    // );
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
                      {/* will have to fix below to only do for enrolled/unerolled courses */}
                      {isStudent && showCourses && (
                        <div>
                          {" "}
                          {!isEnrolled(course._id) && (
                            <Button
                              onClick={() => handleAddEnrollment(course)}
                              className="btn-success ms-2"
                            >
                              Enroll
                            </Button>
                          )}
                          {isEnrolled(course._id) && (
                            <Button
                              onClick={() => handleRemoveEnrollment(course)}
                              className="btn-danger ms-2"
                            >
                              Unenroll
                            </Button>
                          )}
                        </div>
                      )}
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
