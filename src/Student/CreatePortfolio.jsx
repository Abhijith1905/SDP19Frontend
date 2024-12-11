import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Main/form.css";
import UpdateState from "./UpdateState";
import config from "../config";

export default function CreatePortfolio() {

  const studentData = JSON.parse(localStorage.getItem("student"));
        const studentId = studentData ? studentData.id : null;

  // State declarations
  const [portfolioData, setPortfolioData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [portfolios, setPortfolios] = useState([{ summary: "", studentId }]);
  const [skills, setSkills] = useState([{ 
    skillName: "", 
    skillLevel: "", 
    skillCategory: "",
    studentId 
  }]);
  const [certifications, setCertifications] = useState([{
    certificationName: "",
    certificationIssuer: "",
    certificationDate: "",
    expirationDate: "",
    verificationLink: "",
    description: "",
    marksScored: "",
    honors: "",
    studentId
  }]);
  const [education, setEducation] = useState([{
    educationInstitution: "",
    educationDegree: "",
    fieldOfStudy: "",
    grade: "",
    location: "",
    educationStartDate: "",
    educationEndDate: "",
    studentId
  }]);
  const [internships, setInternships] = useState([{
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
    about: "",
    technologiesUsed: "",
    achievements: "",
    skillsGained: "",
    location: "",
    studentId
  }]);
  const [testimonials, setTestimonials] = useState([{
    testimonialText: "",
    giverName: "",
    giverRole: "",
    giverCompany: "",
    studentId
  }]);

  // Styles
  const styles = {
    formStyle: {
      maxWidth: "800px",
      margin: "auto",
      paddingTop: "50px",
      borderRadius: "10px",
    },
    sectionStyle: {
      marginBottom: "20px",
    },
    inputStyle: {
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      width: "100%",
      backgroundColor: "#f0f0f0",
      color: "#000",
    },
    buttonStyle: {
      padding: "8px 16px",
      margin: "10px 5px",
      backgroundColor: "#4a4a75",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    textareaStyle: {
      resize: "none",
      height: "150px",
      width: "100%",
      fontSize: "16px",
      padding: "10px",
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;

      try {
        const [portfolioResponse, projectsResponse] = await Promise.all([
          axios.get(`${config.url}/displayportfolio?studentId=${studentId}`),
          axios.get(`${config.url}/viewallprojects?studentId=${studentId}`)
        ]);

        setPortfolioData(portfolioResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studentId]);

  const handleProjectSelection = (project) => {
    setSelectedProjectIds(prev => 
      prev.includes(project.projectId)
        ? prev.filter(id => id !== project.projectId)
        : [...prev, project.projectId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Helper function to filter out empty entries
    const filterNonEmpty = (array, requiredFields) => {
      return array.filter(item => 
        requiredFields.some(field => 
          typeof item[field] === "string" && item[field]?.trim()
        )
      );
    };

    try {
      const payload = {
        portfolios: filterNonEmpty(portfolios, ["summary"]),
        certifications: filterNonEmpty(certifications, ["certificationName"]),
        education: filterNonEmpty(education, ["educationInstitution"]),
        internships: filterNonEmpty(internships, ["companyName"]),
        testimonials: filterNonEmpty(testimonials, ["testimonialText"]),
        projectIds: selectedProjectIds.map(id => parseInt(id, 10)),
      };

      // Only include skills if they exist and are not empty
      const nonEmptySkills = filterNonEmpty(skills, ["skillName"]);
      if (nonEmptySkills.length > 0) {
        payload.skills = nonEmptySkills;
      }

      await axios.post(`${config.url}/createportfolio`, payload);
      navigate("/viewportfolio");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isPortfolioEmpty = 
  !portfolioData || 
  Object.values(portfolioData).every(section => section.length === 0);

if (isPortfolioEmpty) {
  return <UpdateState />;
}

  return (
    <div style={styles.formStyle}>
      <form onSubmit={handleSubmit} className="custom-form">
        <h2 style={{ color: "black", textAlign: "center" }}>
          <u>Design Your Portfolio</u>
        </h2>

        {/* Summary Section */}
        <div style={styles.sectionStyle}>
          <h2 style={{ color: "black" }}>Summary</h2>
          {portfolios.map((portfolio, index) => (
            <textarea
              key={index}
              placeholder="Portfolio Summary"
              value={portfolio.summary}
              onChange={(e) => setPortfolios(prev =>
                prev.map((item, i) => i === index 
                  ? { ...item, summary: e.target.value }
                  : item
                )
              )}
              style={{ ...styles.inputStyle, ...styles.textareaStyle }}
              required
            />
          ))}
        </div>

        {/* Skills Section */}
        <div style={styles.sectionStyle}>
          <h2 style={{ color: "black" }}>Skills (Optional)</h2>
          {skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.skillName}
                onChange={(e) => setSkills(prev =>
                  prev.map((item, i) => i === index
                    ? { ...item, skillName: e.target.value }
                    : item
                  )
                )}
                style={styles.inputStyle}
              />
              <select
                value={skill.skillLevel}
                onChange={(e) => setSkills(prev =>
                  prev.map((item, i) => i === index
                    ? { ...item, skillLevel: e.target.value }
                    : item
                  )
                )}
                style={styles.inputStyle}
              >
                <option value="">Select Skill Level</option>
                <option value="Starter">Starter</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                value={skill.skillCategory}
                onChange={(e) => setSkills(prev =>
                  prev.map((item, i) => i === index
                    ? { ...item, skillCategory: e.target.value }
                    : item
                  )
                )}
                style={styles.inputStyle}
              >
                <option value="">Select Skill Category</option>
                <option value="Programming Language">Programming Language</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
              </select>
              <button
                type="button"
                onClick={() => addItem(setSkills, { skillName: "", skillLevel: "", skillCategory: "", studentId })}
                style={styles.buttonStyle}
              >
                Add Skill
              </button>
              <button
                type="button"
                onClick={() => removeItem(setSkills, index)}
                style={styles.buttonStyle}
                disabled={skills.length === 1}
              >
                Remove Skill
              </button>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div style={styles.sectionStyle}>
          <h2 style={{ color: "black" }}>Projects</h2>
          {projects.map((project) => (
            <div key={project.projectId}>
              <label style={{ color: "black" }}>
                <input
                  type="checkbox"
                  onChange={() => handleProjectSelection(project)}
                  checked={selectedProjectIds.includes(project.projectId)}
                />
                {project.title}
              </label>
            </div>
          ))}
        </div>

          
 {/* Certifications Section */}
<div style={sectionStyle}>
  <h2 style={{ color: "black" }}>Certifications</h2>
  {certifications.map((cert, index) => (
    <div key={index}>
      {/* Certification Name */}
      <input
        type="text"
        placeholder="Certification Name"
        value={cert.certificationName || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, certificationName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Certification Issuer */}
      <input
        type="text"
        placeholder="Certification Issuer"
        value={cert.certificationIssuer || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, certificationIssuer: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Certification Date */}
      <input
        type="date"
        value={cert.certificationDate || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, certificationDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Expiration Date */}
      <input
        type="date"
        placeholder="Expiration Date (optional)"
        value={cert.expirationDate || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, expirationDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        value={cert.description || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, description: e.target.value } : item
            )
          )
        }
        style={{ ...inputStyle, height: "80px",  resize: "none", }}
      />

      {/* Marks Scored */}
      <input
        type="text"
        placeholder="Marks Scored (optional)"
        value={cert.marksScored || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, marksScored: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Honors */}
      <input
        type="text"
        placeholder="Honors (optional)"
        value={cert.honors || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, honors: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Add Certification Button */}
      <button
        type="button"
        onClick={() =>
          addItem(setCertifications, {
            certificationName: "",
            certificationIssuer: "",
            certificationDate: "",
            expirationDate: "",
            description: "",
            marksScored: "",
            honors: "",
          })
        }
        style={buttonStyle}
      >
        Add Certification
      </button>

      {/* Remove Certification Button */}
      <button
        type="button"
        onClick={() => removeItem(setCertifications, index)}
        style={buttonStyle}
        disabled={certifications.length === 1}
      >
        Remove Certification
      </button>
    </div>
  ))}
</div>


    {/* Education Section */}
<div className="section-content">
  <h2 style={{ color: "black" }}>Education</h2>
  {education.map((edu, index) => (
    <div key={index}>
      {/* Institution Name */}
      <input
        type="text"
        placeholder="Institution"
        value={edu.educationInstitution || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationInstitution: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Degree */}
      <input
        type="text"
        placeholder="Degree"
        value={edu.educationDegree || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationDegree: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Field of Study */}
      <input
        type="text"
        placeholder="Field of Study"
        value={edu.fieldOfStudy || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, fieldOfStudy: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Grade */}
      <input
        type="text"
        placeholder="Grade"
        value={edu.grade || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, grade: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={edu.location || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, location: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Start Date */}
      <input
        type="date"
        placeholder="Start Date"
        value={edu.educationStartDate || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationStartDate: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* End Date */}
      <input
        type="date"
        placeholder="End Date"
        value={edu.educationEndDate || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationEndDate: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Add and Remove Education Buttons */}
      <button
        type="button"
        onClick={() =>
          addItem(setEducation, {
            educationInstitution: "",
            educationDegree: "",
            fieldOfStudy: "",
            grade: "",
            location: "",
            educationStartDate: "",
            educationEndDate: "",
          })
        }
        style={buttonStyle}
      >
        Add Education
      </button>
      <button
        type="button"
        onClick={() => removeItem(setEducation, index)}
        disabled={education.length === 1}
        style={buttonStyle}
      >
        Remove Education
      </button>
    </div>
  ))}
</div>

{/* Internships Section */}
<div className="section-content">
  <h2 style={{ color: "black" }}>Internships</h2>
  {internships.map((internship, index) => (
    <div key={index} style={{ marginBottom: "20px", padding: "10px" }}>
      {/* Company Name */}
      <input
        type="text"
        placeholder="Company Name"
        value={internship.companyName || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, companyName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Role */}
      <input
        type="text"
        placeholder="Role"
        value={internship.role || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, role: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Start Date */}
      <input
        type="date"
        placeholder="Start Date"
        value={internship.startDate || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, startDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* End Date */}
      <input
        type="date"
        placeholder="End Date"
        value={internship.endDate || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, endDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* About */}
      <textarea
        placeholder="About the Internship"
        value={internship.about || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, about: e.target.value } : item
            )
          )
        }
        style={{...inputStyle,  resize: "none",}}
      />
      
      {/* Technologies Used */}
      <input
        type="text"
        placeholder="Technologies Used (comma separated)"
        value={internship.technologiesUsed || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, technologiesUsed: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Achievements */}
      <input
        type="text"
        placeholder="Achievements (comma separated)"
        value={internship.achievements || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, achievements: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Skills Gained */}
      <input
        type="text"
        placeholder="Skills Gained (comma separated)"
        value={internship.skillsGained || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, skillsGained: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Internship Location */}
      <input
        type="text"
        placeholder="Location (remote, office, etc.)"
        value={internship.location || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, location: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Buttons */}
      <button
        type="button"
        onClick={() =>
          setInternships([
            ...internships,
            {
              companyName: "",
              role: "",
              startDate: "",
              endDate: "",
              about: "",
              technologiesUsed: "",
              achievements: "",
              skillsGained: "",
              location: "",
            },
          ])
        }
        style={buttonStyle}
      >
        Add Internship
      </button>
      <button
        type="button"
        onClick={() =>
          setInternships(internships.filter((_, i) => i !== index))
        }
        disabled={internships.length === 1}
        style={buttonStyle}
      >
        Remove Internship
      </button>
    </div>
  ))}
</div>



<div className="section-content">
  <h2 style={{ color: "black" }}>Testimonials</h2>
  {testimonials.map((testimonial, index) => (
    <div key={index}>
      {/* Giver's Name */}
      <input
        type="text"
        placeholder="Giver's Name"
        value={testimonial.giverName || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, giverName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Giver's Role */}
      <input
        type="text"
        placeholder="Giver's Role"
        value={testimonial.giverRole || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, giverRole: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Giver's Company */}
      <input
        type="text"
        placeholder="Giver's Company"
        value={testimonial.giverCompany || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, giverCompany: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Testimonial Text */}
      <textarea
        placeholder="Testimonial Text"
        value={testimonial.testimonialText || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, testimonialText: e.target.value } : item
            )
          )
        }
        style={{ ...inputStyle, resize: "none", rows: 3 }}
      />

      {/* Buttons */}
      <button
        type="button"
        onClick={() =>
          addItem(setTestimonials, { testimonialText: "", giverName: "", giverRole: "", giverCompany: "" })
        }
        style={buttonStyle}
      >
        Add Testimonial
      </button>
      <button
        type="button"
        onClick={() => removeItem(setTestimonials, index)}
        disabled={testimonials.length === 1}
        style={buttonStyle}
      >
        Remove Testimonial
      </button>
    </div>
  ))}
</div>
        {/* Submit Button */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={{ ...styles.buttonStyle, marginTop: "20px" }}>
            Create Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}






     
