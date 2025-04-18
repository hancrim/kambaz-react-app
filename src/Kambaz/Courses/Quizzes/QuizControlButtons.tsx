/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
//import { useState } from "react";
export default function QuizControlButtons({
  deleteQuiz,
  publishQuiz,
  editQuiz,
  quiz,
}: {
  deleteQuiz: (quizId: string) => void;
  publishQuiz: (quizId: string) => void;
  editQuiz: (quizId: string) => void;
  quiz: any;
}) {
  const [isPublished, setIsPublished] = useState(quiz.is_published);
  const handlePublish = () => {
    publishQuiz(quiz._id);
    setIsPublished(!isPublished);
    // make quiz public
  };

  return (
    <div className="float-end d-flex">
      {/* have on click make button grayed out and also will publish or unpublish quiz */}
      {isPublished && (
        <FaCheckCircle className="text-success mt-3" onClick={handlePublish} />
      )}
      {!isPublished && (
        <FaRegCircleXmark
          className="text-danger mt-3"
          onClick={handlePublish}
        />
      )}
      <Dropdown>
        <Dropdown.Toggle variant="" size="lg" id="wd-publish-all-btn">
          <IoEllipsisVertical className="mt-1 fs-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-edit" onClick={() => editQuiz(quiz._id)}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item id="wd-delete" onClick={() => deleteQuiz(quiz._id)}>
            Delete
          </Dropdown.Item>
          <Dropdown.Item
            id="wd-publish"
            onClick={() => {
              publishQuiz(quiz._id);
              setIsPublished(!isPublished);
            }}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </Dropdown.Item>
          {/* <Dropdown.Item id="wd-copy">Copy</Dropdown.Item>
          <Dropdown.Item id="wd-srt">Sort</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
