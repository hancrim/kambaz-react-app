import { Button } from "react-bootstrap";
import Editor from "react-simple-wysiwyg";
// import { useNavigate, useParams } from "react-router-dom";

export default function MultipleChoiceQuestionEditor({
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
      id="wd-multiple-choice-editor"
      className="border border-1 border-dark rounded p-3"
    >
      <div>Multiple Choice Question Editor</div>
      <hr />
      <div>
        Enter your question and multiple answers, then select the correct
        answer.
      </div>
      <b className="pb-1 mb-2 d-block">Question:</b>
      <Editor
        id="wd-quiz-instructions"
        value={question._id || "Enter question here"}
        onChange={handleQuestionChange}
      />
      <b className="pt-1 mt-2 d-block">Answers:</b>
      <div>
        {question.answers.map((answer: any) => (
          <div>
            <label className="me-2">Possible Answer:</label>
            <input
              type="text"
              value={answer.answer_text}
              onChange={(e) => {
                answer.answer_text = e.target.value;
                console.log("Answer changed", answer.answer_text);
              }}
            />
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
