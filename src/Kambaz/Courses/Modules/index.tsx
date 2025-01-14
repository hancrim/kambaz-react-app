export default function Modules() {
  return (
    <div>
      <div id="wd-mod-btns">
        <button>Collapse All</button>
        &nbsp;
        <button>View Progress</button>
        &nbsp;
        <select id="wd-publish-mods">
          <option selected value="Publish All">
            Publish All
          </option>
          <option value="Spacer">Spacer</option>
          <option value="Spacer1">Spacer</option>
          <option value="Spacer2">Spacer</option>
        </select>
        &nbsp;
        <button>+ Module</button>
      </div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
              <li className="wd-lesson">
                <span className="wd-title">READINGS</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 1 - Introduction
                  </li>
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 2 - Creating Us
                  </li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to Web Development
                  </li>
                  <li className="wd-content-item">
                    Creating an HTTP server with Node.js
                  </li>
                  <li className="wd-content-item">
                    Creating a React Application
                  </li>
                </ul>
              </li>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create user interfaces with HTML
                </li>
                <li className="wd-content-item">Deploy to Netlify</li>
              </ul>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to HTML and the DOM
                  </li>
                  <li className="wd-content-item">
                    Formatting Web content with Headings and
                  </li>
                  <li className="wd-content-item">
                    Formatting Content with Lists and Tables
                  </li>
                </ul>
              </li>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}
