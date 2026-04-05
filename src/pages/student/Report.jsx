import { useLocation } from "react-router-dom";
import "./Report.css";

export default function Report(){

  const location = useLocation();

  // ✅ FIX SAFE
  const course = location.state?.course;

  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString();

  const handleDownload = ()=>{
    window.print();
  };

  if(!course){
    return <h2 style={{padding:"40px"}}>No report data available</h2>;
  }

  return(

    <div className="report-page">

      <div className="report-card">

        <div className="report-header">
          <h1>Course Enrollment Report</h1>
          <p>Official learning summary</p>
        </div>

        <div className="report-section">

          <div className="row">
            <span>Student Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div className="row">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="row">
            <span>Course</span>
            <strong>{course?.title}</strong>
          </div>

          <div className="row">
            <span>Duration</span>
            <strong>{course?.duration}</strong>
          </div>

          <div className="row">
            <span>Enrollment Date</span>
            <strong>{today}</strong>
          </div>

          <div className="row">
            <span>Status</span>
            <strong className="status active">Active</strong>
          </div>

        </div>

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