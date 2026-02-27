import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";

import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import Report from "./pages/student/Report.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageCourses from "./pages/admin/ManageCourses.jsx";
import ViewStudents from "./pages/admin/ViewStudents.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/report" element={<Report />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/students" element={<ViewStudents />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
