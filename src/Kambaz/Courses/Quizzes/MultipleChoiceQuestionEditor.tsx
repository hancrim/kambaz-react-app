import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPencil, FaTrash, FaCheck, FaPlus } from "react-icons/fa6";
import Editor from "react-simple-wysiwyg";

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
  const [originalQuestion, setOriginalQuestion] = useState(curQuestion);

  // Use an array of booleans instead of an object
  const [editingAnswers, setEditingAnswers] = useState(
    // Initialize all answers to be in editing mode by default
    Array(question.answers.length).fill(false)
  );

  // Keep original question in sync with props
  useEffect(() => {
    setOriginalQuestion({ ...curQuestion });
  }, [curQuestion]);

  // Update parent component whenever question state changes
  useEffect(() => {
    onQuestionUpdate(question);
  }, [question, onQuestionUpdate]);

  // Temporary state to hold answer text while editing
  const [tempAnswerText, setTempAnswerText] = useState("");

  const handleAnswerKeyPress = (
    event: React.KeyboardEvent,
    answerIndex: number
  ) => {
    // Update answer only when Enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission

      // Update the answer with the temporary text
      setUpdatedQuestion({
        ...question,
        answers: question.answers.map((a: any, i: number) => {
          if (i === answerIndex) {
            return { ...a, answer_text: tempAnswerText };
          }
          return a;
        }),
      });

      // Exit editing mode for this answer
      const newEditingAnswers = [...editingAnswers];
      newEditingAnswers[answerIndex] = false;
      setEditingAnswers(newEditingAnswers);
    }
  };

  const handleTempAnswerChange = (value: string) => {
    setTempAnswerText(value);
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

  // Toggle editing for a specific answer
  const toggleEditingForAnswer = (index: number) => {
    const newEditingAnswers = [...editingAnswers];
    newEditingAnswers[index] = !newEditingAnswers[index];
    setEditingAnswers(newEditingAnswers);

    // If enabling editing, set the temporary text to the current answer text
    if (!newEditingAnswers[index]) {
      // If disabling editing without pressing Enter, don't save changes
      setTempAnswerText("");
    } else {
      // If enabling editing, set temporary text to current answer
      const currentAnswer = question.answers[index];
      if (currentAnswer) {
        setTempAnswerText(currentAnswer.answer_text);
      }
    }
  };

  // Reset to original state if curQuestion changes (when parent triggers cancel)
  useEffect(() => {
    setUpdatedQuestion(curQuestion);
    setQuestionValue(curQuestion.question_text || "");
    // Reset editing state for answers when question changes
    if (curQuestion.answers) {
      setEditingAnswers(Array(curQuestion.answers.length).fill(false));
    }
  }, [curQuestion]);

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
            key={index}
          >
            <div className="d-flex align-items-center">
              {questionType === "Multiple Choice" && (
                <input
                  type="radio"
                  id={`wd-correct-answer-${questionNum}-${index}`}
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
                    handleTempAnswerChange(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleAnswerKeyPress(e, index);
                  }}
                  onFocus={() => {
                    setTempAnswerText(answer.answer_text);
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
    </div>
  );
}
