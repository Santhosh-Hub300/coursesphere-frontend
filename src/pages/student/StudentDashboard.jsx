import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getMyCourses, unenrollCourse } from "../../api.js";
import { toast } from "react-toastify";
import "./StudentDashboard.css";

export default function StudentDashboard(){

  const navigate = useNavigate();

  const [courses,setCourses]=useState([]);
  const [loading,setLoading]=useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyCourses = async ()=>{
    try{
      const data = await getMyCourses();
      setCourses(Array.isArray(data) ? data : []);
    }catch{
      toast.error("Failed to load courses");
    }
    setLoading(false);
  };

  useEffect(()=>{
    fetchMyCourses();
  },[]);

  const handleUnregister = async(id)=>{
    try{
      const data = await unenrollCourse(id);

      if(data.message){
        toast.success(data.message);
        fetchMyCourses();
      }else{
        toast.error("Unenroll failed");
      }

    }catch{
      toast.error("Server error");
    }
  };

  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/login");
  };

  return(
    <div className="student-page">

      {loading && <Loader/>}

      {/* ✅ HEADER */}
      <div className="student-header">

        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

      {/* ✅ COURSES */}
      {courses.length===0 ? (
        <p>No courses enrolled</p>
      ) : (

        <div className="student-courses">

          {courses.map(course=>(

            <div key={course.id} className="course-box">

              <h3>{course.title}</h3>
              <p>{course.duration}</p>

              {/* ✅ REPORT BUTTON */}
              <Link
                to="/report"
                state={{ course }}
                className="report-btn"
              >
                View Report
              </Link>

              <button
                className="unenroll-btn"
                onClick={()=>handleUnregister(course.id)}
              >
                Unenroll
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}