import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/green.jpeg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1555/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/mountain.jpg" width={200} />
            <div>
              <h5> IS1555 Design </h5>
              <p className="wd-dashboard-course-title">Design Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3450/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/sunset.jpg" width={200} />
            <div>
              <h5> IS1555 Design </h5>
              <p className="wd-dashboard-course-title">Design Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/ENGW1500Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/light_blue.jpeg" width={200} height={150} />
            <div>
              <h5> First-Year Writing </h5>
              <p className="wd-dashboard-course-title">Design Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/2500/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/light_pink.png" width={200} height={150} />
            <div>
              <h5> CS2500 Fundies </h5>
              <p className="wd-dashboard-course-title">Design Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3800/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/light_green.jpeg" width={200} height={150} />
            <div>
              <h5> IS3800 Empirical Research Methods </h5>
              <p className="wd-dashboard-course-title">Design Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/5200/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/water.jpg" height={150} width={200} />
            <div>
              <h5> CS5200 Graduate Algorithms </h5>
              <p className="wd-dashboard-course-title">Design Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
