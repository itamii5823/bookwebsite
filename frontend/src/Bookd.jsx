import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BookDetail() {

  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState("paper");
  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/books")
      .then(res => {
        const found = res.data.find(b => b._id === id);
        setBook(found);
      });
  }, [id]);

 
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

 
  useEffect(() => {
    setPage(0);
  }, [fontSize]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading...
      </div>
    );
  }


  const words = book.content.split(" ");

  const baseWords = 140;
  const wordsPerPage = Math.max(60, Math.floor(baseWords * (18 / fontSize)));

  const pages = [];
  for (let i = 0; i < words.length; i += wordsPerPage) {
    pages.push(words.slice(i, i + wordsPerPage).join(" "));
  }

  const nextPage = () => setPage(p => Math.min(p + 1, pages.length - 1));
  const prevPage = () => setPage(p => Math.max(p - 1, 0));

  const progress = ((page + 1) / pages.length) * 100;


  const themes = {
    paper: "bg-[#fdf6e3] text-[#1f2937]",
    dark: "bg-[#0b0f19] text-[#e5e7eb]",
    sepia: "bg-[#f4ecd8] text-[#4b3f2f]"
  };


  const MinusIcon = () => (
    <svg width="16" height="16" fill="currentColor">
      <rect x="3" y="7" width="10" height="2"/>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" fill="currentColor">
      <rect x="7" y="3" width="2" height="10"/>
      <rect x="3" y="7" width="10" height="2"/>
    </svg>
  );

  const SunIcon = () => (
    <svg width="18" height="18" fill="currentColor">
      <circle cx="9" cy="9" r="3"/>
      <g stroke="currentColor" strokeWidth="1.5">
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="9" y1="14" x2="9" y2="17"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="14" y1="9" x2="17" y2="9"/>
      </g>
    </svg>
  );

  const MoonIcon = () => (
    <svg width="18" height="18" fill="currentColor">
      <path d="M12 2a7 7 0 1 0 4 12 6 6 0 1 1-4-12z"/>
    </svg>
  );

  const BookIcon = () => (
    <svg width="18" height="18" fill="currentColor">
      <path d="M3 4c0-1 1-2 2-2h8v14H5c-1 0-2-1-2-2V4z"/>
    </svg>
  );

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${theme === "dark" ? "bg-black" : "bg-[#0b0f19]"}`}
      onClick={(e) => {
        const x = e.clientX;
        const width = window.innerWidth;

        if (x < width * 0.3) prevPage();
        else if (x > width * 0.7) nextPage();
      }}
      onMouseMove={() => setShowUI(true)}
    >

      {/* TOP BAR */}
      <div className={`fixed top-0 left-0 w-full z-50 transition ${showUI ? "opacity-100" : "opacity-0"}`}>
        
        <div className="h-0.5 bg-gray-800">
          <div className="h-full bg-indigo-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 text-sm text-gray-400 backdrop-blur bg-black/30">

          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={`data:image/jpeg;base64,${book.cover}`}
              className="w-8 h-12 object-cover rounded"
            />
            <div className="truncate">
              <p className="text-white text-xs truncate">{book.title}</p>
              <p className="text-[10px] text-gray-400">{book.username}</p>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">

            <button
              onClick={(e) => { e.stopPropagation(); setFontSize(s => Math.max(14, s - 1)); }}
              className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition"
            >
              <MinusIcon />
            </button>

            <span className="text-xs opacity-60">{fontSize}px</span>

            <button
              onClick={(e) => { e.stopPropagation(); setFontSize(s => Math.min(26, s + 1)); }}
              className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition"
            >
              <PlusIcon />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setTheme("paper"); }}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <SunIcon />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setTheme("sepia"); }}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <BookIcon />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setTheme("dark"); }}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <MoonIcon />
            </button>

          </div>
        </div>
      </div>

      {/* READER */}
      <div className="flex justify-center pt-24 px-4 pb-10">

        <div className="w-full max-w-2xl">

          <div
            className={`rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] px-5 sm:px-10 py-8 sm:py-10 min-h-[60vh] transition-all duration-500 ${themes[theme]}`}
            onClick={(e) => e.stopPropagation()}
          >

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ fontSize: `${fontSize}px` }}
                className="font-serif leading-relaxed sm:leading-loose tracking-wide"
              >
                {pages[page]}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 text-xs sm:text-sm opacity-60">
              <span>{page + 1} / {pages.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}