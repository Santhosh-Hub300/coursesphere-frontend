import { Link, Navigate } from "react-router-dom";
import "./ViewStudents.css";

export default function ViewStudents() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">CourseSphere</h2>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/courses">Manage Courses</Link>
          <Link className="active" to="/admin/students">
            View Students
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Registered Students</h1>
          <p>Manage and monitor student enrollments</p>
        </header>

        <section className="students-card">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Santhosh</td>
                <td>MERN Stack</td>
                <td>
                  <span className="status active">Active</span>
                </td>
              </tr>

              <tr>
                <td>Bhargav</td>
                <td>AI & ML</td>
                <td>
                  <span className="status active">Active</span>
                </td>
              </tr>

              <tr>
                <td>Venky</td>
                <td>Data Science</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
