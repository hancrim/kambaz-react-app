import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${COURSES_API}/enroll`, {
    userId,
    courseId,
  });
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${COURSES_API}/unenroll`, {
    userId,
    courseId,
  });
  return response.data;
};
