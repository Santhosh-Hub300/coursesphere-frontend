import { useState, useEffect } from "react";
import "./ManageCourses.css";

export default function ManageCourses() {
  const defaultCourses = [
    {
      id: 1,
      title: "MERN Stack Development",
      level: "Advanced",
      duration: "3 Months",
      status: "Active",
      img: "https://via.placeholder.com/500x300?text=MERN+Stack",
      description:
        "Learn full stack development using MongoDB, Express, React and Node.",
      learn:
        "Build full-stack apps,Create REST APIs,React frontend,MongoDB integration,Deploy projects",
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      level: "Intermediate",
      duration: "6 Months",
      status: "Active",
      img: "https://via.placeholder.com/500x300?text=AI+%26+ML",
      description:
        "Master machine learning algorithms and real-world AI applications.",
      learn:
        "Supervised learning,Neural networks,Deep learning,Model deployment",
    },
  ];

  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    level: "Beginner",
    duration: "",
    status: "Active",
    img: "",
    description: "",
    learn: "",
  });

  // ✅ LOAD ONCE
  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");

    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  // ✅ SAVE EVERY TIME courses CHANGE
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      ...form,
      id: Date.now(),
    };

    const updatedCourses = [...courses, newCourse];

    setCourses(updatedCourses);

    // 🔥 FORCE SAVE IMMEDIATELY
    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    window.dispatchEvent(new Event("coursesUpdated"));

    setShowModal(false);

    setForm({
      title: "",
      level: "Beginner",
      duration: "",
      status: "Active",
      img: "",
      description: "",
      learn: "",
    });
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
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="course-info">
                    <img src={c.img} alt={c.title} />
                    <span>{c.title}</span>
                  </div>
                </td>
                <td>{c.level}</td>
                <td>{c.duration}</td>
                <td>
                  <span className={`pill ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </td>
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

              <textarea
                placeholder="What you will learn (comma separated)"
                required
                value={form.learn}
                onChange={(e) =>
                  setForm({ ...form, learn: e.target.value })
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

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
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
