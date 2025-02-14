import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
export default function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 sticky-top">
      <ListGroup className="wd">
        {links.map((link) => (
          <ListGroup.Item
            key={link}
            as={Link}
            to={`/Kambaz/Courses/${cid}/${link}`}
            className={`list-group-item 
              ${
                pathname.includes(link)
                  ? "active border border-0"
                  : "text-danger border border-0"
              }`}
          >
            {link}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
