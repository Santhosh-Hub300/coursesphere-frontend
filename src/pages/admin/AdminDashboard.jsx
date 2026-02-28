import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    total_users: 0,
    total_courses: 0,
    total_enrollments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://coursesphere-backend.onrender.com/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log("Error loading stats");
      }
    };

    fetchStats();
  }, [token]);

  if (!user || user.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">CourseSphere</h2>

        <nav>
          <Link className="active" to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/courses">Manage Courses</Link>
          <Link to="/admin/students">View Students</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Overview & system statistics</p>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h4>Total Courses</h4>
            <span>{stats.total_courses}</span>
          </div>

          <div className="stat-card">
            <h4>Total Students</h4>
            <span>{stats.total_users}</span>
          </div>

          <div className="stat-card">
            <h4>Active Enrollments</h4>
            <span>{stats.total_enrollments}</span>
          </div>

          <div className="stat-card">
            <h4>Admins</h4>
            <span>1</span>
          </div>
        </section>
      </main>
    </div>
  );
}