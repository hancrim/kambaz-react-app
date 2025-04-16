import { Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import Editor from "react-simple-wysiwyg";

export default function TrueFalseQuestionEditor({
  questionNum,
  question,
}: {
  questionNum: any;
  question: any;
}) {
  const handleQuestionChange = (e: any) => {
    console.log("Question changed", e.target.value);
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
                name="correctAnswer"
                className="me-2"
                checked={answer.is_correct}
                onChange={() =>
                  console.log("Correct answer selected:", answer._id)
                }
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
        <Button className="btn-danger mt-2 me-2">Update</Button>
      </div>
    </div>
  );
}
