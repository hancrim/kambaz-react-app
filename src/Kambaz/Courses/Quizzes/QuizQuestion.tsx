/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaBookmark } from "react-icons/fa";
const QuestionBox = ({
  currentQuestion,
  question,
}: {
  currentQuestion: any;
  question: any;
}) => {
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
                  <ListGroup.Item key={index}>
                    {answer.answer_text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default QuestionBox;
