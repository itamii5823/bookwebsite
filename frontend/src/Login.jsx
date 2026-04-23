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

    if (!user.username.trim() || !user.password.trim()) {
      return setAlert({
        type: "error",
        message: "All fields are required"
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
        message: "Login successful"
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (err) {
      const message = err.response?.data;

      if (message === "user not found") {
        setAlert({ type: "error", message: "User does not exist. Create account." });
      } else if (message === "wrong password") {
        setAlert({ type: "error", message: "Wrong password" });
      } else {
        setAlert({ type: "error", message: "Something went wrong" });
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#060304] text-white">

      {/* LEFT SIDE (branding / fills space) */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">

        <div className="absolute w-125 h-[5h-125indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-md px-10">
          <h1 className="text-4xl font-semibold leading-tight">
            Your stories live here.
          </h1>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Access your library, continue reading, and manage your published work — all in one place.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE (form) */}
      <div className="flex flex-1 items-center justify-center px-6">

        {/* ALERT */}
        {alert && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl px-5 py-3 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                alert.type === "error" ? "bg-red-400" : "bg-green-400"
              }`} />
              <p className="text-sm text-gray-200">{alert.message}</p>
              <button onClick={() => setAlert(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>
          </div>
        )}

        {/* CARD */}
        <div className="w-full max-w-sm">

          <h2 className="text-3xl font-semibold mb-2">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Log in to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-xs text-gray-400">Username</label>
              <input
                type="text"
                value={user.username}
                onChange={(e)=>setUser({...user, username:e.target.value})}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Password</label>
              <input
                type="password"
                value={user.password}
                onChange={(e)=>setUser({...user, password:e.target.value})}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 focus:outline-none text-sm"
              />
            </div>

            {/* EXTRA ROW (fills space properly) */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-indigo-500" />
                Remember me
              </label>

              <span className="hover:text-white cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button className="w-full py-3 rounded-xl font-medium bg-indigo-500 hover:bg-indigo-400 transition">
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-8 text-gray-500">
            Don’t have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer"
              onClick={()=>navigate("/sign")}
            >
              Signup
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}
