import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchDashboard();
    }
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching dashboard:", error);
      setMessage("Unable to load dashboard data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8 mt-12 bg-white rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">📊 Dashboard Overview</h1>
        <p className="text-gray-600 mb-6">{message || "Loading your dashboard..."}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700">Active Sessions</h2>
            <p className="text-gray-700 mt-2">1 Current Login</p>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-green-700">User Role</h2>
            <p className="text-gray-700 mt-2">Standard User</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-yellow-700">Last Login</h2>
            <p className="text-gray-700 mt-2">{new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
