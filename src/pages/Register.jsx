import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { registerUser } from "../api.js";
import { toast } from "react-toastify";
import "./Register.css";

export default function Register() {

  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const [loading,setLoading]=useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if(password!==confirmPassword){
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try{

      const data = await registerUser({name,email,password});

      if(data.detail){
        toast.error(data.detail);
      }else{
        toast.success("Account created successfully 🎉");
        navigate("/login");
      }

    }catch{
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (

    <div className="register-page">

      {loading && <Loader/>}

      <div className="register-card">

        <h2>Create Account</h2>

        <p className="subtitle">
          Start your learning journey today
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
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

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <button className="register-btn" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>

      </div>

    </div>
  );
}