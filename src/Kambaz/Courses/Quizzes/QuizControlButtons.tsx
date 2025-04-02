/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
//import { useState } from "react";
export default function QuizControlButtons({quiz} : any) {
  const [ isPublished, setIsPublished ] = useState(false);
  const handleEdit = () => {
    console.log('go to do quiz details screen');
    // navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
  }
  const handleDelete = () => {
    console.log('delete quiz');
    // remove quiz from database and make sure it updates visually
  }
  const handlePublish = () => {
    console.log('publish quiz');
    setIsPublished(!isPublished);
    // make quiz public
  }


  return (
    <div className="float-end d-flex">
      {/* have on click make button grayed out and also will publish or unpublish quiz */}
      {isPublished && <FaCheckCircle className="text-success" onClick={() => handlePublish()} />}
      {!isPublished && <FaRegCircleXmark className="text-danger" onClick={() => handlePublish()}/>}
      <Dropdown>
        <Dropdown.Toggle variant="" size="lg" id="wd-publish-all-btn">
          <IoEllipsisVertical className="mt-1 fs-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-edit" onClick={handleEdit}>Edit</Dropdown.Item>
          <Dropdown.Item id="wd-delete" onClick={handleDelete}>Delete</Dropdown.Item>
          <Dropdown.Item id="wd-publish" onClick={handlePublish}>Publish</Dropdown.Item>
          {/* <Dropdown.Item id="wd-copy">Copy</Dropdown.Item>
          <Dropdown.Item id="wd-srt">Sort</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
