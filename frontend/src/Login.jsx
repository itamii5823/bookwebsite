import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!user.username.trim() || !user.password.trim()) {
      return setAlert({
        type: "error",
        message: "All fields are required "
      });
    }

    try {
      await axios.post(
        "https://bookwebsite-4q2b.onrender.com/login",
        {
          username: user.username.trim(),
          password: user.password.trim()
        },
        { withCredentials: true }
      );

      setAlert({
        type: "success",
        message: "Login successful ✨"
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (err) {
      const message = err.response?.data;

      if (message === "user not found") {
        setAlert({
          type: "error",
          message: "User does not exist  Create account!"
        });
      } else if (message === "wrong password") {
        setAlert({
          type: "error",
          message: "Wrong password "
        });
      } else if (message === "All fields required") {
        setAlert({
          type: "error",
          message: "Fill all fields properly "
        });
      } else {
        setAlert({
          type: "error",
          message: "Something went wrong "
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] relative overflow-hidden">

      {/* BLOBS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40"></div>

      {/* ALERT */}
      {alert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-blue-200 shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3">

            <span className="text-xl">
              {alert.type === "error" ? "" : ""}
            </span>

            <p className="text-sm text-gray-700">{alert.message}</p>

            <button
              onClick={() => setAlert(null)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* CARD */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-xl rounded-3xl p-8 w-full max-w-sm">

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📚✨</div>
          <h2 className="text-3xl font-bold text-blue-500">Welcome 💙</h2>
          <p className="text-sm text-blue-400 mt-1">
            Your stories are waiting…
          </p>
        </div>

        <div className="w-12 h-1 bg-blue-300 mx-auto rounded-full mb-6"></div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Username "
            value={user.username}
            onChange={(e)=>setUser({...user, username:e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="password"
            placeholder="Password "
            value={user.password}
            onChange={(e)=>setUser({...user, password:e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button className="w-full py-3 bg-[#38BDF8] text-white rounded-xl">
            Login 
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Don’t have account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={()=>navigate("/sign")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}