import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPencil, FaTrash, FaCheck, FaPlus } from "react-icons/fa6";
import Editor from "react-simple-wysiwyg";
// import { useNavigate, useParams } from "react-router-dom";

export default function MultipleChoiceQuestionEditor({
  questionNum,
  question,
}: {
  questionNum: any;
  question: any;
}) {
  const questionType = question.question_type;
  const handleQuestionChange = (e: any) => {
    console.log("Question changed", e.target.value);
  };
  const [editingAnswer, setEditingAnswer] = useState(false);
  return (
    <div
      id="wd-multiple-choice-editor"
      className="border border-1 border-dark rounded p-3"
    >
      <div>
        {questionType == "Multiple Choice" && (
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
        value={question.body || "Enter question here"}
        onChange={handleQuestionChange}
      />
      <b className="pt-1 mt-2 d-block">Answers:</b>
      <div>
        {question.answers.map((answer: any) => (
          <div
            className="border border-1 border-secondary rounded p-2 mb-2 d-flex align-items-center justify-content-between"
            key={answer._id}
          >
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id={`wd-correct-answer-${questionNum}`}
                name={`correctAnswer-${questionNum}`}
                className="me-2"
                checked={answer.is_correct}
                onChange={() =>
                  console.log("Correct answer selected:", answer._id)
                }
              />
              <label className="me-2">Possible Answer:</label>
              {editingAnswer && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    // add change TODO
                    console.log("Answer changed", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // save change TODO
                      console.log("Answer changed", e.target);
                    }
                  }}
                  defaultValue={answer.answer_text}
                />
              )}
              {!editingAnswer && answer.answer_text}
            </div>
            <div>
              {answer.is_correct && (
                <FaCheck className="text-success me-3 fs-3" />
              )}
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => setEditingAnswer(!editingAnswer)}
              >
                <FaPencil />
              </Button>
              <Button
                variant="outline-danger"
                // TODO DELETE
                onClick={() => console.log("Delete clicked for", answer._id)}
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
            // TODO ADD ANSWER
            console.log("Add answer clicked");
          }}
        >
          <FaPlus className="me-2" />
          Add Another Answer
        </Button>
      </div>

      <div>
        <Button className="btn-secondary mt-2 me-2">Cancel</Button>
        <Button className="btn-danger mt-2 me-2">Update</Button>
      </div>
    </div>
  );
}
