const BASE_URL = "http://127.0.0.1:8000";

/* ================= AUTH ================= */

// ✅ REGISTER
export const registerUser = async (data) => {
  const formData = new URLSearchParams();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  return res.json();
};

// ✅ LOGIN
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


/* ================= USER ================= */

// ✅ GET CURRENT USER
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


/* ================= COURSES ================= */

// ✅ GET COURSES
export const getCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  return res.json();
};

// ✅ CREATE COURSE
export const createCourse = async (form) => {
  const token = localStorage.getItem("token");

  const formData = new URLSearchParams();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("level", form.level);
  formData.append("duration", form.duration);

  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formData.toString(),
  });

  return res.json();
};

// ✅ DELETE COURSE
export const deleteCourse = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


/* ================= ENROLL ================= */

// ✅ ENROLL
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

// ✅ UNENROLL (🔥 FIX ADDED BACK → NO ERROR NOW)
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


/* ================= MY COURSES ================= */

// ✅ GET MY COURSES
export const getMyCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/my-courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};