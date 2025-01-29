import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign In</h1>
      <Form.Control id="wd-username" placeholder="username" className="mb-2" />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Link
        id="wd-signin-btn"
        to="/Kambaz/Dashboard"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in{" "}
      </Link>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
