import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    cover: "",
    content: ""
  });
    console.log(form);
    
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.cover.trim() ||
      !form.content.trim()
    ) {
      return setAlert({
        type: "error",
        message: "All fields are required 💔"
      });
    }

    try {
      await axios.post(
        "http://localhost:5000/addbook",
        {
          title: form.title.trim(),
          description: form.description.trim(),
          cover: form.cover.trim(),
          content: form.content.trim()
        },
        { withCredentials: true }
      );
      
      setAlert({
        type: "success",
        message: "Book published successfully 📚✨",

      });
       navigate("/book")
      // RESET FORM
      setForm({
        title: "",
        description: "",
        cover: "",
        content: ""
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] relative overflow-hidden">

      {/* BLOBS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40"></div>

      {/* ALERT */}
      {alert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-blue-200 shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3">

            <span className="text-xl">
              {alert.type === "error" ? "💔" : "✨"}
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
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-xl rounded-3xl p-8 w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📖✨</div>

          <h2 className="text-3xl font-bold text-blue-500">
            Create Your Book 💙
          </h2>

          <p className="text-sm text-blue-400 mt-1">
            Turn your imagination into something real…
          </p>
        </div>

        <div className="w-12 h-1 bg-blue-300 mx-auto rounded-full mb-6"></div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Book Title 📚"
            value={form.title}
            onChange={(e)=>setForm({...form, title:e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-blue-200"
          />

          {/* DESCRIPTION */}
          <textarea
            rows="3"
            placeholder="Short description ✍️"
            value={form.description}
            onChange={(e)=>setForm({...form, description:e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-blue-200"
          />

          {/* COVER */}
          <input
            type="text"
            placeholder="Cover Image URL 🖼️"
            value={form.cover}
            onChange={(e)=>setForm({...form, cover:e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-blue-200"
          />

          {/* CONTENT */}
          <textarea
            rows="6"
            placeholder="Write your full story here... 📖✨"
            value={form.content}
            onChange={(e)=>setForm({...form, content:e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-blue-200"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white 
            bg-linear-to-r from-[#38BDF8] to-[#60A5FA]
            shadow-[0_10px_25px_rgba(56,189,248,0.35)]
            hover:shadow-[0_15px_35px_rgba(56,189,248,0.5)]
            hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-300"
          >
            Publish Story ✨
          </button>

        </form>

      </div>
    </div>
  );
}