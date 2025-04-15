export default function TrueFalseQuestionEditor({
  questionNum,
  question,
}: {
  questionNum: any;
  question: any;
}) {
  return (
    <div
      id="wd-true-false-editor"
      className="border border-1 border-dark rounded p-3"
    >
      <div>True False Question Editor</div>
      <div>{questionNum}</div>
      <div>{question.type}</div>
      <div>
        {question.answers.map((answer: any) => (
          <div>
            <div>Possible Answer: {answer.answer_text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
