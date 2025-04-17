import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPencil, FaTrash, FaCheck, FaPlus } from "react-icons/fa6";
import Editor from "react-simple-wysiwyg";

// import { useNavigate, useParams } from "react-router-dom";

export default function MultipleChoiceQuestionEditor({
  currentQuiz,
  questionNum,
  curQuestion,
  questionIndex,
  onQuestionUpdate,
}: {
  currentQuiz: any;
  questionNum: any;
  curQuestion: any;
  questionIndex: number;
  onQuestionUpdate: (updatedQuestion: any) => void;
}) {
  const questionType = curQuestion.question_type;
  const [question, setUpdatedQuestion] = useState(curQuestion);
  const [questionValue, setQuestionValue] = useState(
    question.question_text || ""
  );
  // Use an array of booleans instead of an object
  const [editingAnswers, setEditingAnswers] = useState(
    // Initialize all answers to be in editing mode by default
    Array(question.answers.length).fill(false)
  );

  const handleAnswerChange = (answerIndex: number, newValue: string) => {
    setUpdatedQuestion({
      ...question,
      answers: question.answers.map((a: any, i: number) => {
        if (i === answerIndex) {
          return { ...a, answer_text: newValue };
        }
        return a;
      }),
    });
  };

  const handleCorrectAnswerChange = (answerIndex: number) => {
    setUpdatedQuestion({
      ...question,
      answers: question.answers.map((a: any, i: number) => ({
        ...a,
        is_correct: i === answerIndex, // Only the selected answer is true
      })),
    });
  };

  const handleQuestionTextChange = (e: any) => {
    setQuestionValue(e.target.value);
    setUpdatedQuestion({
      ...question,
      question_text: e.target.value,
    });
  };

  // Submit all changes to parent on update
  const handleUpdate = () => {
    onQuestionUpdate(question);
  };

  // Toggle editing for a specific answer
  const toggleEditingForAnswer = (index: number) => {
    const newEditingAnswers = [...editingAnswers];
    newEditingAnswers[index] = !newEditingAnswers[index];
    setEditingAnswers(newEditingAnswers);
  };

  return (
    <div
      id="wd-multiple-choice-editor"
      className="border border-1 border-dark rounded p-3"
    >
      <div>
        {questionType === "Multiple Choice" && (
          <div>
            Enter your question and multiple answers, then select the correct
            answer.
          </div>
        )}
      </div>
      <div>
        {questionType === "Fill in the Blank" && (
          <div>
            Enter your question text, then define all possible correct answers
            for the blank. Students will see the question followed by a small
            text box to fill their answer.
          </div>
        )}
      </div>
      <b className="pb-1 mb-2 d-block">Question:</b>
      <Editor
        id="wd-quiz-instructions"
        value={questionValue || "Enter question here"}
        onChange={handleQuestionTextChange}
      />
      <b className="pt-1 mt-2 d-block">Answers:</b>
      <div>
        {question.answers.map((answer: any, index: number) => (
          <div
            className="border border-1 border-secondary rounded p-2 mb-2 d-flex align-items-center justify-content-between"
            key={answer._id}
          >
            <div className="d-flex align-items-center">
              {questionType === "Multiple Choice" && (
                <input
                  type="radio"
                  id={`wd-correct-answer-${questionNum}`}
                  name={`correctAnswer-${questionNum}`}
                  className="me-2"
                  checked={answer.is_correct}
                  onChange={() => handleCorrectAnswerChange(index)}
                />
              )}
              <label className="me-2">Possible Answer:</label>
              {editingAnswers[index] && (
                <input
                  className="form-control w-50 d-inline-block"
                  defaultValue={answer.answer_text}
                  onChange={(e) => {
                    handleAnswerChange(index, e.target.value);
                  }}
                />
              )}
              {!editingAnswers[index] && answer.answer_text}
            </div>
            <div>
              {answer.is_correct && (
                <FaCheck className="text-success me-3 fs-3" />
              )}
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => toggleEditingForAnswer(index)}
              >
                <FaPencil />
              </Button>
              <Button
                variant="outline-danger"
                onClick={() =>
                  setUpdatedQuestion({
                    ...question,
                    answers: question.answers.filter(
                      (a: any, i: number) => i !== index
                    ),
                  })
                }
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end">
        <Button
          variant="outline-danger"
          className="me-2"
          onClick={() => {
            setUpdatedQuestion({
              ...question,
              answers: [
                ...question.answers,
                {
                  answer_text: "new option",
                  is_correct:
                    questionType && questionType === "Fill in the Blank"
                      ? true
                      : false,
                },
              ],
            });
          }}
        >
          <FaPlus className="me-2" />
          Add Another Answer
        </Button>
      </div>

      <div>
        <Button className="btn-secondary mt-2 me-2">Cancel</Button>
        <Button className="btn-danger mt-2 me-2" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
