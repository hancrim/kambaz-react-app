import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  // Function to determine active link status
  const active = (link: string) => {
    if (pathname.includes(link)) {
      return "active border border-0";
    }
    return "text-danger border border-0";
  };

  console.log(currentUser);
  return (
    <div
      id="wd-account-navigation"
      style={{ width: 150 }}
      className="wd list-group fs-5 sticky-top"
    >
      <ListGroup className="wd">
        {links.map((link) => (
          <ListGroup.Item
            key={link}
            as={Link}
            to={`/Kambaz/Account/${link}`}
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
        {currentUser && currentUser.role === "ADMIN" && (
          <ListGroup.Item
            as={Link}
            to={`/Kambaz/Account/Users`}
            className={`list-group-item ${active("Users")}`}
          >
            Users
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}
