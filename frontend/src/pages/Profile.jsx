import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      setProfileData("Error loading profile data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 User Profile</h1>
        <p className="text-gray-600 mb-8">{profileData || "Loading profile..."}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-5xl font-bold shadow-md">
            S
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-gray-800">Samuel Wesley Amesimeku</h2>
            <p className="text-gray-600 mt-1">Role: <span className="font-medium text-blue-700">User</span></p>
            <p className="text-gray-600">Status: <span className="font-medium text-green-600">Active</span></p>
            <p className="text-gray-600 mt-2">Last Login: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
