import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";  // ✅ Fixed import (named import)

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub || "User");
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#282c34",
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        <strong>🔐 SecureAccess</strong>
      </div>
      <div>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        <button onClick={handleLogout} style={logoutStyle}>
          Logout
        </button>
      </div>
      <div>
        👋 {username && <span>Welcome, <strong>{username}</strong></span>}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  margin: "0 0.5rem",
  textDecoration: "none",
  fontWeight: "bold",
};

const logoutStyle = {
  backgroundColor: "#ff4d4d",
  border: "none",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  marginLeft: "0.5rem",
  cursor: "pointer",
};

export default Navbar;
