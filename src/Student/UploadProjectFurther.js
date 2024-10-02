import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UploadProjectFurther = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };

  const [projectImages, setProjectImages] = useState(null);
  const [descriptionPDF, setDescriptionPDF] = useState(null);
  const [workingVideo, setWorkingVideo] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Project Images:", projectImages);
    console.log("Description PDF:", descriptionPDF);
    console.log("Working Video:", workingVideo);
  };

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#1e3d6b",
      color: "white",
      padding: "20px",
      textAlign: "center",
    },

    logo: {
      fontSize: "1.5em",
      fontWeight: "bold",
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
    cloudUpload: {
      marginTop: "20px",
    },
    cloudButton: {
      width: "100%",
      padding: "15px",
      fontSize: "1.1em",
    },
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
            <label>Upload Project images</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setProjectImages)}
            />
          </div>
          <div style={styles.uploadBox}>
            <label>Upload Description PDF</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setDescriptionPDF)}
            />
          </div>
          <div style={styles.uploadBox}>
            <label>Upload Working Video</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setWorkingVideo)}
            />
          </div>
          <div style={styles.cloudUpload}>
            <button style={{ ...styles.button, ...styles.cloudButton }}>
              CLICK HERE TO UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProjectFurther;
