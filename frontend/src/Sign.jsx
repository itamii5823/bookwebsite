import React, { useState, useEffect } from "react"; // ✅ add useEffect
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  
  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/me", {
      withCredentials: true
    })
    .then(() => {
      navigate("/admin"); // already logged in
    })
    .catch(() => {
      // not logged in → stay here
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://bookwebsite-4q2b.onrender.com/signup",
        user,
        { withCredentials: true }
      );

      alert("Signup successful ✨");
      navigate("/admin");

    } catch (err) {
      console.log(err);
      alert("User already exists");
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] relative overflow-hidden">

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-xl rounded-3xl p-8 w-full max-w-sm">

        <h2 className="text-3xl font-bold text-center text-blue-500 mb-1">
          Join Us 
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Create your account to publish stories
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          <div>
            <label className="text-xs text-gray-500">Username</label>
            <input
              type="text"
              placeholder="your_username"
              onChange={(e)=>setUser({...user, username:e.target.value})}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm transition"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e)=>setUser({...user, email:e.target.value})}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm transition"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e)=>setUser({...user, password:e.target.value})}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm transition"
            />
          </div>

          <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#38BDF8]">
            Sign Up 
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={()=>navigate("/login")}
            className="text-blue-500 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}