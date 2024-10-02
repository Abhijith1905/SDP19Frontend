import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };

  const [projectFiles, setProjectFiles] = useState(null);


  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Project Files:", projectFiles);
  };

  return (
    <div style={styles.page}>
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
        <div style={styles.uploadSection}>
          <h2>UPLOAD</h2>
          <div style={styles.uploadBox}>
            <label>Enter Project name</label>
            <input type="text" />
            <label>Upload Project files</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setProjectFiles)}
            />
            <center>
              {" "}
              <button onClick={handleUpload} style={styles.button}>
                UPLOAD
              </button>
            </center>
          </div>
          <div style={styles.uploadBox}>
            <label>Upload Additional info : </label>
            <Link to="/uploadprojectfurther">
              <button style={styles.button}>CLICK HERE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1e3d6b",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#003366",
  },
  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
  },
  link: {
    color: "white",
    margin: "0 10px",
    textDecoration: "none",
  },
  active: {
    color: "#c0c0c0",
  },
  uploadSection: {
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "350px",
    margin: "0 auto",
  },
  uploadBox: {
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default CreatePage;
