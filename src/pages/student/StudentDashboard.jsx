import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getMyCourses, unenrollCourse } from "../../api.js";
import { toast } from "react-toastify";
import "./StudentDashboard.css";

export default function StudentDashboard(){

const [courses,setCourses]=useState([]);
const [loading,setLoading]=useState(true);

const fetchMyCourses = async ()=>{

try{

const data = await getMyCourses();

setCourses(data);

}catch{

toast.error("Failed to load courses");

}

setLoading(false);

};

useEffect(()=>{

fetchMyCourses();

},[]);

const handleUnregister = async(id)=>{

const data = await unenrollCourse(id);

if(data.message){

toast.success(data.message);

fetchMyCourses();

}else{

toast.error("Unregister failed");

}

};

return(

<div className="student-page">

{loading && <Loader/>}

<div className="student-header">

<div>
<h1>Welcome back 👋</h1>
<p>Track your learning progress</p>
</div>

<Link to="/courses" className="report-btn">
Browse Courses
</Link>

</div>

<div className="student-courses">

{courses.length===0?(
<p>No registered courses yet.</p>
):( 

courses.map((course)=>(

<div className="course-box" key={course.id}>

<h3>{course.title}</h3>

<p>{course.duration}</p>

<div style={{display:"flex",gap:"10px"}}>

<Link
to="/report"
state={{course}}
className="report-btn"
>
View Report
</Link>

<button
className="unenroll-btn"
onClick={()=>handleUnregister(course.id)}
>
Unregister
</button>

</div>

</div>

))

)}

</div>

</div>

);

}
