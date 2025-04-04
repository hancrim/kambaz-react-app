import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import { Provider } from "react-redux";
import store from "./store";

export default function Labs() {
  return (
    <Provider store={store}>
      <div>
        <h1>Labs</h1>
        <h2>Hannah Crimmins</h2>
        <h3>CS4550 02 Spring 2025</h3>
        <TOC />
        <Routes>
          <Route path="/" element={<Navigate to="Lab1" />} />
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4" element={<Lab4 />} />
          <Route path="Lab5" element={<Lab5 />} />
        </Routes>
        <div id="wd-github" className="ms-2">
          <h4>GitHub Repo</h4>
          {"Please "}
          <a href="https://github.com/hancrim/kambaz-react-app" id="wd-github">
            click here
          </a>
          {" to get GitHub Repo"}
          <br />
        </div>
      </div>
    </Provider>
  );
}
