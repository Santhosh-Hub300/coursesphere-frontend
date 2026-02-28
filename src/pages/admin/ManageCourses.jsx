import { useState, useEffect } from "react";
import "./ManageCourses.css";

export default function ManageCourses() {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Beginner",
    duration: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch(
      "https://coursesphere-backend.onrender.com/courses"
    );
    const data = await res.json();
    setCourses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      "https://coursesphere-backend.onrender.com/courses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    setShowModal(false);
    setForm({
      title: "",
      description: "",
      level: "Beginner",
      duration: "",
    });

    fetchCourses();
  };

  return (
    <div className="manage-page">
      <div className="manage-top">
        <div>
          <h1>Manage Courses</h1>
          <p>Control and organize all platform courses</p>
        </div>

        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Course
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Level</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.level}</td>
                <td>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h2>Add New Course</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Course Title"
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                placeholder="Course Description"
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <select
                value={form.level}
                onChange={(e) =>
                  setForm({ ...form, level: e.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <input
                placeholder="Duration (eg: 3 Months)"
                required
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: e.target.value })
                }
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button type="submit" className="primary">
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}