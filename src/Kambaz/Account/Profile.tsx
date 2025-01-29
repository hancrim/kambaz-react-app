import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form.Control
        defaultValue="alice"
        placeholder="username"
        id="wd-username"
        className="mb-2"
      />

      <Form.Control
        defaultValue="123"
        placeholder="password"
        type="password"
        className="wd-password"
      />

      <Form.Control
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2"
      />

      <Form.Control
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2"
      />

      <Form.Control
        className="mb-2"
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
      />

      <Form.Control
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="mb-2"
      />
      <Form.Select className="mb-2" id="wd-user-type">
        <option selected>Faculty</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="STUDENT">Student</option>
      </Form.Select>
      <Link
        id="wd-signout-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mb-2"
      >
        Sign Out{" "}
      </Link>
    </div>
  );
}
