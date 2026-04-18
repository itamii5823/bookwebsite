import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import cuteLogo from "/hehe.png";
import darkLogo from "/hehe.png";
import neutralLogo from "/hehe.png";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ CHANGED (dummy → real)
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ ADDED (fetch real books)
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.log(err));
  }, []);

  const content = {
    cute: {
      heading: "Soft Sky Stories ☁️💙",
      sub: "A calm dreamy space where stories feel light and magical.",
      about: "We create soft, peaceful storytelling experiences."
    },
    dark: {
      heading: "Love in the Dark 🖤",
      sub: "Stories filled with passion, mystery, and intensity.",
      about: "We explore deep emotions and dark storytelling."
    },
    neutral: {
      heading: "Stories, Simply Told",
      sub: "Clean and minimal storytelling experience.",
      about: "We focus on clarity and meaningful writing."
    }
  };

  const themes = {
    cute: {
      bg: "bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#F0F9FF]",
      nav: "bg-white/70 backdrop-blur-xl shadow-sm",
      card: "bg-white/70 border border-blue-100 shadow-md hover:shadow-xl",
      primaryBtn: "bg-[#38BDF8] text-white shadow-md hover:scale-105",
      secondaryBtn: "bg-white text-blue-500 border border-blue-200 hover:bg-blue-50",
      accent: "text-blue-500",
      input: "bg-white border border-blue-200",
      logo: cuteLogo,
      hover: "hover:bg-blue-50"
    },
    dark: {
      bg: "bg-[#0B0F1A] text-gray-200",
      nav: "bg-black/40 backdrop-blur-xl",
      card: "bg-white/5 border border-white/10",
      primaryBtn: "bg-red-500 text-white hover:scale-105",
      secondaryBtn: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
      accent: "text-red-400",
      input: "bg-white/10 border border-white/20 text-white",
      logo: darkLogo,
      hover: "hover:bg-white/10"
    },
    neutral: {
      bg: "bg-[#FAF7F2] text-gray-800",
      nav: "bg-white shadow-sm",
      card: "bg-white shadow-sm",
      primaryBtn: "bg-gray-900 text-white hover:scale-105",
      secondaryBtn: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      accent: "text-gray-800",
      input: "bg-white border",
      logo: neutralLogo,
      hover: "hover:bg-gray-100"
    }
  };

  const current = themes[theme];
  const text = content[theme];

  return (
    <div className={`${current.bg} min-h-screen`}>

      {/* THEME SWITCH */}
      <div className="hidden md:flex fixed top-20 right-5 z-50 flex-col gap-2">
        <button onClick={() => setTheme("cute")} className="px-3 py-1 bg-blue-300 rounded-full text-xs shadow">Cute</button>
        <button onClick={() => setTheme("dark")} className="px-3 py-1 bg-black text-white rounded-full text-xs shadow">Dark</button>
        <button onClick={() => setTheme("neutral")} className="px-3 py-1 bg-gray-300 rounded-full text-xs shadow">Neutral</button>
      </div>

      {/* NAVBAR */}
      <nav className={`h-16 flex justify-between items-center px-4 md:px-8 sticky top-0 z-40 ${current.nav}`}>
        <img src={current.logo} className="h-16 object-contain" />

        <div className="space-x-8 hidden md:flex">
          <button onClick={()=>navigate("/book")}>Books</button>
          <button onClick={()=>navigate("/sign")}>Submit</button>
          <button>About</button>
          <button>Contact</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-20 px-4">
        <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${current.accent}`}>
          {text.heading}
        </h2>

        <p className="max-w-xl mx-auto mb-8 opacity-80">
          {text.sub}
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={()=>navigate("/book")} className={`px-8 py-3 rounded-xl font-semibold ${current.primaryBtn}`}>
            Explore Stories
          </button>

          <button onClick={()=>navigate("/admin")} className={`px-8 py-3 rounded-xl font-semibold ${current.secondaryBtn}`}>
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
                onClick={() => navigate(`/bookd/${book._id}`)} // ✅ clickable
                className={`flex gap-4 p-4 rounded-2xl cursor-pointer ${current.card}`}
              >
                <img
                  src={`data:image/jpeg;base64,${book.cover}`} // ✅ real image
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
                  onClick={() => navigate(`/bookd/${b._id}`)} // ✅ clickable
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
              onClick={() => navigate(`/bookd/${book._id}`)} // ✅ clickable
              className={`rounded-2xl overflow-hidden cursor-pointer ${current.card}`}
            >
              <img
                src={`data:image/jpeg;base64,${book.cover}`} // ✅ real image
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
        © 2026 Moonlit Pages
      </footer>

    </div>
  );
}