import { useState,useEffect } from "react";
import Loader from "../../components/Loader";
import { getCourses,createCourse,deleteCourse } from "../../api.js";
import { toast } from "react-toastify";
import "./ManageCourses.css";

export default function ManageCourses(){

const [courses,setCourses]=useState([]);
const [loading,setLoading]=useState(true);

const [form,setForm]=useState({
title:"",
description:"",
level:"Beginner",
duration:""
});

useEffect(()=>{
fetchCourses();
},[]);

const fetchCourses = async()=>{
setLoading(true);
const data = await getCourses();
setCourses(data);
setLoading(false);
};

const handleSubmit = async(e)=>{
e.preventDefault();

if(!form.title || !form.description || !form.duration){
toast.error("Please fill all fields");
return;
}

try{

const data = await createCourse(form);

if(data.message){

toast.success(data.message);

setForm({
title:"",
description:"",
level:"Beginner",
duration:""
});

fetchCourses();

}else{
toast.error(data.detail || "Course creation failed");
}

}catch(err){
toast.error("Server error");
}

};

const handleDelete = async(id)=>{

const data = await deleteCourse(id);

if(data.message){
toast.success(data.message);
fetchCourses();
}else{
toast.error(data.detail || "Delete failed");
}

};

return(

<div className="manage-page">

{loading && <Loader/>}

<div className="manage-top">

<div>
<h1>Manage Courses</h1>
<p>Control and organize all platform courses</p>
</div>

</div>

<div className="table-card">

<form onSubmit={handleSubmit} style={{marginBottom:"30px"}}>

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

<table>

<thead>
<tr>
<th>Course</th>
<th>Level</th>
<th>Duration</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{courses.map((c)=>(
<tr key={c.id}>

<td>{c.title}</td>
<td>{c.level}</td>
<td>{c.duration}</td>

<td>
<button
className="add-btn"
onClick={()=>handleDelete(c.id)}
>
Delete
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);

}