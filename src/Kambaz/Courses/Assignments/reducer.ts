/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  assignments: assignments,
};
const modulesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        points: assignment.points,
        course: assignment.course,
        description: assignment.description,
        due_date: assignment.due_date,
        avail_date: assignment.avail_date,
        available_until: assignment.available_until,
        avail_date_text: new Date(assignment.avail_date).toDateString(),
        due_date_text: new Date(assignment.due_date).toDateString(),
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? { ...a, ...assignment } : a
      );
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
  modulesSlice.actions;
export default modulesSlice.reducer;
