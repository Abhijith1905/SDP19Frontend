import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./facultynavbar.css"; // Import your CSS file here

const AddStudent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("faculty");
    navigate("/login");
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      studentID: e.target.studentID.value,
      studentName: e.target.studentName.value,
      studentGender: e.target.studentGender.value,
      studentDepartment: e.target.studentDepartment.value,
      studentProgram: e.target.studentProgram.value,
      studentEmail: e.target.studentEmail.value,
      studentAddress: e.target.studentAddress.value,
      studentContact: e.target.studentContact.value,
    };

    console.log(studentData); // You can send this data to your backend or handle it as needed

    e.target.reset(); // Resetting the form
  };

  // Increased width for the form container
  const formStyle = {
    maxWidth: "800px", // Increased width
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ecf0f1", // Light grey background
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #bdc3c7", // Light grey border
    borderRadius: "5px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: "#3498db", // Light blue background
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2980b9", // Darker blue on hover
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

      <div className="main" style={formStyle}>
        {/* Add Student heading with black color, moved down by 1.5 inches */}
        <h2 style={{ textAlign: "center", margin: "48px 0 20px 0", color: "black" }}>Add Student</h2>
        
        <form id="createStudentForm" onSubmit={handleSubmit}>
          <input type="text" id="studentID" placeholder="Student ID" style={inputStyle} required />
          <input
            type="text"
            id="studentName"
            placeholder="Student Name"
            style={inputStyle}
            required
          />
          <select id="studentGender" style={inputStyle} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            id="studentDepartment"
            placeholder="Department"
            style={inputStyle}
            required
          />
          <input
            type="text"
            id="studentProgram"
            placeholder="Program"
            style={inputStyle}
            required
          />
          <input
            type="email"
            id="studentEmail"
            placeholder="Email Address"
            style={inputStyle}
            required
          />
          <textarea
            id="studentAddress"
            placeholder="Address"
            rows="3"
            style={{
              ...inputStyle,
              resize: "none", // Prevents resizing
              width: "100%", // Ensures it takes the full width of the container
            }}
            required
            readOnly // Make it non-editable
          ></textarea>
          <input
            type="text"
            id="studentContact"
            placeholder="Contact Number"
            style={inputStyle}
            required
          />
          <button type="submit" className="btn" style={buttonStyle} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}>
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
