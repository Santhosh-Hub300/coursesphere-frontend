import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ViewStudents from "./pages/admin/ViewStudents";

import Report from "./pages/student/Report"; // ✅ IMPORT REPORT PAGE

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/report" element={<Report />} />   {/* ✅ REPORT ROUTE */}

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/students" element={<ViewStudents />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}