import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import { updateQuiz } from "./reducer";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function QuizQuestionEditor({ curQuiz }: { curQuiz: any }) {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(curQuiz);

  const handleQuestionTypeChange = (index: number, newType: string) => {
    const updatedQuestions = [...quiz.questions];
    const currentQuestion = updatedQuestions[index];

    // Create appropriate answers structure based on the new question type
    let updatedAnswers;

    if (newType === "Multiple Choice") {
      // For Multiple Choice, create 4 default options with one correct
      updatedAnswers = [
        { answer_text: "Option 1", is_correct: true },
        { answer_text: "Option 2", is_correct: false },
        { answer_text: "Option 3", is_correct: false },
        { answer_text: "Option 4", is_correct: false },
      ];
    } else if (newType === "True or False") {
      // For True/False, always have True and False options
      updatedAnswers = [
        { answer_text: "True", is_correct: true },
        { answer_text: "False", is_correct: false },
      ];
    } else if (newType === "Fill in the Blank") {
      // For Fill in the Blank, create one default correct answer
      updatedAnswers = [{ answer_text: "Answer", is_correct: true }];
    }

    // If current question already has answers, try to preserve them if possible
    if (currentQuestion.answers && currentQuestion.answers.length > 0) {
      if (newType === "True or False") {
        // For True/False, always reset to standard format
        updatedAnswers = [
          { answer_text: "True", is_correct: true },
          { answer_text: "False", is_correct: false },
        ];
      } else if (
        newType === "Multiple Choice" &&
        currentQuestion.question_type === "Fill in the Blank"
      ) {
        // Preserve existing answers and add more options if needed
        updatedAnswers = [
          ...currentQuestion.answers,
          { answer_text: "Option 2", is_correct: false },
          { answer_text: "Option 3", is_correct: false },
          { answer_text: "Option 4", is_correct: false },
        ].slice(0, 4); // Limit to 4 options
      } else if (
        newType === "Fill in the Blank" &&
        currentQuestion.question_type === "Multiple Choice"
      ) {
        // Keep only the correct answer for Fill in the Blank
        const correctAnswer = currentQuestion.answers.find(
          (a: any) => a.is_correct
        );
        if (correctAnswer) {
          updatedAnswers = [{ ...correctAnswer }];
        }
      }
    }

    updatedQuestions[index] = {
      ...currentQuestion,
      question_type: newType,
      answers: updatedAnswers,
    };

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
    };

    setQuiz(updatedQuiz);
    handleChange(updatedQuiz);
  };

  const handleQuestionUpdate = (
    questionIndex: number,
    updatedQuestion: any
  ) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      ...updatedQuestion,
    };

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
    };

    setQuiz(updatedQuiz);
    handleChange(updatedQuiz); // Send to server
  };

  const handleChange = async (curQuiz: any) => {
    if (qid !== "new") {
      const newQuiz = await quizzesClient.updateQuiz(curQuiz);
      dispatch(updateQuiz(newQuiz));
      setQuiz(newQuiz);
    } else {
      await coursesClient.createQuizForCourse(cid as string, quiz);
    }
  };

  const addNewQuestion = () => {
    const newQuestionIndex = quiz.questions.length + 1;
    const newQuestion = {
        _id: `${qid}-${newQuestionIndex + 1}`,
        question_title: "New Question",
        question_text: "New Question",
        question_type: "Multiple Choice",
        question_points: 0,
        answers: [
          {answer_text: "Option 1", is_correct: true },
          {answer_text: "Option 2", is_correct: false },
          {answer_text: "Option 3", is_correct: false },
          {answer_text: "Option 4", is_correct: false },
        ]
      }
      const updatedQuiz = {
        ...quiz,
        questions: [...quiz.questions, newQuestion]
      };

      setQuiz(updatedQuiz);
      //handleQuestionUpdate(newQuestionIndex, updatedQuiz);
      handleChange(updatedQuiz);
  }

  return (
    <div>
      <h1>Questions</h1>
      <ListGroup>
        {quiz.questions.map((q: any, index: any) => (
          <ListGroup.Item
            key={index}
            className="mb-3 border border-gray rounded-1"
          >
            <div className="mb-2 d-flex">
              <input
                id="wd-question-title"
                className="form-control me-2 w-25"
                type="text"
                value={q.question_title}
                onChange={(e) => {
                  const updatedQuestions = [...quiz.questions];
                  updatedQuestions[index] = {
                    ...updatedQuestions[index],
                    question_title: e.target.value,
                  };

                  const updatedQuiz = {
                    ...quiz,
                    questions: updatedQuestions,
                  };

                  setQuiz(updatedQuiz);
                  handleChange(updatedQuiz);
                }}
              />

              <select
                id={`question-type-${index}`}
                className="form-select w-25"
                value={q.question_type}
                onChange={(e) =>
                  handleQuestionTypeChange(index, e.target.value)
                }
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True or False">True or False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
              </select>
              <div className="ms-auto d-flex justify-content-end">
                <label
                  htmlFor={`question-points-${index}`}
                  className="d-flex align-items-center me-2 fw-bold"
                >
                  pts:
                </label>
                <input
                  id={`question-points-${index}`}
                  type="number"
                  className="form-control w-25"
                  value={q.question_points}
                  onChange={(e) => {
                    const updatedQuestions = [...quiz.questions];
                    updatedQuestions[index] = {
                      ...updatedQuestions[index],
                      question_points: e.target.value,
                    };

                    const updatedQuiz = {
                      ...quiz,
                      questions: updatedQuestions,
                    };

                    setQuiz(updatedQuiz);
                    handleChange(updatedQuiz);
                  }}
                />
              </div>
            </div>
            {q.question_type === "Multiple Choice" && (
              <MultipleChoiceQuestionEditor
                currentQuiz={quiz}
                questionIndex={index}
                onQuestionUpdate={(updatedQuestion) =>
                  handleQuestionUpdate(index, updatedQuestion)
                }
                questionNum={index + 1}
                curQuestion={q}
              />
            )}
            {q.question_type === "True or False" && (
              <TrueFalseQuestionEditor
                currentQuiz={quiz}
                questionIndex={index}
                onQuestionUpdate={(updatedQuestion) =>
                  handleQuestionUpdate(index, updatedQuestion)
                }
                questionNum={index + 1}
                curQuestion={{
                  question_text: q.question_text,
                  question_type: q.question_type,
                  answers: q.answers,
                }}
              />
            )}
            {q.question_type === "Fill in the Blank" && (
              <MultipleChoiceQuestionEditor
                currentQuiz={quiz}
                questionIndex={index}
                onQuestionUpdate={(updatedQuestion) =>
                  handleQuestionUpdate(index, updatedQuestion)
                }
                questionNum={index + 1}
                curQuestion={{
                  question_text: q.question_text,
                  question_type: q.question_type,
                  answers: q.answers,
                }}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="d-flex justify-content-end mb-2">
              <Button
                variant="outline-danger"
                className="me-2"
                onClick={addNewQuestion}>
                <FaPlus className="me-2" />
                Add Another Question
              </Button>
            </div>
      <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
        <Button
          id="wd-cancel"
          className="btn-secondary float-end me-2"
          size="lg"
        >
          Cancel
        </Button>
      </Link>
    </div>
  );
}
