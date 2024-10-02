import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewStudents = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("isFacultyLoggedIn");
      localStorage.removeItem("faculty");
      navigate("/login");
      window.location.reload();
    };

  const [students, setStudents] = useState([
    { username: "Janaki", id: 101, email: "janu@gmail.com" },
    { username: "Nandini", id: 102, email: "nandu@gmail.com" },
    { username: "Abhi", id: 103, email: "abhi@gmail.com" },
    { username: "Raja", id: 104, email: "raj@gmail.com" },
    { username: "Easwar", id: 105, email: "easwar@gmail.com" },
    { username: "Teja", id: 106, email: "tej@gmail.com" },
  ]);

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const styles = {
    container: {
      width: "90%",
      margin: "20px auto",
      textAlign: "left",
    },
    heading: {
      fontSize: "2em",
      color: "white",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#0B3D91",
      color: "white",
      marginBottom: "20px",
    },
    th: {
      backgroundColor: "#063970",
      color: "white",
      padding: "15px",
      border: "1px solid #ddd",
      fontWeight: "bold",
    },
    td: {
      padding: "15px",
      border: "1px solid #ddd",
    },
    deleteButton: {
      padding: "10px 20px",
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "1em",
    },
    deleteButtonHover: {
      backgroundColor: "#d32f2f",
    },
    link: {
      textDecoration: "none",
      color: "#2196F3",
      fontWeight: "bold",
    },
    row: {
      backgroundColor: "#083759",
    },
  };

  return (
    <div>
      <nav>
        <div className="navbar">
          <h3 style={{ fontSize: "20pt", color: "White", marginLeft: 0 }}>
            EduSupport
          </h3>
          <table className="menu">
            <tbody>
              <tr>
                <td>
                  <button>
                    <Link to="/facultyhome">Home</Link>
                  </button>
                  &nbsp;&nbsp;
                </td>
                <td>
                  <button>
                    <Link to="/facultydashboard">Feedback</Link>
                  </button>
                  &nbsp;&nbsp;
                </td>
                <td>
                  <button>
                    <Link to="/facultydashboard">Students</Link>
                  </button>
                  &nbsp;&nbsp;
                </td>
                <td>
                  <button onClick={handleLogout}>Logout</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </nav>
    <div style={styles.container}>
      <h2 style={styles.heading}>View All Students</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Id</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Projects</th>
            <th style={styles.th}>Portfolio</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={styles.row}>
              <td style={styles.td}>{student.username}</td>
              <td style={styles.td}>{student.id}</td>
              <td style={styles.td}>{student.email}</td>
              <td style={styles.td}>
                <Link to="/projectscheck" style={styles.link}>
                  View Projects
                </Link>
              </td>
              <td style={styles.td}>
                <Link to="/portfoliocheck2" style={styles.link}>
                  View Portfolio
                </Link>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.deleteButton}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor =
                      styles.deleteButtonHover.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor =
                      styles.deleteButton.backgroundColor)
                  }
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewStudents;
