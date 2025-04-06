/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const QuestionBox = ({
  currentQuestion,
  question,
}: {
  currentQuestion: any;
  question: any;
}) => {
  return (
    <div>
    <Container
      fluid
      className="border border-black d-flex flex-column"
    >
      <Row
        className="bg-light border-bottom border-black align-items-center justify-content-right"
        style={{ height: "15%" }}
      >
        <Col className="p-2 justify content-center alighn-items-center">
          <h4>Question {currentQuestion}</h4>
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
            {question.answers.map((answer: any, index: any) => (
              <ListGroup.Item key={index}>{answer.answer_text}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default QuestionBox;
