import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("✅ Registration successful:", response.data);
      setMessage("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      setMessage("Registration failed. Username may already exist.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>🆕 Create Account</h1>
        <form onSubmit={handleRegister} style={formStyle}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
        <p>{message}</p>
        <p style={{ marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #2c3e50, #4ca1af)",
  color: "white",
};

const formContainerStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  width: "300px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const inputStyle = {
  padding: "0.8rem",
  border: "none",
  borderRadius: "5px",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "white",
  padding: "0.8rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Register;
