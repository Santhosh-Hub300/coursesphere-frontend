import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses } from "../api";
import "./Home.css";

export default function Home() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try{
      const data = await getCourses();

      // show ALL courses dynamically
      setCourses(data);

    }catch(err){
      console.error("Error loading courses", err);
    }
  };

  return (
    <div className="home">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-left">

          <h1>
            Upgrade Your Skills With
            <span> Modern Tech Courses</span>
          </h1>

          <p>
            Learn web development, AI, and data science through
            industry-level projects and expert instructors.
          </p>

          <div className="hero-buttons">
            <Link to="/courses" className="btn-primary">
              Explore Courses
            </Link>

            <Link to="/register" className="btn-secondary">
              Get Started
            </Link>
          </div>

        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="learning"
          />
        </div>

      </section>


      {/* POPULAR COURSES */}

      <section className="courses">

        <h2>Popular Courses</h2>

        <div className="course-grid">

          {courses.map((course) => (

            <div key={course.id} className="course-card">

              <img
                src={
                  course.image ||
                  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                }
                alt={course.title}
              />

              <div className="course-content">

                <h3>{course.title}</h3>

                <p>{course.description}</p>

                <div className="rating">
                  ⭐⭐⭐⭐⭐ <span>(4.8)</span>
                </div>

                <Link to={`/courses/${course.id}`}>
                  <button>View Course</button>
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <h2>Start Your Learning Journey Today</h2>

        <p>Join thousands of students learning modern tech skills.</p>

        <Link to="/register" className="btn-primary">
          Create Free Account
        </Link>

      </section>

    </div>
  );
}