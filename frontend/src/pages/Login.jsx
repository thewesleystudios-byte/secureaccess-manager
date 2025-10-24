import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
