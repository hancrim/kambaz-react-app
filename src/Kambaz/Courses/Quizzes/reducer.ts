/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [], //TODO start this as empty
  quizAnswers: [],
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
        description: assignment.description,
        instructions: assignment.instructions,
        course: assignment.course,
        quiz_type: assignment.quiz_type,
        assignment_group: assignment.assignment_group,
        shuffle_answers: assignment.shuffle_answers,
        has_time_limit: assignment.has_time_limit,
        time_limit: assignment.time_limit,
        allow_multiple_attempts: assignment.allow_multiple_attempts,
        num_attempts: assignment.num_attempts,
        show_correct_answers: assignment.show_correct_answers,
        show_correct_answers_date: assignment.show_correct_answers_date,
        access_code: assignment.access_code,
        one_question_at_time: assignment.one_question_at_time,
        webcam_required: assignment.webcam_required,
        lock_questions_after_answering:
          assignment.lock_questions_after_answering,
        is_published: assignment.is_published,
        due_date: assignment.due_date,
        avail_date: assignment.avail_date,
        until_date: assignment.until_date,
        questions: assignment.questions,
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

    setQuizAnswers: (state, { payload: quizAnswers }) => {
      state.quizAnswers = quizAnswers;
    },

    addQuizAnswer: (state, { payload: quizAnswer }) => {
      const newQuizAnswer: any = {
        _id: quizAnswer._id,
        quiz: quizAnswer.quiz,
        user: quizAnswer.user,
        answered: quizAnswer.answered,
      };
      state.quizAnswers = [...state.quizAnswers, newQuizAnswer] as any;
    },

    deleteQuizAnswer: (state, { payload: quizAnswerId }) => {
      state.quizAnswers = state.quizAnswers.filter(
        (qa: any) => qa._id !== quizAnswerId
      );
    },

    updateQuizAnswer: (state, { payload: quizAnswer }) => {
      state.quizAnswers = state.quizAnswers.map((qa: any) =>
        qa._id === quizAnswer._id ? { ...qa, ...quizAnswer } : qa
      ) as any;
    },
  },
});
export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuizzes,
  addQuizAnswer,
  deleteQuizAnswer,
  updateQuizAnswer,
  setQuizAnswers,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
