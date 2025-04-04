import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <Nav variant="pills" id="wd-toc">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab1"
          id="wd-a1"
          active={pathname.includes("Lab1")}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="#/Labs/Lab2"
          id="wd-a2"
          active={pathname.includes("Lab2")}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="#/Labs/Lab3"
          id="wd-a3"
          active={pathname.includes("Lab3")}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="#/Labs/Lab4"
          id="wd-a4"
          active={pathname.includes("Lab4")}
        >
          Lab 4
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="#/Labs/Lab5"
          id="wd-a5"
          active={pathname.includes("Lab5")}
        >
          Lab 5
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/Kambaz">Kambaz</Nav.Link>
      </Nav.Item>
      <Nav.Item id="wd-github">
        <Nav.Link href="https://github.com/hancrim">My GitHub</Nav.Link>
      </Nav.Item>
      <Nav.Item id="wd-github">
        <Nav.Link href="https://github.com/hancrim/kambaz-node-server-app">
          My Server GitHub
        </Nav.Link>
      </Nav.Item>
      <Nav.Item id="wd-github">
        <Nav.Link href="https://github.com/hancrim/kambaz-react-app">
          My App GitHub
        </Nav.Link>
      </Nav.Item>
      <Nav.Item id="wd-github">
        <Nav.Link href="https://dashboard.render.com/web/srv-cvichah5pdvs738kv3s0">
          My Render Server
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
