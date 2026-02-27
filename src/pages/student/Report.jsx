import "./Report.css";

export default function Report() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="report-page">
      <div className="report-card">
        {/* HEADER */}
        <div className="report-header">
          <h1>Course Enrollment Report</h1>
          <p>Official learning summary</p>
        </div>

        {/* DETAILS */}
        <div className="report-section">
          <div className="row">
            <span>Student Name</span>
            <strong>Santhosh</strong>
          </div>

          <div className="row">
            <span>Email</span>
            <strong>santhosh@email.com</strong>
          </div>

          <div className="row">
            <span>Course</span>
            <strong>MERN Stack Development</strong>
          </div>

          <div className="row">
            <span>Enrollment Date</span>
            <strong>10 Aug 2026</strong>
          </div>

          <div className="row">
            <span>Status</span>
            <strong className="status active">Active</strong>
          </div>

          <div className="row">
            <span>Progress</span>
            <strong>65%</strong>
          </div>
        </div>

        {/* FOOTER */}
        <div className="report-footer no-print">
          <button className="download-btn" onClick={handleDownload}>
            Download Report
          </button>
          <p>This document is system-generated.</p>
        </div>
      </div>
    </div>
  );
}
