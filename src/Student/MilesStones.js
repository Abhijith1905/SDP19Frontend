import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MileStones() {
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
                {" "}
                <Link to="/studentprofile">Profile</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                {" "}
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

      <div className="milestones">
     
        <img
          src="milestone.png"
          alt="Avatar"
          style={{
            width: "80%", // Full width of the container
            height: "100%", // Full height of the container
            objectFit: "cover", // Cover the entire area without distortion
            position: "absolute", // Ensure it is positioned absolutely
            top: 0, // Align to top
            left: 130, // Align to left
          }}
        />
      </div>
    </div>
  );
}
