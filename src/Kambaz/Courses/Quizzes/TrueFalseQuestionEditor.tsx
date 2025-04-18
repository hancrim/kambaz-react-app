import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import Editor from "react-simple-wysiwyg";

export default function TrueFalseQuestionEditor({
  questionNum,
  curQuestion,
  onQuestionUpdate,
}: {
  questionNum?: any;
  curQuestion: any;
  onQuestionUpdate: (updatedQuestion: any) => void;
}) {
  const [question, setUpdatedQuestion] = useState(curQuestion);
  const [questionValue, setQuestionValue] = useState(
    curQuestion.question_text || ""
  );

  // Track if we need to notify parent of changes
  const [shouldNotifyParent, setShouldNotifyParent] = useState(false);

  // Update local state when parent props change (e.g., for cancel)
  useEffect(() => {
    // Prevent infinite loop by directly setting state without triggering notification
    setUpdatedQuestion(curQuestion);
    setQuestionValue(curQuestion.question_text || "");
    setShouldNotifyParent(false); // Reset notification flag
  }, [curQuestion]);

  // Only notify parent when we explicitly set the flag
  useEffect(() => {
    if (shouldNotifyParent) {
      onQuestionUpdate(question);
      setShouldNotifyParent(false); // Reset flag after notification
    }
  }, [shouldNotifyParent, question, onQuestionUpdate]);

  const handleCorrectAnswerChange = (answerIndex: number) => {
    const updatedQuestion = {
      ...question,
      answers: question.answers.map((a: any, i: number) => ({
        ...a,
        is_correct: i === answerIndex, // Only the selected answer is true
      })),
    };

    setUpdatedQuestion(updatedQuestion);
    setShouldNotifyParent(true); // Set flag to notify parent
  };

  const handleQuestionTextChange = (e: any) => {
    const newValue = e.target.value;
    setQuestionValue(newValue);

    setUpdatedQuestion({
      ...question,
      question_text: newValue,
    });

    setShouldNotifyParent(true); // Set flag to notify parent
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
            key={index}
          >
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id={`wd-correct-answer-${questionNum}-${index}`}
                name={`correctAnswer-${questionNum}`}
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
    </div>
  );
}
