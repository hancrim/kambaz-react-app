/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";
const initialState = {
  quizzes: quizzes, //TODO start this as empty
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: assignment }) => {
      const newQuiz: any = {
        _id: "new",
        title: assignment.title,
        course: assignment.course,
        points: assignment.points,
        description: assignment.description,
        isPubslished: assignment.isPublished,
        due_date: assignment.due_date,
        due_date_text: new Date(assignment.due_date).toDateString(),
        avail_date: assignment.avail_date,
        avail_date_text: new Date(assignment.avail_date).toDateString(),
        available_until: assignment.available_until,
        lock_questions: assignment.lock_questions,
        webcam_required: assignment.webcam_required,
        one_question_at_time: assignment.one_question_at_time,
        access_code: assignment.access_code,
        num_attempts: assignment.num_attempts,
        multiple_attempts: assignment.multiple_attempts,
        time_limit: assignment.time_limit,
        shuffle_questions: assignment.shuffle_questions,
        assignment_group: assignment.assignment_group,
        quiz_type: assignment.quiz_type,
        show_correct_bool: assignment.show_correct_bool,
        show_correct_date: assignment.show_correct_date,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...q, ...quiz } : q
      ) as any;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
