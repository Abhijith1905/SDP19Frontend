import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./login.css"; // Assuming your CSS is in this file

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [facultyFormData, setFacultyFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleFacultySignInClick = () => {
    setRightPanelActive(true);
  };

  const handleStudentSignInClick = () => {
    setRightPanelActive(false);
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "student") {
      setStudentFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFacultyFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStudentLoginSubmit = (e) => {
    e.preventDefault();

    const { email, username, password } = studentFormData;

    // Hardcoded credentials for the student
    const validStudentCredentials = {
      email: "student@gmail.com",
      username: "student",
      password: "student",
    };

    // Check if the input values match the hardcoded student credentials
    if (
      email === validStudentCredentials.email &&
      username === validStudentCredentials.username &&
      password === validStudentCredentials.password
    ) {
      const studentData = {
        email: email,
        username: username,
        role: "student",
      };

      localStorage.setItem("student", JSON.stringify(studentData));
      navigate("/studenthome");
    } else {
      setMessage("Login Failed: Invalid student credentials");
      setError("");
    }
  };

  const handleFacultyLoginSubmit = (e) => {
    e.preventDefault();

    const { email, username, password } = facultyFormData;

    // Hardcoded credentials for the faculty
    const validFacultyCredentials = {
      email: "admin@gmail.com",
      username: "admin",
      password: "admin",
    };

    // Check if the input values match the hardcoded faculty credentials
    if (
      email === validFacultyCredentials.email &&
      username === validFacultyCredentials.username &&
      password === validFacultyCredentials.password
    ) {
      const facultyData = {
        email: email,
        username: username,
        role: "faculty",
      };

      localStorage.setItem("faculty", JSON.stringify(facultyData));
      navigate("/facultyhome");
    } else {
      setMessage("Login Failed: Invalid faculty credentials");
      setError("");
    }
  };

  return (
    <div>
      <center>
        <h1 style={{ color: "white" }}>Login</h1>
      </center>
      <br />
      <br />
      <div
        className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleFacultyLoginSubmit}>
            <h2>Faculty Login</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={facultyFormData.username}
              onChange={(e) => handleInputChange(e, "faculty")}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={facultyFormData.email}
              onChange={(e) => handleInputChange(e, "faculty")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={facultyFormData.password}
              onChange={(e) => handleInputChange(e, "faculty")}
            />
            <span>Forgot your password?</span>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleStudentLoginSubmit}>
            <h2>Student Login</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={studentFormData.username}
              onChange={(e) => handleInputChange(e, "student")}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={studentFormData.email}
              onChange={(e) => handleInputChange(e, "student")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={studentFormData.password}
              onChange={(e) => handleInputChange(e, "student")}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hey, Are you a Student!</h1>
              <p>Click here if you are</p>
              <button
                className="ghost"
                onClick={handleStudentSignInClick}
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Are you Faculty!</h1>
              <p>Click here if you are</p>
              <button
                className="ghost"
                onClick={handleFacultySignInClick}
                id="signUp"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      {message && <div style={{ color: "red" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Login;
