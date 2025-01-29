import { IoEllipsisVertical } from "react-icons/io5";

import { BsPlus } from "react-icons/bs";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <span
        style={{
          border: "2px solid gray",
          borderRadius: "15px",
          borderWidth: "3px",
          padding: "5px",
        }}
      >
        40% of Total
      </span>
      <BsPlus className="fs-2 gray" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
