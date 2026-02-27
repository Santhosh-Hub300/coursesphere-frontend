import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await fetch(
          "https://coursesphere-backend.onrender.com/my-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setCourses(data);

      } catch (err) {
        console.log("Error loading courses");
      }
    };

    if (token) {
      fetchMyCourses();
    }
  }, [token]);

  const totalCourses = courses.length;

  return (
    <div className="student-page">
      <div className="student-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p>Track your learning progress and continue your courses</p>
        </div>

        <Link to="/student/report" className="report-btn">
          View Report
        </Link>
      </div>

      <div className="student-stats">
        <div className="stat-card">
          <h4>Registered Courses</h4>
          <span>{totalCourses}</span>
        </div>
      </div>

      <div className="student-section">
        <h2>My Courses</h2>

        <div className="student-courses">
          {courses.length === 0 ? (
            <p>No registered courses yet.</p>
          ) : (
            courses.map((course) => (
              <div className="course-box" key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.duration}</p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}