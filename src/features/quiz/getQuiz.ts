import { Quiz } from "./types";
import { Course } from "../course/types";
import { fetchQuiz } from "../api/fetch";
import { Assignment } from "../assignment/types";
import { fromStorage } from "../storage/load";
import { decodeAssignmentFromArray } from "../assignment/decode";
import { decodeQuizFromArray } from "./decode";

export const getSakaiQuizzes = async (courses: Array<Course>) => {
  const quizzes: Array<Quiz> = [];
  const pending: Array<Promise<Quiz>> = [];
  for (const course of courses) {
    pending.push(fetchQuiz(course));
  }
  const result = await (Promise as any).allSettled(pending);
  for (const quiz of result) {
    if (quiz.status === "fulfilled") quizzes.push(quiz.value);
  }
  return quizzes;
};

export const getStoredQuizzes = (hostname: string): Promise<Array<Quiz>> => {
  return fromStorage<Quiz>(hostname, "CS_QuizList", decodeQuizFromArray);
};
