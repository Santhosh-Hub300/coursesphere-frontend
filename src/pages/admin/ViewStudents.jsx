import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ViewStudents.css";

export default function ViewStudents() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          "https://coursesphere-backend.onrender.com/admin/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.log("Error loading students");
      }
    };

    fetchStudents();
  }, [token]);

  if (!user || user.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout">
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

      <main className="admin-main">
        <header className="admin-header">
          <h1>Registered Students</h1>
          <p>Live student enrollment data</p>
        </header>

        <section className="students-card">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Enrolled Courses</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="3">No students found</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      {student.courses.length === 0
                        ? "No enrollments"
                        : student.courses.join(", ")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}