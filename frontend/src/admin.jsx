import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    cover: null,
    content: "",
    category: ""
  });

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.cover ||
      !form.content.trim() ||
      !form.category
    ) {
      return setAlert({
        type: "error",
        message: "All fields are required 💔"
      });
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("content", form.content.trim());
      formData.append("cover", form.cover);
      formData.append("category", form.category);

      await axios.post(
        "http://localhost:5000/addbook",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setAlert({
        type: "success",
        message: "Book published successfully 📚✨",
      });

      navigate("/book");

      setForm({
        title: "",
        description: "",
        cover: null,
        content: "",
        category: ""
      });

    } catch (err) {
      console.log(err);

      if (err.response?.data === "not logged in") {
        setAlert({
          type: "error",
          message: "Please login first 😢"
        });
      } else {
        setAlert({
          type: "error",
          message: "Failed to publish 😵"
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060304] relative overflow-hidden text-white">

      {/* 🔥 PREMIUM GLOW BACKGROUND */}
      <div className="absolute w-125 h-125 bg-[#E37EAF] blur-[180px] opacity-20 -top-37.5 -left-37.5"></div>
      <div className="absolute w-125 h-125 bg-purple-600 blur-[200px] opacity-20 -bottom-37.5 -right-37.5"></div>

      {/* ALERT */}
      {alert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3">

            <span className="text-xl">
              {alert.type === "error" ? "💔" : "✨"}
            </span>

            <p className="text-sm text-white">{alert.message}</p>

            <button
              onClick={() => setAlert(null)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 🔥 MAIN CARD */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] rounded-3xl p-8 w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📖</div>

          <h2 className="text-3xl font-bold bg-linear-to-r from-[#E37EAF] to-purple-400 text-transparent bg-clip-text">
            Create Story
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Turn your imagination into reality
          </p>
        </div>

        <div className="w-12 h-0.5 bg-linear-to-r from-[#E37EAF] to-purple-400 mx-auto rounded-full mb-6"></div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Book Title"
            value={form.title}
            onChange={(e)=>setForm({...form, title:e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E37EAF] focus:outline-none"
          />

          <textarea
            rows="3"
            placeholder="Short description"
            value={form.description}
            onChange={(e)=>setForm({...form, description:e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E37EAF] focus:outline-none"
          />

          {/* CATEGORY */}
          <select
            value={form.category}
            onChange={(e)=>setForm({...form, category:e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E37EAF] focus:outline-none text-gray-300"
          >
            <option className="bg-white/10"  value="">Select Category</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Adventure">Adventure</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setForm({...form, cover:e.target.files[0]})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 file:text-white"
          />

          <textarea
            rows="6"
            placeholder="Write your story..."
            value={form.content}
            onChange={(e)=>setForm({...form, content:e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E37EAF] focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold 
            bg-linear-to-r from-[#E37EAF] to-purple-500
            hover:scale-[1.03] active:scale-[0.97]
            shadow-[0_10px_40px_rgba(227,126,175,0.4)]
            transition-all duration-300"
          >
            Publish Story 🚀
          </button>

        </form>

      </div>
    </div>
  );
}