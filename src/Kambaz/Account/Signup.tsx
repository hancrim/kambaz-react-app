import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <Form.Control id="wd-username" placeholder="username" className="mb-2" />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      {/* <Form.Control
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
      /> */}
      <Link className="btn btn-primary w-100 mb-2" to="/Kambaz/Account/Profile">
        {" "}
        Sign up{" "}
      </Link>
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
