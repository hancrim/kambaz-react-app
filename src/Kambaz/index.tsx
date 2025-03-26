import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { addCourse } from "./Courses/reducer";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import "./styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setEnrollments,
  removeEnrollment,
  addEnrollment,
} from "./Courses/People/reducer";
import { useEffect, useState } from "react";

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
      setEnrollments(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const publishedCourses = await courseClient.fetchAllCourses();
      setAllCourses(publishedCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchAllCourses();
  }, [currentUser]);

  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]); // All published courses
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = () => {
    dispatch(addCourse(course));

    setCourses([
      ...courses,
      {
        _id: course._id,
        name: course.name,
        number: course.number,
        description: course.description,
        image: "green.jpeg",
      },
    ]);
  };
  const handleEnroll = async (courseToEnroll: any) => {
    if (!courses.some((course) => course._id === courseToEnroll._id)) {
      setCourses([...courses, courseToEnroll]);
    }
    try {
      await userClient.enrollInCourse(courseToEnroll._id);
      if (!courses.some((course) => course._id === courseToEnroll._id)) {
        dispatch(addEnrollment(courseToEnroll));
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  const handleUnenroll = async (courseToUnenroll: any) => {
    setCourses(courses.filter((course) => course._id !== courseToUnenroll._id));
    try {
      await userClient.unenrollFromCourse(courseToUnenroll._id);

      // Remove from local state
      dispatch(removeEnrollment(courseToUnenroll._id));
    } catch (error) {
      console.error("Unenrollment failed:", error);
    }
  };
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    currentUser
                      ? "/Kambaz/Account/Profile"
                      : "/Kambaz/Account/Signin"
                  }
                />
              }
            />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  {" "}
                  <Dashboard
                    courses={courses}
                    allCourses={allCourses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    addNewEnrollment={handleEnroll}
                    removeOldEnrollment={handleUnenroll}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  {" "}
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
