import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(
        "https://coursesphere-backend.onrender.com/courses?limit=100"
      );
      const data = await res.json();
      const selected = data.find(
        (c) => c.id.toString() === id
      );
      setCourse(selected);
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <h2 style={{ padding: "40px" }}>Course not found</h2>;
  }

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const res = await fetch(
      `https://coursesphere-backend.onrender.com/enroll/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.message) {
      alert(data.message);
    } else {
      alert("Enrollment failed");
    }
  };

  return (
    <div className="course-details">
      <div className="course-header">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div className="course-body">
        <div className="course-main">
          <section>
            <h2>About this course</h2>
            <p>{course.description}</p>
          </section>
        </div>

        <div className="course-sidebar">
          <div className="info-box">
            <p><b>Duration:</b> {course.duration}</p>
            <p><b>Level:</b> {course.level}</p>
          </div>

          <button onClick={handleRegister} className="enroll-btn">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}