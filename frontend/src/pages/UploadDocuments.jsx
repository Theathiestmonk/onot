import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadDocuments.css';

const UploadDocuments = () => {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    // Load visitor details from sessionStorage
    const savedVisitors = sessionStorage.getItem('visitorDetails');
    if (savedVisitors) {
      try {
        setVisitors(JSON.parse(savedVisitors));
      } catch (err) {
        console.error('Error parsing visitor details:', err);
        navigate('/visitor-details');
      }
    } else {
      navigate('/visitor-details');
    }
  }, [navigate]);

  const handleFileUpload = (visitorIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [visitorIndex]: file.name
      }));
    }
  };

  const handleNext = () => {
    // Check if all visitors have uploaded documents
    const allUploaded = visitors.every((_, index) => uploadedFiles[index]);
    if (!allUploaded) {
      alert('Please upload documents for all visitors');
      return;
    }
    // Navigate to payment page
    navigate('/payment');
  };

  if (visitors.length === 0) {
    return (
      <div className="upload-documents-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="upload-documents-page">
      {/* Header */}
      <div className="upload-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">Upload Documents</h1>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-step active">
          <div className="step-circle">1</div>
        </div>
        <div className="progress-line active"></div>
        <div className="progress-step active">
          <div className="step-circle">2</div>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">3</div>
        </div>
      </div>

      {/* Instruction */}
      <p className="instruction-text">
        Please upload any government document to verify your details
      </p>

      {/* Visitor Sections */}
      <div className="visitor-sections">
        {visitors.map((visitor, index) => (
          <div key={index} className="visitor-section">
            {index > 0 && <div className="section-divider"></div>}
            <h2 className="visitor-heading">Visitor {index + 1}</h2>
            <div className="visitor-details-container">
              <div className="visitor-details">
                <p className="detail-item">
                  <span className="detail-label">Name :</span>
                  <span className="detail-value">{visitor.name}</span>
                </p>
                <p className="detail-item">
                  <span className="detail-label">Age :</span>
                  <span className="detail-value">{visitor.age} Y/O</span>
                </p>
                <p className="detail-item">
                  <span className="detail-label">Gender :</span>
                  <span className="detail-value">{visitor.gender}</span>
                </p>
                <p className="detail-item">
                  <span className="detail-label">Nationality :</span>
                  <span className="detail-value">{visitor.nationality || 'Not specified'}</span>
                </p>
              </div>
              <div className="upload-section">
                <label className="upload-button-label">
                  <input
                    type="file"
                    className="file-input"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(index, e)}
                  />
                  <div className="upload-button">
                    <svg className="upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </label>
                <p className="upload-hint">
                  {uploadedFiles[index] ? uploadedFiles[index] : 'Upload Documents here'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="action-footer">
        <button className="next-button" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;

