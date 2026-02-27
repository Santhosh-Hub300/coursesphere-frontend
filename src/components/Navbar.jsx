import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userChanged", updateUser);
    return () =>
      window.removeEventListener("userChanged", updateUser);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo-wrapper">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">CourseSphere</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <NavLink to="/courses" className="nav-item">
          Courses
        </NavLink>

        {user?.role === "Student" && (
          <NavLink to="/student/dashboard" className="nav-item">
            Dashboard
          </NavLink>
        )}

        {user?.role === "Admin" && (
          <NavLink to="/admin/dashboard" className="nav-item">
            Admin Panel
          </NavLink>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-signup">
              Get Started
            </Link>
          </>
        ) : (
          <div className="profile-wrapper" ref={dropdownRef}>
            <div
              className="profile-circle"
              onClick={() => setOpen(!open)}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            {open && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="profile-avatar-large">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div>
                    <p className="profile-name">{user.name}</p>
                    <p className="profile-email">{user.email}</p>
                    <span className="role-badge">
                      {user.role}
                    </span>
                  </div>
                </div>

                <hr />

                <div
                  onClick={() =>
                    navigate(
                      user.role === "Admin"
                        ? "/admin/dashboard"
                        : "/student/dashboard"
                    )
                  }
                  className="dropdown-item"
                >
                  🏠 Dashboard
                </div>

                <div className="dropdown-item">
                  ⚙ Settings
                </div>

                <div className="dropdown-item">
                  ❓ Help Center
                </div>

                <hr />

                <div
                  onClick={handleLogout}
                  className="dropdown-item logout"
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
