import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-left">
          <h1>
            Upgrade Your <br />
            Skills With <span>Modern Tech Courses</span>
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
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Learning"
          />
        </div>

      </section>

    </div>
  );
}