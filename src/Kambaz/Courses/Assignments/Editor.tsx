export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3>
        <label htmlFor="wd-name">Assignment Name</label>
      </h3>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" cols={40} rows={10}>
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <select id="wd-group">
            <option selected value="ASSIGMENTS">
              ASSIGNMENTS
            </option>
            <option value="GROUP_ONE">GROUP ONE</option>
            <option value="OTHER">OTHER </option>
          </select>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <select id="wd-display-grade-as">
            <option selected value="PERCENTAGE">
              Percentage
            </option>
            <option value="DECIMAL">Decimal</option>
            <option value="FRACTION">Fraction</option>
            <option value="OTHER">Other</option>
          </select>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Sumbission Type</label>
          </td>
          <select id="wd-submission-type">
            <option value="ONLINE">Online</option>
            <option value="IN PERSON">In Person</option>
            <option value="OTHER">Other</option>
          </select>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type"></label>
          </td>
          <br />
          <label>Online Entry Options:</label> <br />
          <input type="checkbox" name="check-type" id="wd-text-entry" />
          <label htmlFor="wd-text-entry">Text Entry</label>
          <br />
          <input type="checkbox" name="check-type" id="wd-website-url" />
          <label htmlFor="wd-website-url">Website URL</label>
          <br />
          <input type="checkbox" name="check-type" id="wd-media-recordings" />
          <label htmlFor="wd-media-recordings">Media Recordings</label>
          <br />
          <input type="checkbox" name="check-type" id="wd-student-annotation" />
          <label htmlFor="wd-student-annotation">Student Annotation</label>
          <br />
          <input type="checkbox" name="check-type" id="wd-file-upload" />
          <label htmlFor="wd-file-upload">File Uploads</label>
          <br />
          <br />
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign To</label>
            <br />
            <input id="wd-assign-to" defaultValue={"Everyone"} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to"></label>
          </td>
          <td align="left" valign="top">
            <br />
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date" defaultValue="2024-05-13" id="wd-due-date" />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from"></label>
          </td>
          <td>
            <table>
              <tr>
                <td>
                  <label htmlFor="wd-available-from">Available From</label>
                </td>
                <td align="left">
                  <label htmlFor="wd-available-until">Until</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="date"
                    defaultValue="2024-05-06"
                    id="wd-available-from"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    defaultValue="2024-05-20"
                    id="wd-available-until"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <hr />
      <table width={"100%"}>
        <tr>
          <td id="wd-submit-btns" align="right">
            <button>Cancel</button>
            &nbsp;
            <button>Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
