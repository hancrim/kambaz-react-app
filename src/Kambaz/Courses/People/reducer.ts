import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  enrollments: enrollments,
};
const modulesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: { courseId, userId } }) => {
      const newEnrollment: any = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    removeEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e._id !== enrollmentId
      );
    },
  },
});
export const { addEnrollment, removeEnrollment } = modulesSlice.actions;
export default modulesSlice.reducer;
