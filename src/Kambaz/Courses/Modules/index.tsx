export default function Modules() {
  return (
    <div>
      <div id="wd-mod-btns">
        <button>Collapse All</button>
        <button>View Progress</button>
        <select id="wd-publish-mods">
          <option selected value="Publish All">
            Publish All
          </option>
          <option value="Spacer">Spacer</option>
          <option value="Spacer1">Spacer</option>
          <option value="Spacer2">Spacer</option>
        </select>
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
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}
