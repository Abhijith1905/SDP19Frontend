import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import FacultyHome from "./../Faculty/FacultyHome";
import StudentHome from "./../Student/StudentHome";
import "./navbar.css";
import StudentProfile from "../Student/StudentProfile";
import StudentPortfolio from "../Student/StudentPortfolio";
import StudentProject from "./../Student/StudentProjects";
import CreateProject from "./../Student/CreateProject";
import UploadProjectFurther from "./../Student/UploadProjectFurther"; 

import FacultyDashboard from "../Faculty/FacultyDashboard";
import PortfolioCheck from "./../Faculty/PortfolioCheck";
import PortfolioCheck2 from "./../Faculty/PortfolioCheck2";
import ProjectCheck from "./../Faculty/ProjectCheck";
import AddStudent from "../Faculty/AddStudent";
import UpdateStudent from "../Faculty/UpdateStudents";
import ViewStudents from "../Faculty/ViewStudents";
import MileStones from "../Student/MilesStones";
import Review from "../Faculty/Review";

export default function MainNavBar({ onStudentLogin, onFacultyLogin }) {
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
                <Link to="/">Home</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                {" "}
                <Link to="/about">About</Link>{" "}
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/contact">Contact</Link>{" "}
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/login">Login</Link>
              </button>
              &nbsp;&nbsp;
            </td>
          </table>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route
          path="/login"
          element={
            <Login
              onStudentLogin={onStudentLogin}
              onFacultyLogin={onFacultyLogin}
            />
          }
          exact
        />

        <Route path="/studenthome" element={<StudentHome />} exact />
        <Route path="/studentprofile" element={<StudentProfile />} exact />
        <Route path="/portfolio" element={<StudentPortfolio />} exact />
        <Route path="/projects" element={<StudentProject />} exact />
        <Route path="/milestone" element={<MileStones />} exact />
        <Route path="/createproject" element={<CreateProject />} exact />
        <Route path="/uploadprojectfurther" element={<UploadProjectFurther />} exact />

        <Route path="/facultyhome" element={<FacultyHome />} exact />
        <Route path="/facultydashboard" element={<FacultyDashboard />} exact />

        <Route path="student/add" element={<AddStudent />} exact />
        <Route path="student/view" element={<ViewStudents />} exact />
        <Route path="student/update" element={<UpdateStudent />} exact />
        <Route path="/portfoliocheck" element={<PortfolioCheck />} exact />
        <Route path="/projectscheck" element={<ProjectCheck />} exact />
        <Route path="/portfoliocheck2" element={<PortfolioCheck2 />} exact />
        <Route path="/review" element={<Review/>} exact />
      </Routes>
    </div>
  );
}
