import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInTheBankQuestionEditor from "./FillInTheBlankQuestionEditor";

// import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";

export default function QuizQuestionEditor() {
  const { cid, qid } = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  const quiz = currentQuiz || {
    _id: "new",
    title: "Example Quiz",
    description: "Example description",
    instructions: "Take the quiz using a calculator",
    course: cid,
    quiz_type: "Graded Quiz",
    assignment_group: "Quizzes",
    shuffle_answers: true,
    has_time_limit: true,
    time_limit: 20,
    allow_multiple_attempts: true,
    num_attempts: 3,
    show_correct_answers: true,
    show_correct_answers_date: "2025-05-14",
    access_code: "",
    one_question_at_time: true,
    webcam_required: false,
    lock_questions_after_answering: false,
    is_published: true,
    due_date: "2025-05-13",
    avail_date: "2025-05-06",
    until_date: "2025-05-14",
    questions: [],
  };

  return (
    <div>
      <h1>Questions</h1>
      <ListGroup>
        {quiz.questions.map((q: any, index: any) => (
          <ListGroup.Item key={index} className="mb-3 border-0">
            {q.question_type === "Multiple Choice" && (
              <MultipleChoiceQuestionEditor
                questionNum={index + 1}
                question={{
                  body: q.question_text,
                  type: q.question_type,
                  answers: q.answers,
                }}
              />
            )}
            {q.question_type === "True or False" && (
              <TrueFalseQuestionEditor
                questionNum={index + 1}
                question={{
                  body: q.question_text,
                  type: q.question_type,
                  answers: q.answers,
                }}
              />
            )}
            {q.question_type === "Fill in the Blank" && (
              <FillInTheBankQuestionEditor
                questionNum={index + 1}
                question={{
                  body: q.question_text,
                  type: q.question_type,
                  answers: q.answers,
                }}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
