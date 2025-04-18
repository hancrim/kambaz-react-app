import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import { updateQuiz } from "./reducer";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

export default function QuizQuestionEditor({ curQuiz }: { curQuiz: any }) {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(curQuiz);
  const [originalQuiz, setOriginalQuiz] = useState<any>(curQuiz);
  const [editedQuestions, setEditedQuestions] = useState<Set<number>>(
    new Set()
  );

  // Save the original quiz when first loaded
  useEffect(() => {
    setOriginalQuiz({ ...curQuiz });
  }, [curQuiz]);

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
    // Mark this question as edited
    setEditedQuestions((prev) => new Set([...prev, index]));
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
    // Mark this question as edited
    setEditedQuestions((prev) => new Set([...prev, questionIndex]));
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
    };

    setQuiz(updatedQuiz);
    // Mark this question as edited
    setEditedQuestions((prev) => new Set([...prev, index]));
  };

  const handleChange = async (curQuiz: any) => {
    if (qid !== "new") {
      const newQuiz = await quizzesClient.updateQuiz(curQuiz);
      dispatch(updateQuiz(newQuiz));
      setQuiz(newQuiz);
      setOriginalQuiz({ ...newQuiz });
      // Clear edited questions after save
      setEditedQuestions(new Set());
    } else {
      const createdQuiz = await coursesClient.createQuizForCourse(
        cid as string,
        quiz
      );
      if (createdQuiz) {
        dispatch(updateQuiz(createdQuiz));
        setQuiz(createdQuiz);
        setOriginalQuiz({ ...createdQuiz });
        setEditedQuestions(new Set());
      }
    }
  };

  const saveAllChanges = async () => {
    // Save all changes at once
    await handleChange(quiz);
  };

  const saveQuestion = async (index: number) => {
    // Save just this question
    await handleChange(quiz);
  };

  const cancelQuestionChanges = (index: number) => {
    // Revert just this question to original state
    if (!originalQuiz || !originalQuiz.questions) return;

    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = { ...originalQuiz.questions[index] };

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
    };

    setQuiz(updatedQuiz);

    // Remove this question from edited set
    const newEdited = new Set(editedQuestions);
    newEdited.delete(index);
    setEditedQuestions(newEdited);
  };

  const addNewQuestion = () => {
    const newQuestionIndex = quiz.questions.length;
    const newQuestion = {
      _id: `${qid}-${newQuestionIndex + 1}`,
      question_title: "New Question",
      question_text: "New Question",
      question_type: "Multiple Choice",
      question_points: 0,
      answers: [
        { answer_text: "Option 1", is_correct: true },
        { answer_text: "Option 2", is_correct: false },
        { answer_text: "Option 3", is_correct: false },
        { answer_text: "Option 4", is_correct: false },
      ],
    };
    const updatedQuiz = {
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    };

    setQuiz(updatedQuiz);
    handleChange(updatedQuiz);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter(
      (q: any, i: number) => i !== index
    );
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
    };
    setQuiz(updatedQuiz);
    handleChange(updatedQuiz);
  };

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
                  handleInputChange(index, "question_title", e.target.value);
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
                    handleInputChange(index, "question_points", e.target.value);
                  }}
                />
              </div>
            </div>
            {q.question_type === "Multiple Choice" && (
              <MultipleChoiceQuestionEditor
                onQuestionUpdate={(updatedQuestion) =>
                  handleQuestionUpdate(index, updatedQuestion)
                }
                questionNum={index + 1}
                curQuestion={q}
              />
            )}
            {q.question_type === "True or False" && (
              <TrueFalseQuestionEditor
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

            <div className="d-flex justify-content-end mt-3">
              <Button
                id={`cancel-question-${index}`}
                variant="outline-secondary"
                className="me-2"
                onClick={() => cancelQuestionChanges(index)}
                disabled={!editedQuestions.has(index)}
              >
                Cancel
              </Button>
              <Button
                id={`save-question-${index}`}
                variant="success"
                onClick={() => saveQuestion(index)}
                disabled={!editedQuestions.has(index)}
              >
                Update
              </Button>
              <Button
                id={`delete-question-${index}`}
                variant="outline-danger"
                className="ms-2"
                onClick={() => deleteQuestion(index)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="outline-danger"
          className="me-2"
          onClick={addNewQuestion}
        >
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
      <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
        <Button
          id="wd-save"
          className="btn-success float-end me-2"
          size="lg"
          onClick={saveAllChanges}
        >
          Save All Changes
        </Button>
      </Link>
    </div>
  );
}
