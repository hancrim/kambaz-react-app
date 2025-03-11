import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { useSelector } from "react-redux";
export default function LessonControlButtons() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";

  return (
    <div className="float-end">
      {isFaculty && (
        <div>
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-4" />
        </div>
      )}
    </div>
  );
}
