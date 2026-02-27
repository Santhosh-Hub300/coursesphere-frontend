import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { Navigate } from "react-router-dom";


export default function AdminDashboard() {
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">CourseSphere</h2>

        <nav>
          <Link className="active" to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/courses">Manage Courses</Link>
          <Link to="/admin/students">View Students</Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* HEADER */}
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Overview & system statistics</p>
        </header>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <h4>Total Courses</h4>
            <span>6</span>
          </div>

          <div className="stat-card">
            <h4>Total Students</h4>
            <span>0</span>
          </div>

          <div className="stat-card">
            <h4>Active Enrollments</h4>
            <span>0</span>
          </div>

          <div className="stat-card">
            <h4>Admins</h4>
            <span>1</span>
          </div>
        </section>

        {/* TABLE */}
        <section className="admin-section">
          <h3>Recent Enrollments</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Santhosh</td>
                <td>MERN Stack</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Rahul</td>
                <td>AI & ML</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Anjali</td>
                <td>Data Science</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
