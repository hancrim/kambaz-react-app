/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  addCourse,
  updateCourse,
  editCourse,
  deleteCourse,
} from "./Courses/reducer";
import { addEnrollment, removeEnrollment } from "./Courses/People/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.courseReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  const isStudent = currentUser && currentUser.role === "STUDENT";

  const [showCourses, setShowCourses] = useState(false);
  const [currentCourse, setCourse] = useState<any>({
    _id: "new",
    name: "New course",
    number: "123",
    description: "New description",
    image: "green.jpeg",
  });

  const handleUpdateCourse = (course: any) => {
    dispatch(updateCourse(course));
    setCourse({
      _id: "new",
      name: "New course",
      number: "123",
      description: "New description",
      image: "green.jpeg",
    });
  };

  const handleAddNewCourse = (course: any) => {
    dispatch(addCourse(course));
    const newCourseId = course._id;

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
    return enrollments.some(
      (enrollment: { user: any; course: string }) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const currentCourseEnrollments = (courses: any, enrollments: any) => {
    return courses.filter((course: { _id: any }) => {
      if (showCourses) {
        return true;
      } else {
        return enrollments.some(
          (enrollment: { user: any; course: any }) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        );
      }
    });
  };

  console.log(courses);
  console.log(enrollments);
  console.log(currentCourseEnrollments(courses, enrollments));

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
              onClick={() => handleAddNewCourse(currentCourse)}
            >
              {" "}
              Add{" "}
            </Button>
            <Button
              className="btn btn-warning float-end me-2"
              onClick={() => handleUpdateCourse(currentCourse)}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>

          <br />

          <input
            value={currentCourse.name}
            className="form-control mb-2"
            onChange={(e) =>
              setCourse({ ...currentCourse, name: e.target.value })
            }
          />
          <textarea
            value={currentCourse.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...currentCourse, description: e.target.value })
            }
          />
        </div>
      )}
      <hr />
      <div className="d-flex">
        <h2 id="wd-dashboard-published">
          Published Courses (
          {showCourses
            ? courses.length
            : courses.filter((course: { _id: any }) =>
                enrollments.some(
                  (enrollment: { user: any; course: any }) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                )
              ).length}
          )
        </h2>

        {isStudent && (
          <Button
            className="ms-auto"
            onClick={() => setShowCourses(!showCourses)}
          >
            Enrollments
          </Button>
        )}
      </div>

      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course: { _id: any }) => {
              if (showCourses) {
                return true;
              } else {
                return enrollments.some(
                  (enrollment: { user: any; course: any }) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                );
              }
            })
            .map(
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
                                onClick={() =>
                                  dispatch(
                                    addEnrollment({
                                      courseId: course._id,
                                      userId: currentUser._id,
                                    })
                                  )
                                }
                                className="btn-success ms-2"
                              >
                                Enroll
                              </Button>
                            )}
                            {/* CHECK BELOW - AI  */}
                            {isEnrolled(course._id) && (
                              <Button
                                onClick={() =>
                                  dispatch(
                                    removeEnrollment(
                                      enrollments.find(
                                        (enrollment: {
                                          user: any;
                                          course: any;
                                        }) =>
                                          enrollment.user === currentUser._id &&
                                          enrollment.course === course._id
                                      )._id
                                    )
                                  )
                                }
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
                              dispatch(deleteCourse(course._id));
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
                              dispatch(editCourse(course._id));
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
