import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
export default function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <h2>Hannah Crimmins</h2>
      <h3>CS4550 02 Spring 2025</h3>
      <div id="wd-github">
        <h4>
          {"Click here for "}
          <a href="https://github.com/hancrim/kambaz-react-app" id="wd-github">
            GitHub Repo
          </a>
        </h4>
      </div>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
