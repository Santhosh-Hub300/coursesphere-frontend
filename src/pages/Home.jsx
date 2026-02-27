import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");

    const move = (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="lux-home">

      <div className="cursor-glow"></div>
      <div className="aurora-bg"></div>

      <section className="lux-hero">

        <div className="lux-text">
          <h1>
            Build Skills.
            <br />
            <span>Build Power.</span>
          </h1>

          <p>
            CourseSphere delivers future-proof programs for ambitious learners.
          </p>

          <div className="lux-buttons">
            <Link to="/courses" className="lux-btn-primary">
              Explore Courses
            </Link>

            <Link to="/register" className="lux-btn-outline">
              Get Started
            </Link>
          </div>
        </div>

        <div className="lux-cards">
          <div className="lux-card"></div>
          <div className="lux-card delay"></div>
        </div>

      </section>

    </div>
  );
}
