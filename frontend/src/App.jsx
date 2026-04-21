import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { BookOpen, Feather, Info, Mail, Sparkles } from "lucide-react";

import cuteLogo from "/silver.png";
import darkLogo from "/silver.png";
import neutralLogo from "/hehe.png";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch("https://bookwebsite-4q2b.onrender.com/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.log(err));
  }, []);

  const content = {
  cute: {
    heading: "Where stories slip beyond the veil.",
    sub: "Soft worlds unfold where tenderness, wonder, and quiet magic gently pull you somewhere kinder.",
    about: "A space for gentle narratives, soft emotions, and stories that feel like a quiet escape."
  },

  dark: {
    heading: "Where stories are not just told, but sworn.",
    sub: "Every tale is a pact of shadows, binding you to truths that linger long after the last page.",
    about: "Here, stories are heavier — filled with depth, consequence, and echoes that refuse to fade."
  },

  neutral: {
    heading: "Where stories find you under moonlight.",
    sub: "In the hush between extremes, stories arrive with depth, meaning, and a touch of fate.",
    about: "Balanced storytelling that blends emotion, clarity, and quiet elegance."
  }
};

  const themes = {

  // 🌸 KEEP SAME (you didn’t ask change)
  cute: {
    bg: "bg-gradient-to-br from-[#ffe4e6] via-[#fbcfe8] to-[#e5e5e5] text-gray-800",
    nav: "bg-white/40 backdrop-blur-xl shadow-sm",
    card: "bg-white/70 border border-pink-100 shadow-md hover:shadow-xl",
    primaryBtn: "bg-pink-400 text-white hover:bg-pink-500 transition-all",
    secondaryBtn: "bg-white text-pink-500 border border-pink-200 hover:bg-pink-50 transition-all",
    accent: "text-pink-500",
    input: "bg-white border border-pink-200",
    logo: cuteLogo,
    hover: "hover:bg-pink-50"
  },

  // 🖤 OBSIDIAN INK (REAL DARK THEME)
  dark: {
    bg: "bg-[#0B0B0C] text-[#B8B8C0]",
    nav: "bg-[#0B0B0C]/90 backdrop-blur-xl border-b border-[#2B0F1A]",
    card: "bg-[#2B0F1A]/30 border border-[#2B0F1A] backdrop-blur-md",

    primaryBtn:
      "bg-[#3A2FFF] text-white hover:bg-[#2a22cc] hover:shadow-indigo-500/40 transition-all duration-300",

    secondaryBtn:
      "bg-[#2B0F1A] text-[#B8B8C0] border border-[#2B0F1A] hover:bg-[#3a1624] transition-all",

    accent: "text-[#3A2FFF]",
    input: "bg-[#2B0F1A] border border-[#2B0F1A] text-[#B8B8C0]",
    logo: darkLogo,
    hover: "hover:bg-[#2B0F1A]"
  },

  // 🍷 CRIMSON THREAD (NEUTRAL)
  neutral: {
    bg: "bg-[#5A0F1C] text-[#F5F2EE]",
    nav: "bg-[#5A0F1C]/90 backdrop-blur-xl border-b border-[#8B3A3A]",
    card: "bg-[#8B3A3A]/20 border border-[#8B3A3A]",

    primaryBtn:
      "bg-[#C2A878] text-black hover:bg-[#b89c6c] hover:shadow-yellow-600/30 transition-all",

    secondaryBtn:
      "bg-transparent text-[#F5F2EE] border border-[#C2A878] hover:bg-[#C2A878] hover:text-black transition-all",

    accent: "text-[#C2A878]",
    input: "bg-[#8B3A3A]/20 border border-[#8B3A3A] text-[#F5F2EE]",
    logo: neutralLogo,
    hover: "hover:bg-[#8B3A3A]/20"
  }
};
  const current = themes[theme];
  const text = content[theme];

  return (
    <div className={`${current.bg} min-h-screen`}>

      {/* THEME SWITCH */}
      <div className="hidden md:flex fixed top-20 right-5 z-50 flex-col gap-2">
        <button onClick={() => setTheme("cute")} className="px-3 py-1 bg-pink-300 rounded-full text-xs shadow">Cute</button>
        <button onClick={() => setTheme("dark")} className="px-3 py-1 bg-black text-white rounded-full text-xs shadow">Dark</button>
        <button onClick={() => setTheme("neutral")} className="px-3 py-1 bg-red-900 text-white rounded-full text-xs shadow">Neutral</button>
      </div>

      {/* NAV */}
      <nav className={`h-16 flex justify-between items-center px-4 md:px-8 sticky top-0 z-40 ${current.nav}`}>
        <img src={current.logo} className="h-16 object-contain" />

        <div className="space-x-8 hidden md:flex">

          <button onClick={()=>navigate("/book")} className="flex items-center gap-2 hover:text-pink-400 transition">
            <BookOpen size={18}/> Books
          </button>

          <button onClick={()=>navigate("/sign")} className="flex items-center gap-2 hover:text-purple-400 transition">
            <Feather size={18}/> Submit
          </button>

          <button className="flex items-center gap-2 hover:text-blue-400 transition">
            <Info size={18}/> About
          </button>

          <button className="flex items-center gap-2 hover:text-red-400 transition">
            <Mail size={18}/> Contact
          </button>

        </div>

        {/* HAMBURGER */}
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition"
        >
          <span className={`block w-6 h-0.5 bg-current ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current my-1 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
        </nav>

{/* 👇 PASTE HERE */}
{menuOpen && (
  <div className="md:hidden fixed inset-0 z-[999]">

    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setMenuOpen(false)}
    />

    <div className="absolute top-16 left-0 w-full px-4">
      <div className={`rounded-2xl p-5 space-y-4 ${current.nav} shadow-2xl`}>

        <button onClick={()=>{navigate("/book"); setMenuOpen(false);}} className="flex items-center gap-2 w-full">
          <BookOpen size={18}/> Books
        </button>

        <button onClick={()=>{navigate("/sign"); setMenuOpen(false);}} className="flex items-center gap-2 w-full">
          <Feather size={18}/> Submit
        </button>

        <button className="flex items-center gap-2 w-full">
          <Info size={18}/> About
        </button>

        <button className="flex items-center gap-2 w-full">
          <Mail size={18}/> Contact
        </button>

        <div className="border-t border-white/10 pt-4" />

        <div className="flex gap-2">
          <button onClick={() => setTheme("cute")} className="flex-1 py-2 rounded-xl bg-pink-300 text-sm">Cute</button>
          <button onClick={() => setTheme("dark")} className="flex-1 py-2 rounded-xl bg-black text-white text-sm">Dark</button>
          <button onClick={() => setTheme("neutral")} className="flex-1 py-2 rounded-xl bg-red-900 text-white text-sm">Neutral</button>
        </div>

      </div>
    </div>

  </div>
)}
      

      {/* HERO */}
      <section className="text-center py-20 px-4">
        <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${current.accent}`}>
          {text.heading}
        </h2>

        <p className="max-w-xl mx-auto mb-8 opacity-80">
          {text.sub}
        </p>

        {/* 🔥 ICON BUTTONS */}
        <div className="flex justify-center gap-4 flex-wrap">

          <button
            onClick={()=>navigate("/book")}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 ${current.primaryBtn}`}
          >
            <BookOpen size={20}/>
            Explore Stories
          </button>

          <button
            onClick={()=>navigate("/admin")}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 ${current.secondaryBtn}`}
          >
            <Sparkles size={20}/>
            Submit Story
          </button>

        </div>
      </section>

     


      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FEATURED */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold">Featured Stories</h3>

            {books.slice(-3).map((book) => (
              <div
                key={book._id}
                onClick={() => navigate(`/bookd/${book._id}`)} // 
                className={`flex gap-4 p-4 rounded-2xl cursor-pointer ${current.card}`}
              >
                <img
                  src={`data:image/jpeg;base64,${book.cover}`} // 
                  className="w-28 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className={`font-semibold ${current.accent}`}>{book.title}</h4>
                  <p className="text-sm opacity-70 line-clamp-2">{book.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <div className={`p-5 rounded-2xl ${current.card}`}>
            <h3 className="text-sm font-semibold mb-4">Trending</h3>

            <div className="space-y-3">
              {books.map((b) => (
                <p
                  key={b._id}
                  onClick={() => navigate(`/bookd/${b._id}`)} 
                  className="text-sm opacity-70 hover:opacity-100 cursor-pointer"
                >
                  {b.title}
                </p>
              ))}
            </div>
          </div>

        </div>

        {/* GRID */}
        <h3 className="text-xl font-semibold mt-14 mb-6 text-center">
          New Stories
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.slice(-3).map((book) => (
            <div
              key={book._id}
              onClick={() => navigate(`/bookd/${book._id}`)} 
              className={`rounded-2xl overflow-hidden cursor-pointer ${current.card}`}
            >
              <img
                src={`data:image/jpeg;base64,${book.cover}`} 
                className="h-60 w-full object-cover"
              />
              <div className="p-4">
                <h4 className={`font-semibold ${current.accent}`}>{book.title}</h4>
                <p className="text-sm opacity-70 mt-1">{book.description}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ABOUT */}
      <section className="text-center py-20 px-6">
        <div className={`max-w-3xl mx-auto p-10 rounded-3xl ${current.card}`}>
          <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
          <p className="opacity-80">{text.about}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm opacity-60">
        © 2026 Silver.veil.press
      </footer>

    </div>
  );
}