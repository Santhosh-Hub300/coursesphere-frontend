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
        const res = await fetch("http://127.0.0.1:8000/courses");
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
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Login first");
      navigate("/login");
      return;
    }

    const data = await enrollCourse(Number(id));

    if (data.message) toast.success(data.message);
    else toast.error("Failed");
  };

  return (
    <div className="course-details">

      {/* HEADER */}
      <div className="course-header">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      {/* BODY */}
      <div className="course-body">

        {/* LEFT */}
        <div className="course-main">
          <section>
            <h2>About this course</h2>
            <p>{course.description}</p>
          </section>
        </div>

        {/* RIGHT */}
        <div className="course-sidebar">

          <div className="info-box">
            <p><b>Level:</b> {course.level}</p>
            <p><b>Duration:</b> {course.duration}</p>
          </div>

          <button
            onClick={handleRegister}
            className="enroll-btn"
          >
            Enroll Now 🚀
          </button>

        </div>

      </div>

    </div>
  );
}