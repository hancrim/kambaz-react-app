import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";

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
          <ListGroup.Item
            key={index}
            className="mb-3 border border-gray rounded-1"
          >
            <div className="mb-2 d-flex">
              <input
                id="wd-question-title"
                className="form-control me-2 w-25"
                type="text"
                value={q.question_title}
              />

              <select
                id={`question-type-${index}`}
                className="form-select w-25"
                value={q.question_type}
                onChange={(e) => {
                  // Handle question type change logic here
                  const newType = e.target.value;
                  q.question_type = newType; // Update the question type
                  // Optionally trigger a state update or dispatch an action
                }}
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True or False">True or False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
              </select>
              <div className="ms-auto d-flex justify-content-end">
                <label
                  htmlFor={`question-points-${index}`}
                  className="d-flex align-items-center me-2 fw-bold"
                >
                  pts:
                </label>
                <input
                  id={`question-points-${index}`}
                  type="number"
                  className="form-control w-25"
                  value={q.question_points}
                />
              </div>
            </div>
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
              <MultipleChoiceQuestionEditor
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
