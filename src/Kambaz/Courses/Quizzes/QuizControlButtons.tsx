import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { Dropdown } from "react-bootstrap";
//import { useState } from "react";
export default function QuizControlButtons() {
  return (
    <div className="float-end d-flex">
      {/* have on click make button grayed out and also will publish or unpublish quiz */}
      <GreenCheckmark />
      <Dropdown>
        <Dropdown.Toggle variant="" size="lg" id="wd-publish-all-btn">
          <IoEllipsisVertical className="mt-1 fs-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-edit">Edit</Dropdown.Item>
          <Dropdown.Item id="wd-delete">Delete</Dropdown.Item>
          <Dropdown.Item id="wd-publish">Publish</Dropdown.Item>
          <Dropdown.Item id="wd-copy">Copy</Dropdown.Item>
          <Dropdown.Item id="wd-srt">Sort</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
