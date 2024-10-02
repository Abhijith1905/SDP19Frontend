import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./facultynavbar.css";

const Review = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("faculty");

    navigate("/login");
    window.location.reload();
  };

  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Rating: ", rating);
    console.log("Comments: ", comments);
  };

  // Inline CSS styles
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",

      color: "white",
      margin: 0,
      padding: 0,
      textAlign: "center",
    },

    container: {
      padding: "20px",
      textAlign: "center",
    },
    form: {
      backgroundColor: "#ffffff",
      borderRadius: "8px", // Added rounded edges
      padding: "50px",
      width: "500px",
      margin: "40px auto",
    },
    label: {
        display: "block",
        marginBottom: "10px",
        color: "black",
        fontWeight: "bold", // Added font weight for bold text
      },
      
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px", // Added rounded edges
      border: "1px solid #ccc",
      backgroundColor: "#003366",
      color: "white",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      height: "120px",
      marginBottom: "15px",
      borderRadius: "8px", // Added rounded edges
      border: "1px solid #ccc",
      resize: "none",
      backgroundColor: "#003366",
      color: "white",
    },

    placeholder: {
      color: "#fffff" /* Change the placeholder color to white */,
    },

    submitButton: {
      backgroundColor: "#d2b48c", // Light brown color
      color: "black",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px", // Added rounded edges
      cursor: "pointer",
      fontSize: "16px",
    },
    submitButtonHover: {
      backgroundColor: "#c19a6b",
    },
  };

  return (
    <div style={styles.body}>
      <nav>
        <div className="navbar">
          <h3 style={{ fontSize: "20pt", color: "White", marginLeft: 0 }}>
            EduSupport
          </h3>
          <table className="menu">
            <td>
              <button>
                <Link to="/facultyhome" style={styles.navLink}>
                  Home
                </Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/facultydashboard" style={styles.navLink}>
                  Feedback
                </Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/facultydashboard" style={styles.navLink}>
                  Students
                </Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button onClick={handleLogout} style={{ color: "black" }}>
                Logout
              </button>
            </td>
          </table>
        </div>
      </nav>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="rating" style={styles.label}>
          Rating (out of 5)
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.input}
        >
          <option value="" disabled>
            Select a rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="comments" style={styles.label}>
          Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your comments here"
          style={styles.textarea}
        ></textarea>

  {/* Adding styles for placeholder color */}
  <style>
          {`
            textarea::placeholder {
              color: white; /* Placeholder color */
            }
          `}
        </style>
        
        <button
          type="submit"
          style={styles.submitButton}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.submitButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.submitButton.backgroundColor)
          }
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
