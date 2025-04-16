export default function FillInTheBankQuestionEditor({
  questionNum,
  question,
}: {
  questionNum: any;
  question: any;
}) {
  return (
    <div className="border border-1 border-dark rounded p-3">
      <div>Fill In the Blank Question Editor</div>
      <div>{questionNum}</div>
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
