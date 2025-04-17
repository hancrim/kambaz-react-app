import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import Editor from "react-simple-wysiwyg";

export default function TrueFalseQuestionEditor({
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
  const [question, setUpdatedQuestion] = useState(curQuestion);
  const [questionValue, setQuestionValue] = useState(
    question.question_text || ""
  );

  // Submit all changes to parent on update
  const handleUpdate = () => {
    onQuestionUpdate(question);
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

  return (
    <div
      id="wd-true-false-editor"
      className="border border-1 border-dark rounded p-3"
    >
      <div>
        Enter your question text, then select if True or False is the correct
        answer.
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
              <input
                type="radio"
                name="correctAnswer"
                className="me-2"
                checked={answer.is_correct}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <label className="me-2">Possible Answer:</label>
              {answer.answer_text}
            </div>
            <div>
              {answer.is_correct && (
                <FaCheck className="text-success me-3 fs-3" />
              )}
            </div>
          </div>
        ))}
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
