import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation(); // ✅ NEW
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  /* USER SYNC */
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userChanged", updateUser);

    return () =>
      window.removeEventListener("userChanged", updateUser);
  }, []);

  /* CLICK OUTSIDE */
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

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setOpen(false);

    window.dispatchEvent(new Event("userChanged"));

    navigate("/");
  };

  /* 🔥 FIXED SEARCH (NO REDIRECT BUG) */
  useEffect(() => {

    // 🚫 STOP on login/register pages
    if (
      user?.role === "Admin" ||
      location.pathname === "/login" ||
      location.pathname === "/register"
    ) return;

    // 🚫 STOP if search empty (prevents auto redirect)
    if (!search.trim()) return;

    const delay = setTimeout(() => {
      navigate(`/courses?search=${search}`);
    }, 300);

    return () => clearTimeout(delay);

  }, [search, user, navigate, location.pathname]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-wrapper">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">CourseSphere</span>
        </Link>
      </div>

      <div className="nav-center">

        {user?.role !== "Admin" && (
          <NavLink to="/courses" className="nav-item">
            Courses
          </NavLink>
        )}

        {user?.role !== "Admin" && (
          <form className="search-box" onSubmit={(e)=>e.preventDefault()}>
            <input
              type="text"
              placeholder="Search for courses..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </form>
        )}

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

      <div className="nav-right">

        {!user ? (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-signup">Sign Up</Link>
          </>
        ) : (

          <div className="profile-wrapper" ref={dropdownRef}>

            <div
              className="profile-circle"
              onClick={()=>setOpen(!open)}
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
                    <span className="role-badge">{user.role}</span>
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