/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaBookmark } from "react-icons/fa";
const QuestionBox = ({
  questionNum,
  question,
  chosenAnswers,
  setChosenAnswers,
}: {
  questionNum: number;
  question: any;
  chosenAnswers: string[];
  setChosenAnswers: (answers: any[]) => void;
}) => {
  const requiresInputBox = question.type === "Fill in the Blank";

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...chosenAnswers];
    newAnswers[questionNum - 1] = index.toString(); 
    // store all answers as strings 
    // maybe not a great choice? but better than managing two distinct types IMO
    setChosenAnswers(newAnswers);
  };

  const handleTextInputChange = (e: any) => {
    const newAnswers = [...chosenAnswers];
    newAnswers[questionNum - 1] = e.target.value;
    setChosenAnswers(newAnswers);
  };

  const isAnswerSelected = (index: number) => {
    return chosenAnswers[questionNum - 1] === index.toString();
  };

  return (
    <Row className="align-items-start">
      <Col xs="auto" className="pt-2 pe-0">
        <FaBookmark></FaBookmark>
      </Col>

      <Col>
        <Container fluid className="border border-black d-flex flex-column">
          <Row
            className="bg-light border-bottom border-black align-items-center"
            style={{ height: "15%" }}
          >
            <Col className="p-2 text-center">
              <h4>Question {questionNum}</h4>
            </Col>
          </Row>

          <Row className="bg-white" style={{ height: "20%", padding: "1rem" }}>
            <Col>{question.body || "question body"}</Col>
          </Row>

          <Row
            className="bg-white"
            style={{ height: "15%", padding: "1rem", overflowY: "auto" }}
          >
            <Col>
              <ListGroup>
                {requiresInputBox ? (
                  <ListGroup.Item>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your answer"
                      value={chosenAnswers[questionNum - 1] || ""}
                      onChange={handleTextInputChange}
                    />
                  </ListGroup.Item>
                ) : (
                  <div>
                    {question.answers.map((answer: any, index: any) => (
                      <ListGroup.Item
                        key={index}
                        className={`d-flex align-items-center`}
                        role="button"
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <input
                          type="radio"
                          name={`wd-question-${questionNum}`}
                          id={`wd-question-${questionNum}-answer-${index}`}
                          checked={isAnswerSelected(index)}
                          onChange={() => handleAnswerSelect(index)}
                          className="me-2"
                        />
                        <label
                          htmlFor={`wd-question-${questionNum}-answer-${index}`}
                          className="mb-0 flex-grow-1"
                        >
                          {answer.answer_text}
                        </label>
                      </ListGroup.Item>
                    ))}
                  </div>
                )}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default QuestionBox;
