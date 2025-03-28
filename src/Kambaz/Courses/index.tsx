import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { addAssignment } from "./Assignments/reducer";
import * as coursesClient from "./client";
import { useDispatch } from "react-redux";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find(
    (course: { _id: string | undefined }) => course._id === cid
  );

  const dispatch = useDispatch();
  const createAssignmentForCourse = async (newAssignment: any) => {
    if (!cid) return;
    const assignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );

    dispatch(addAssignment(assignment));
  };

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:aid/"
              element={
                <AssignmentEditor addAssignment={createAssignmentForCourse} />
              }
            />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
