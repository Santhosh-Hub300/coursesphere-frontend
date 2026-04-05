import { useState, useEffect } from "react";
import { getCourses, createCourse, deleteCourse } from "../../api.js";
import "./ManageCourses.css";

export default function ManageCourses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Beginner",
    duration: ""
  });

  // FETCH
  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch {
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.duration) {
      alert("Fill all fields");
      return;
    }

    const data = await createCourse(form);

    if (data.message) {
      alert("Added ✅");

      setForm({
        title: "",
        description: "",
        level: "Beginner",
        duration: ""
      });

      fetchCourses();
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    const data = await deleteCourse(id);

    if (data.message) {
      alert("Deleted ✅");
      fetchCourses();
    }
  };

  return (
    <div className="manage-page">

      <div className="manage-top">
        <h1>Manage Courses</h1>
      </div>

      <div className="table-card">

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
          />

          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e)=>setForm({...form,duration:e.target.value})}
          />

          <select
            value={form.level}
            onChange={(e)=>setForm({...form,level:e.target.value})}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button className="add-btn">Add Course</button>

        </form>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p>No courses</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Duration</th>
                <th>Action</th> {/* 🔥 NEW */}
              </tr>
            </thead>

            <tbody>
              {courses.map((c)=>(
                <tr key={c.id}>

                  <td>{c.title}</td>

                  <td>
                    <span className={`level-badge level-${c.level.toLowerCase()}`}>
                      {c.level}
                    </span>
                  </td>

                  <td>{c.duration}</td>

                  <td>
                    <button onClick={()=>handleDelete(c.id)}>
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}