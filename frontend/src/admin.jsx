import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#F0F9FF] relative overflow-hidden">

      {/* BLOBS */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl opacity-40"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-lg rounded-2xl p-7 w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center text-blue-500 mb-1">
          Welcome Back 
        </h2>

        <p className="text-center text-gray-500 mb-5 text-xs">
          Login to continue your journey
        </p>

        <form className="space-y-3">

          {/* USERNAME + EMAIL SIDE BY SIDE */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Username"
              className="px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs"
            />

            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs"
            />
          </div>

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs"
          />

          {/* OPTIONS */}
          <div className="flex justify-between text-xs text-gray-500">
            <label className="flex items-center gap-1">
              <input type="checkbox" />
              Remember
            </label>

            <button type="button" className="text-blue-500">
              Forgot?
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-white font-medium text-sm
            bg-[#38BDF8] shadow-md hover:shadow-lg
            hover:scale-[1.02] active:scale-[0.98]
            transition-all"
          >
            Login 
          </button>

        </form>

        {/* SIGNUP */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}