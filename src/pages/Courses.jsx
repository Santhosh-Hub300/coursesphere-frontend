import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Courses.css";

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchText = query.get("search") || "";

  // 🚫 Block admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "Admin") {
      navigate("/admin/dashboard");
    }
  }, []);

  // ✅ Fetch courses (LOCAL BACKEND)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/courses");
        const data = await res.json();
        setCourses(data);
      } catch {
        console.log("Error loading courses");
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const level = course.level?.trim();

    const matchesLevel =
      filter === "All" || level === filter;

    const matchesSearch =
      course.title.toLowerCase().includes(searchText.toLowerCase());

    return matchesLevel && matchesSearch;
  });

  return (
    <div className="courses-page">

      <div className="courses-hero">
        <h1>All Courses</h1>
        <p>Learn in-demand skills 🚀</p>
      </div>

      {/* FILTER */}
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

      {/* COURSES */}
      <div className="courses-grid">

        {filteredCourses.length === 0 ? (
          <p className="empty">No courses found 😢</p>
        ) : (

          filteredCourses.map((course) => (
            <div className="course-card" key={course.id}>

              <div className="card-top">
                <span className={`level-badge level-${course.level?.trim().toLowerCase()}`}>
                  {course.level}
                </span>

                <span className="duration-badge">
                  {course.duration}
                </span>
              </div>

              <div className="card-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>

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