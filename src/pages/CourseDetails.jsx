import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { enrollCourse } from "../api.js";
import { toast } from "react-toastify";
import "./CourseDetails.css";

export default function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {

    const fetchCourse = async () => {

      try {

        const res = await fetch(
          "https://coursesphere-backend.onrender.com/courses?limit=100"
        );

        const data = await res.json();

        const selected = data.find(
          (c) => c.id.toString() === id
        );

        setCourse(selected);

      } catch {
        toast.error("Failed to load course");
      }

    };

    fetchCourse();

  }, [id]);

  if (!course) {
    return <h2 style={{ padding: "40px" }}>Course not found</h2>;
  }

  const handleRegister = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first");
      navigate("/login");
      return;
    }

    try {

      const data = await enrollCourse(Number(id));

      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.detail || "Enrollment failed");
      }

    } catch {
      toast.error("Server error");
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

          <button
            onClick={handleRegister}
            className="enroll-btn"
          >
            Register Now
          </button>

        </div>

      </div>

    </div>
  );
}