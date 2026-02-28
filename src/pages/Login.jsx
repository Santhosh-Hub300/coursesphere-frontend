import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");

    const move = (e) => {
      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(
        "https://coursesphere-backend.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (!response.ok) {
        alert("Invalid email or password ❌");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      // 🔥 Fetch real user info
      const userRes = await fetch(
        "https://coursesphere-backend.onrender.com/me",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      const userData = await userRes.json();

      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("userChanged"));

      if (userData.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (error) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="lux-login-page">
      <div className="cursor-glow"></div>
      <div className="aurora-bg"></div>

      <div className="lux-login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">
          Login to continue your learning journey
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="lux-login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}