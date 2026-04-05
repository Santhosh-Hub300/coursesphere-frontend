import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { loginUser } from "../api.js";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const glow = document.querySelector(".cursor-glow");

    const move = (e)=>{
      if(glow){
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove",move);
    return ()=>window.removeEventListener("mousemove",move);

  },[]);

  const handleLogin = async (e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const data = await loginUser(email,password);

      if(!data.access_token){
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token",data.access_token);

      // GET USER
      const res = await fetch("http://127.0.0.1:8000/me", {
        headers:{
          Authorization:`Bearer ${data.access_token}`,
        },
      });

      const userData = await res.json();

      // SAVE USER
      localStorage.setItem("user",JSON.stringify(userData));

      toast.success("Login successful 🎉");

      // REDIRECT
      if(userData.role === "Admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/student/dashboard");
      }

    }catch{
      toast.error("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="lux-login-page">

      {loading && <Loader/>}

      <div className="cursor-glow"></div>
      <div className="aurora-bg"></div>

      <div className="lux-login-card">

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your learning journey</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Create one</Link>
        </p>

      </div>

    </div>
  );
}