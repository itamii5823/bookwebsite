import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import cuteLogo from "../public/hehe.png";
import darkLogo from "../public/hehe.png";
import neutralLogo from "../public/hehe.png";

export default function Home() {
  const [theme, setTheme] = useState("cute");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const books = [
    {
      id: 1,
      title: "Whispers of Moonlight",
      author: "Aanya Verma",
      description: "A dreamy romantic fantasy under soft starlight.",
      cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },
    {
      id: 2,
      title: "Petals & Promises",
      author: "Riya Kapoor",
      description: "A soft love story filled with warmth and petals.",
      cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
    },
    {
      id: 3,
      title: "Starlight Letters",
      author: "Ishaan Mehta",
      description: "Letters that travel across stars and emotions.",
      cover: "https://images.unsplash.com/photo-1528207776546-365bb710ee93"
    }
  ];

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
      primaryBtn:
        "bg-[#38BDF8] text-white shadow-md hover:scale-105",
      secondaryBtn:
        "bg-white text-blue-500 border border-blue-200 hover:bg-blue-50",
      accent: "text-blue-500",
      input: "bg-white border border-blue-200",
      logo: cuteLogo,
      hover: "hover:bg-blue-50"
    },
    dark: {
      bg: "bg-gradient-to-br from-black via-[#140a10] to-[#1f0a14] text-gray-200",
      nav: "bg-black/40 backdrop-blur-xl",
      card: "bg-white/5 border border-white/10",
      primaryBtn: "bg-red-500 text-white hover:scale-105",
      secondaryBtn:
        "bg-white/10 text-white border border-white/20 hover:bg-white/20",
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
      secondaryBtn:
        "bg-gray-100 text-gray-800 hover:bg-gray-200",
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

      {/* THEME SWITCH (DESKTOP ONLY) */}
      <div className="hidden md:flex fixed top-20 right-5 z-50 flex-col gap-2">
        <button onClick={() => setTheme("cute")} className="px-3 py-1 bg-blue-300 rounded-full text-xs shadow">Cute</button>
        <button onClick={() => setTheme("dark")} className="px-3 py-1 bg-black text-white rounded-full text-xs shadow">Dark</button>
        <button onClick={() => setTheme("neutral")} className="px-3 py-1 bg-gray-300 rounded-full text-xs shadow">Neutral</button>
      </div>

      {/* NAVBAR */}
      <nav className={`h-16 flex justify-between items-center px-4 md:px-8 sticky top-0 z-40 ${current.nav}`}>
        
        <img src={current.logo} className="h-16 mt-2 object-contain" />

        {/* DESKTOP MENU */}
        <div className="space-x-8 hidden md:flex">
          <button onClick={()=>{navigate("/book")}} >Books</button>
          <button onClick={()=>{navigate("/sign")}}>Submit</button>
          <button>About</button>
          <button>Contact</button>
        </div>

        {/* HAMBURGER */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(true)}
        >
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
          
          <div className={`absolute right-0 top-0 h-full w-[75%] max-w-xs ${current.nav} shadow-2xl p-6 flex flex-col`}>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-lg">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-xl">✕</button>
            </div>

            {/* THEME SWITCH (MOBILE) */}
            <div className="mb-6">
              <p className="text-sm mb-2 opacity-60">Theme</p>
              <div className="flex gap-2">
                <button onClick={() => setTheme("cute")} className="px-3 py-1 bg-blue-300 rounded-full text-xs">Cute</button>
                <button onClick={() => setTheme("dark")} className="px-3 py-1 bg-black text-white rounded-full text-xs">Dark</button>
                <button onClick={() => setTheme("neutral")} className="px-3 py-1 bg-gray-300 rounded-full text-xs">Neutral</button>
              </div>
            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col gap-4">
              {["Books", "Submit", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition ${current.hover}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <button onClick={()=>{navigate("/book")}} className={`w-full py-3 rounded-xl font-semibold ${current.primaryBtn}`}>
                Explore
              </button>
            </div>

          </div>
        </div>
      )}

      {/* HERO */}
      <section className="flex flex-col items-center text-center py-20 md:py-28 px-4 md:px-6">
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 ${current.accent}`}>
          {text.heading}
        </h2>

        <p className="max-w-md md:max-w-xl mb-6 md:mb-8 text-sm md:text-lg opacity-80">
          {text.sub}
        </p>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <button onClick={()=>{navigate("/book")}} className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold ${current.primaryBtn}`}>
            Explore
          </button>

          <button onClick={()=>{navigate("/admin")}} className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold ${current.secondaryBtn}`}>
            Submit
          </button>
        </div>
      </section>

      {/* BOOKS */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 md:mb-14">
          Featured Stories
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {books.map((book) => (
            <div key={book.id} className={`rounded-3xl overflow-hidden ${current.card}`}>
              <img src={book.cover} className="h-60 md:h-72 w-full object-cover" />
              <div className="p-4 md:p-6">
                <h4 className={`text-base md:text-lg font-semibold mb-2 ${current.accent}`}>
                  {book.title}
                </h4>
                <p className="text-xs md:text-sm opacity-70">
                  {book.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="text-center py-16 md:py-24 px-4 md:px-6">
        <div className={`max-w-xl md:max-w-3xl mx-auto p-6 md:p-10 rounded-3xl ${current.card}`}>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Our Story
          </h3>
          <p className="text-sm md:text-base opacity-80">
            {text.about}
          </p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-24 text-center px-4 md:px-6">
        <h3 className="text-lg md:text-xl font-semibold mb-6">
          Join Our Circle 💌
        </h3>

        <div className="flex flex-col md:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email..."
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full ${current.input}`}
          />

          <button className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold ${current.primaryBtn}`}>
            Subscribe
          </button>
        </div>
      </section>

      <footer className="text-center py-6 text-sm opacity-60">
        © 2026 Moonlit Pages
      </footer>
    </div>
  );
}