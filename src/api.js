const BASE_URL = "https://coursesphere-backend.onrender.com";

/* ===============================
AUTH
================================ */

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  return res.json();
};

/* ===============================
COURSES
================================ */

export const getCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses?limit=100`);
  return res.json();
};

export const createCourse = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteCourse = async (courseId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/* ===============================
ENROLLMENT
================================ */

export const enrollCourse = async (courseId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/enroll/${courseId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const unenrollCourse = async (courseId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/unenroll/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getMyCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/my-courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/* ===============================
ADMIN
================================ */

export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getAllStudents = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/admin/students`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};