import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://coursesphere-backend.onrender.com/courses?limit=100"
        );
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.log("Error loading courses");
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.level === filter);

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <h1>All Courses</h1>
        <p>Learn in-demand skills with industry-focused programs</p>
      </div>

      <div className="course-filters">
        {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
          <span
            key={level}
            className={`filter ${filter === level ? "active" : ""}`}
            onClick={() => setFilter(level)}
          >
            {level}
          </span>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.length === 0 ? (
          <p style={{ padding: "40px" }}>No courses available.</p>
        ) : (
          filteredCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="card-img">
                <img
                  src="https://via.placeholder.com/300"
                  alt={course.title}
                />
                <span className="badge level">{course.level}</span>
                <span className="badge duration">{course.duration}</span>
              </div>

              <div className="card-body">
                <h3>{course.title}</h3>
                <Link
                  to={`/courses/${course.id}`}
                  className="details-btn"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}