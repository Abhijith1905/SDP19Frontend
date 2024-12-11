import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

import ProjectMedia from './ProjectMedia';
import MediaModal from './MediaModal';
import SProjectDetails from './ProjectDetails';

const Button = ({ label, onClick }) => {
  // Only render button if it's not "Generate Report" or "Grade"
  if (label === "Generate Report" || label === "Grade") {
    return null; // Do not render the button
  }

  return (
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClick}>
      {label}
    </button>
  );
};

function ViewProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [projectMedia, setProjectMedia] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [error, setError] = useState(null);
  const [mediaUrls, setMediaUrls] = useState({});
  const [modalMedia, setModalMedia] = useState(null);
  const [modalType, setModalType] = useState('');
  const [zipUrl, setZipUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const zipFile = projectMedia?.mediaList.find(
    (mediaItem) => mediaItem.mediaType === "zip"
  );

  useEffect(() => {
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.justifyContent = 'flex-start';
    document.body.style.minHeight = '100vh';

    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`${config.url}/displayproject?projectId=${id}`);
        setProjectData(response.data);
      } catch (error) {
        setError(error.message);
        toast.error(`Error fetching project: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };
    fetchProjectData();

    return () => {
      document.body.style = '';
    };
  }, [id]);

  useEffect(() => {
  const fetchProjectMedia= async () => {
      try {
        const response = await axios.get(`${config.url}/displayprojectformedia?projectId=${id}`);
        setProjectMedia(response.data);
      } catch (error) {
        setError(error.message);
        toast.error(`Error fetching project: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };
    fetchProjectMedia();
  }, [id]);
  const renderMedia = (mediaId, mediaType) => {
    const mediaUrl = mediaUrls[mediaId]?.mediaUrl;
    if (!mediaUrl) return <p>Loading media...</p>;

    return (
      <div
        style={{
          margin: "15px",
          cursor: "pointer",
          display: "inline-block",
          width: "250px",
          backgroundColor: "#f4f4f4",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          textAlign: "center",
          transition: "transform 0.3s ease-in-out",
        }}
        onClick={() => openModal(mediaUrl, mediaType)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {mediaType.includes("image") ? (
          <img
            src={mediaUrl}
            alt="Project Media"
            style={{
              width: "100%",
              height: "150px",
              borderRadius: "8px",
            }}
          />
        ) : mediaType === "pdf" || mediaType.includes("text") ? (
          <iframe
            src={mediaUrl}
            width="90%"
            height="80%"
            title="PDF or Text Media"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        ) : null}
        <p style={{ color: "#4a4a75", marginTop: "10px" }}>
          Click to view {mediaType === "pdf" ? "PDF" : mediaType.includes("text") ? "text" : "image"}
        </p>
      </div>
    );
  };



  const closeModal = () => {
    setModalMedia(null);
    setModalType("");
    setIsModalVisible(false);
  
  };
  useEffect(() => {
    if (projectData) {
      axios.get(`${config.url}/displayprojectimage?projectId=${id}`, { responseType: 'blob' })
        .then((response) => setProjectImage(URL.createObjectURL(response.data)))
        .catch((error) => console.error('Error fetching project image:', error));

      axios.get(`${config.url}/displayprojectfile?projectId=${id}`, { responseType: 'blob' })
        .then((response) => setProjectFile(URL.createObjectURL(response.data)))
        .catch((error) => console.error('Error fetching project file:', error));

      if (projectMedia?.mediaList) {
        const fetchMediaUrls = async () => {
          const mediaPromises = projectMedia?.mediaList.map(async (mediaItem) => {
            try {
              const response = await axios.get(
                `${config.url}/displaymedia?id=${mediaItem.mediaId}`,
                { responseType: 'blob' }
              );
              const mediaUrl = URL.createObjectURL(response.data);
              return { mediaId: mediaItem.mediaId, mediaUrl, mediaType: mediaItem.mediaType };
            } catch (error) {
              console.error('Error fetching media:', error);
              return { mediaId: mediaItem.mediaId, mediaUrl: null };
            }
          });

          const mediaResults = await Promise.all(mediaPromises);
          const mediaUrls = mediaResults.reduce((acc, { mediaId, mediaUrl, mediaType }) => {
            acc[mediaId] = { mediaUrl, mediaType };
            return acc;
          }, {});

          setMediaUrls(mediaUrls);

        
        };
        fetchMediaUrls();
      }
    }
  }, [projectData, id]);

  const handleUpdateProject = async () => {
    try {
      await axios.put(`${config.url}/updateproject`, projectData);
      toast.success("Project updated successfully!", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      toast.error(`Error updating project: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleSubmitForReview = async () => {
    try {
      await axios.put(`${config.url}/updateproject`, projectData);
      toast.success("Project submitted for review!", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      toast.error(`Error submitting project: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleReportGeneration = () => {
    window.open(`${config.url}/viewreport?projectId=${id}`, '_blank');
  };

  const openModal = (mediaUrl, type) => {
    setModalMedia(mediaUrl);
    setModalType(type);
  };

  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;
  if (!projectData) return <div className="text-gray-600 p-4">Loading...</div>;

  return (
    <div style={{ paddingTop: "100px" }} className="max-w-7xl mx-auto px-4 py-8 flex flex-col">
      <SProjectDetails
        projectData={projectData}
        handleInputChange={(e, field) =>
          setProjectData((prev) => ({ ...prev, [field]: e.target.value })) }
        handleCheckStatusChange={() =>
          setProjectData((prev) => ({ ...prev, checkStatus: !prev.checkStatus })) }
        handleUpdateProject={handleUpdateProject}
        handleSubmitForReview={handleSubmitForReview}
        handleReportGeneration={handleReportGeneration}
        navigateToUploadMedia={() => navigate(`/uploadmedia/${id}`)}
        projectImage={projectImage}
        projectFile={projectFile}
        zipUrl={zipUrl}
        openModal={openModal}
      />



  <Button label="Generate Report" onClick={handleReportGeneration} />
      <Button label="Track" onClick={() => navigate(`/trackproject/${id}`)} />

      <button
  onClick={async () => {
    const zipFile = projectMedia?.mediaList.find(
      (mediaItem) => mediaItem.mediaType === 'zip'
    );

    if (zipFile) {
      try {
        window.location.href = `${config.url}/displaymedia?id=${zipFile.mediaId}`; // Trigger the download
      } catch (error) {
        console.error('Error downloading ZIP:', error);
      }
    } else {
      // If no ZIP file is found, show a modal with a message
      setModalMessage('Project ZIP is not yet uploaded.');
      setIsModalVisible(true);
    }
  }}
  style={{
    padding: '10px 20px',
    backgroundColor: '#d2b48c',
    color: 'black',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  }}
>
  Download Project
</button>

{/* Modal for showing message when ZIP is not available */}
{isModalVisible && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
    onClick={closeModal}
  >
    <div
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'auto',
        textAlign: 'center',
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing on click inside modal
    >
      <h3>{modalMessage}</h3>
      <button
        onClick={closeModal}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  </div>
)}


     <br></br>
    {/* Media Section for Images */}
    <div style={{  color:"#4a4a75" ,marginBottom: "20px", textAlign: "center" }}>
    <h3>Project Images</h3>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {
        projectMedia?.mediaList
          .filter((item) => item.mediaType.includes("image"))
          .map((mediaItem) => {
            const { mediaId, mediaType } = mediaItem;
            return (
              <div key={mediaId} style={{ margin: "10px" }}>
                {renderMedia(mediaId, mediaType)}
              </div>
            );
          })}
    </div>
  </div>


  {/* Media Section for Documents */}
  <div style={{ marginBottom: "20px", textAlign: "center", color:"#4a4a75"}}>
    <h3>Project Documents</h3>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {
        projectMedia?.mediaList
          .filter((item) => item.mediaType.includes("pdf"))
          .map((mediaItem) => {
            const { mediaId, mediaType } = mediaItem;
            return (
              <div key={mediaId} style={{ margin: "10px" }}>
                {renderMedia(mediaId, mediaType)}
              </div>
            );
          })}
    </div>
  </div>
  
  {/* Media Section for Text Files */}
  <div style={{ marginBottom: "20px", textAlign: "center" , color:"#4a4a75"}}>
    <h3>Project Text Files</h3>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {
        projectMedia?.mediaList
          .filter((item) => item.mediaType.includes("text"))
          .map((mediaItem) => {
            const { mediaId, mediaType } = mediaItem;
            return (
              <div key={mediaId} style={{ margin: "10px" }}>
                {renderMedia(mediaId, mediaType)}
              </div>
            );
          })}
    </div>
  </div>
  
  {/* Modal for Viewing Media */}
  {modalMedia && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={closeModal}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on click inside modal
      >
        {modalType === "image" ? (
          <img
            src={modalMedia}
            alt="Media"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        ) : modalType === "text" ? (
          <iframe
            src={modalMedia}
            width="100%"
            height="500px"
            title="Text File"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        ) : modalType === "pdf" ? (
          <iframe
            src={modalMedia}
            width="100%" // Make it responsive within the modal container
            height="100px" // Adjust height for readability
            title="PDF"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        ) : null}
        <button
          onClick={closeModal}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  )}

     
    </div>
  );
}

export default ViewProject;
