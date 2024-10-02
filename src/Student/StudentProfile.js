import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./studentnavbar.css";

export default function StudentProfile() {
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

      <div>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "300",
          marginTop: "20px",
        }}
      >
        Student Profile
      </h1>

       <div className="profile-card"
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          margin: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  color: "black", // Change font color to black
                }}
              >
                Field
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  color: "black", // Change font color to black
                }}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", color: "black",  padding: "10px" }}>
                <strong>Id:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",  color: "black", padding: "10px" }}>
                2200031277
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", color: "black",  padding: "10px" }}>
                <strong>Name:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",  color: "black", padding: "10px" }}>
                K. Abhijith
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd",  color: "black", padding: "10px" }}>
                <strong>Gender:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",  color: "black", padding: "10px" }}>
                Male
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", color: "black",  padding: "10px" }}>
                <strong>Department:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",  color: "black", padding: "10px" }}>
                CSE-H
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd",color: "black",  padding: "10px" }}>
                <strong>Program:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",color: "black",  padding: "10px" }}>
                B.TECH
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                <strong>Semester:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",color: "black",  padding: "10px" }}>
                5
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd",color: "black",padding: "10px" }}>
                <strong>Year:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",color: "black",padding: "10px" }}>
                3
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd",color: "black", padding: "10px" }}>
                <strong>Date of Birth:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",color: "black",padding: "10px" }}>
                19-08-2005
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd",color: "black",padding: "10px" }}>
                <strong>Email:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",color: "black",padding: "10px" }}>
                2200031277@kluniversity.in
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd",color: "black", padding: "10px" }}>
                <strong>Contact:</strong>
              </td>
              <td style={{ border: "1px solid #ddd",color: "black",padding: "10px" }}>
                9392530625
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
