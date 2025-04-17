// Screen that contains the quiz details editor and the quiz question editor

import { useParams } from "react-router-dom";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionEditor from "./QuizQuestionEditor";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  const isPublished = (currentQuiz && currentQuiz.isPublished) || false;

  const [activeTab, setActiveTab] = useState("details");

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center">
        <div className="me-3 fs-4">
          Points {currentQuiz && currentQuiz.points}
        </div>

        <div
          className="me-3 fs-5"
          style={{ color: isPublished ? "black" : "gray" }}
        >
          {isPublished ? "Published" : "Not Published"}
        </div>
        {isPublished ? (
          <FaCheck className="me-3 fs-3" style={{ color: "green" }} />
        ) : (
          <CiNoWaitingSign
            className="me-3 fs-3"
            style={{ color: "lightgray" }}
          />
        )}
        <Button className="btn-light border border-black">
          <IoEllipsisVertical className="mt-1 fs-4" />
        </Button>
      </div>
      <hr />

      <div className="d-flex justify-content-start mb-3">
        <button
          className={`btn ${
            activeTab === "details"
              ? "btn-white border-top border-start border-end"
              : "btn-white border-0 text-danger"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Quiz Details
        </button>
        <button
          className={`btn ${
            activeTab === "questions"
              ? "btn-white border-top border-start border-end"
              : "btn-white border-0 text-danger"
          }`}
          onClick={() => setActiveTab("questions")}
        >
          Quiz Questions
        </button>
      </div>
      {activeTab === "details" ? (
        <QuizDetailsEditor />
      ) : (
        <QuizQuestionEditor curQuiz={currentQuiz} />
      )}
    </div>
  );
}
