import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  assignments: [],
};
const modulesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: "new",
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
      ) as any;
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} = modulesSlice.actions;
export default modulesSlice.reducer;
