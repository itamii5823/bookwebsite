import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/me", {
      withCredentials: true
    })
    .then(() => {
      navigate("/book");
    })
    .catch(() => {});
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!user.username.trim() || !user.email.trim() || !user.password.trim()) {
      return setAlert({
        type: "error",
        message: "All fields are required"
      });
    }

    try {
      await axios.post(
        "https://bookwebsite-4q2b.onrender.com/signup",
        user,
        { withCredentials: true }
      );

      setAlert({
        type: "success",
        message: "Signup successful"
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        message: "User already exists"
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#060304] text-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">

        <div className="absolute w-125 h-125 bg-pink-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-md px-10">
          <h1 className="text-4xl font-semibold leading-tight">
            Start your writing journey.
          </h1>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Create your account to publish stories, connect with readers, and build your own creative space.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
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

        {/* FORM */}
        <div className="w-full max-w-sm">

          <h2 className="text-3xl font-semibold mb-2">
            Create account
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Join and start publishing
          </p>

          <form onSubmit={handleSignup} className="space-y-5">

            <div>
              <label className="text-xs text-gray-400">Username</label>
              <input
                type="text"
                onChange={(e)=>setUser({...user, username:e.target.value})}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-[#e04f95] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Email</label>
              <input
                type="email"
                onChange={(e)=>setUser({...user, email:e.target.value})}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-[#e04f95] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Password</label>
              <input
                type="password"
                onChange={(e)=>setUser({...user, password:e.target.value})}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-[#e04f95] focus:outline-none text-sm"
              />
            </div>

            <button className="w-full py-3 rounded-xl font-medium bg-[#E37EAF] hover:bg-[#e04f95] transition">
              Sign Up
            </button>

          </form>

          <p className="text-sm text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <span
              className="text-[#E37EAF] cursor-pointer"
              onClick={()=>navigate("/login")}
            >
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}