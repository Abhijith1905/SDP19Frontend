import React from "react";
import { Link,  useNavigate } from "react-router-dom";
import "./studentnavbar.css";

export default function StudentHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <div className="navbar">
          <h3 style={{ fontSize: "20pt", color: "White", marginLeft: 0 }}>
            EduSupport
          </h3>
          <table className="menu">
            <td>
              <button>
                <Link to="/studenthome">Home</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/studentprofile">Profile</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/portfolio">Portfolio</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                {" "}
                <Link to="/projects">Projects</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button onClick={handleLogout}>Logout</button>
            </td>
          </table>
        </div>
      </nav>

      <div className="content-container">
        <div className="text-content">
          <h2>A GOAL</h2>
          <h2>WITHOUT A PLAN</h2>
          <h2>IS JUST A WISH</h2>
          <p>
            EduSupport is a Portfolio and Project Management System which will
            enhance the academic experience of students by enabling them to
            showcase their projects and portfolios. The platform allows students
            to upload projects, including detailed descriptions and media. This
            makes it easier for students to present their work and achievements
            in an organized manner.
          </p>
          <center>
            <button className="get-started">Get Started</button>
          </center>
        </div>
        <img src="now.png" alt="Illustration" className="illustration1" />
      </div>
    </div>
  );
}
