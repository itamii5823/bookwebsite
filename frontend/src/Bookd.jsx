import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Moon,
  Sun,
  BookOpen,
} from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState("dark");
  const [showUI, setShowUI] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios
      .get("https://bookwebsite-4q2b.onrender.com/books")
      .then((res) => {
        const found = res.data.find((b) => b._id === id);
        setBook(found);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("https://bookwebsite-4q2b.onrender.com/me", {
        withCredentials: true,
      })
      .then((res) => {
        setIsPremium(res.data.user.isPremium);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    let timer;

    const showTemporarily = () => {
      setShowUI(true);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setShowUI(false);
      }, 2500);
    };

    window.addEventListener("mousemove", showTemporarily);
    window.addEventListener("click", showTemporarily);
    window.addEventListener("touchstart", showTemporarily);

    showTemporarily();

    return () => {
      clearTimeout(timer);

      window.removeEventListener("mousemove", showTemporarily);
      window.removeEventListener("click", showTemporarily);
      window.removeEventListener("touchstart", showTemporarily);
    };
  }, []);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  const words = book.content.split(" ");

  const wordsPerPage = Math.max(
    70,
    Math.floor(150 * (18 / fontSize))
  );

  const pages = [];

  for (let i = 0; i < words.length; i += wordsPerPage) {
    pages.push(words.slice(i, i + wordsPerPage).join(" "));
  }

  const nextPage = () =>
    setPage((p) => Math.min(p + 1, pages.length - 1));

  const prevPage = () =>
    setPage((p) => Math.max(p - 1, 0));

  const progress = ((page + 1) / pages.length) * 100;

  const themes = {
    dark: {
      bg: "bg-[#09090b]",
      card: "bg-[#111114]/90",
      text: "text-zinc-100",
      muted: "text-zinc-400",
      border: "border-white/[0.06]",
      nav: "bg-black/20 supports-[backdrop-filter]:bg-black/10",
    },

    paper: {
      bg: "bg-[#e8e2d8]",
      card: "bg-[#f5f1ea]/90",
      text: "text-[#1e1e1e]",
      muted: "text-[#5f5f5f]",
      border: "border-black/[0.06]",
      nav: "bg-white/40",
    },

    sepia: {
      bg: "bg-[#1b1612]",
      card: "bg-[#241d18]/90",
      text: "text-[#f3e7d3]",
      muted: "text-[#c8b79f]",
      border: "border-white/[0.06]",
      nav: "bg-black/20 supports-[backdrop-filter]:bg-black/10",
    },
  };

  const activeTheme = themes[theme];

  if (checking) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-500">
        Checking access...
      </div>
    );
  }

  if (book?.isPremium && !isPremium) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/3drop-blur-3xl p-10 text-center shadow-[0_20px_100px_rgba(0,0,0,0.45)]">
          <div className="text-6xl mb-6">🔒</div>

          <h1 className="text-3xl font-semibold text-white mb-4">
            Premium Chapter
          </h1>

          <p className="text-zinc-400 leading-relaxed mb-8">
            Unlock premium stories, exclusive chapters,
            immersive reading themes, and creator-only
            content.
          </p>

          <button
            onClick={() => (window.location.href = "/book")}
            className="
              w-full
              h-13
              rounded-2xl
              bg-white
              text-black
              font-medium
              transition-all
              hover:scale-[1.02]
              active:scale-95
            "
          >
            Upgrade Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen
        transition-all
        duration-500
        overflow-hidden
        ${activeTheme.bg}
      `}
    >
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="
            absolute
            top-[-10%]
            left-[-10%]
            w-125
            h-125
            bg-fuchsia-500/10
            blur-[120px]
            rounded-full
            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-[-20%]
            right-[-10%]
            w-125
            h-125
            bg-violet-500/10
            blur-[120px]
            rounded-full
            animate-pulse
          "
        />
      </div>

      {/* TOP NAV */}
      <div
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500 ease-out
          ${
            showUI
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }
        `}
      >
        {/* progress */}
        <div className="h-0.5 bg-transparent">
          <div
            className="
              h-full
              bg-linear-to-r
              from-fuchsia-500
              via-violet-500
              to-cyan-400
              transition-all
              duration-300
            "
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* NAVBAR */}
        <div
          className={`
            backdrop-blur-3xl
            ${activeTheme.nav}
            border-b
            ${activeTheme.border}
          `}
        >
          <div
            className="
              max-w-7xl mx-auto
              px-3 sm:px-5
              py-3
              flex flex-col sm:flex-row
              sm:items-center
              justify-between
              gap-3 sm:gap-0
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
              <img
                src={book.cover}
                className="
                  w-11 h-14 sm:w-12 sm:h-16
                  object-cover
                  rounded-2xl
                  shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                  shrink-0
                "
              />

             <div className="min-w-0 flex-1">
  <h1
    className={`
      text-sm sm:text-base
      font-semibold
      truncate
      ${activeTheme.text}
    `}
  >
    {book.title}
  </h1>

  <button
    onClick={() =>
      window.location.href = `/creator/${book.username}`
    }
    className={`
      mt-1
      group
      flex items-center gap-1.5
      text-xs
      transition-all
      hover:translate-x-1
      ${activeTheme.muted}
    `}
  >
    <div className="
      w-5 h-5
      rounded-full
      bg-linear-to-br
      from-fuchsia-500
      to-violet-500
      flex items-center justify-center
      text-[10px]
      font-bold
      text-white
      shadow-lg
    ">
      {book.username?.charAt(0)?.toUpperCase()}
    </div>

    <span className="group-hover:text-white transition">
      @{book.username}
    </span>
  </button>
</div>
            </div>

            {/* CONTROLS */}
            <div
              className="
                flex items-center
                justify-between sm:justify-end
                gap-2
                w-full sm:w-auto
                overflow-x-auto
                pb-1
              "
            >
              {/* FONT */}
              <div
                className={`
                  flex items-center gap-2
                  px-2 py-2
                  rounded-2xl
                  border
                  backdrop-blur-xl
                  ${activeTheme.border}
                  ${
                    theme === "paper"
                      ? "bg-black/30"
                      : "bg-white/3"
                  }
                `}
              >
                <button
                  onClick={() =>
                    setFontSize((s) => Math.max(14, s - 1))
                  }
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-xl
                    flex items-center justify-center
                    transition-all
                    hover:bg-white/10
                    hover:scale-[1.03]
                    active:scale-95
                    ${activeTheme.text}
                  `}
                >
                  <Minus size={16} />
                </button>

                <span
                  className={`
                    text-sm
                    w-8 text-center
                    ${activeTheme.muted}
                  `}
                >
                  {fontSize}
                </span>

                <button
                  onClick={() =>
                    setFontSize((s) => Math.min(28, s + 1))
                  }
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-xl
                    flex items-center justify-center
                    transition-all
                    hover:bg-white/10
                    hover:scale-[1.03]
                    active:scale-95
                    ${activeTheme.text}
                  `}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* THEMES */}
              <div
                className={`
                  flex items-center gap-2
                  p-2 rounded-2xl
                  border
                  backdrop-blur-xl
                  ${activeTheme.border}
                  ${
                    theme === "paper"
                      ? "bg-black/3"
                      : "bg-white/3"
                  }
                `}
              >
                <button
                  onClick={() => setTheme("paper")}
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-xl
                    flex items-center justify-center
                    transition-all
                    hover:scale-[1.03]
                    active:scale-95
                    ${
                      theme === "paper"
                        ? "bg-black text-white"
                        : `${activeTheme.text}`
                    }
                  `}
                >
                  <Sun size={16} />
                </button>

                <button
                  onClick={() => setTheme("sepia")}
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-xl
                    flex items-center justify-center
                    transition-all
                    hover:scale-[1.03]
                    active:scale-95
                    ${
                      theme === "sepia"
                        ? "bg-[#6b4f36] text-white"
                        : `${activeTheme.text}`
                    }
                  `}
                >
                  <BookOpen size={16} />
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-xl
                    flex items-center justify-center
                    transition-all
                    hover:scale-[1.03]
                    active:scale-95
                    ${
                      theme === "dark"
                        ? "bg-white text-black"
                        : `${activeTheme.text}`
                    }
                  `}
                >
                  <Moon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex justify-center
          px-3 sm:px-5
          pt-40 sm:pt-32
          pb-28 sm:pb-20
          relative z-10
        "
      >
        <div className="w-full max-w-5xl relative">
          {/* LEFT BTN */}
          <button
            onClick={prevPage}
            className={`
              hidden xl:flex
              absolute
              -left-20 top-1/2 -translate-y-1/2
              w-14 h-14
              rounded-full
              items-center justify-center
              backdrop-blur-2xl
              border
              ${activeTheme.border}
              ${
                theme === "paper"
                  ? "bg-white/60"
                  : "bg-white/4"
              }
              ${activeTheme.text}
              transition-all
              hover:scale-[1.03]
              active:scale-95
            `}
          >
            <ChevronLeft size={22} />
          </button>

          {/* RIGHT BTN */}
          <button
            onClick={nextPage}
            className={`
              hidden xl:flex
              absolute
              -right-20 top-1/2 -translate-y-1/2
              w-14 h-14
              rounded-full
              items-center justify-center
              backdrop-blur-2xl
              border
              ${activeTheme.border}
              ${
                theme === "paper"
                  ? "bg-white/60"
                  : "bg-white/4"
              }
              ${activeTheme.text}
              transition-all
              hover:scale-[1.03]
              active:scale-95
            `}
          >
            <ChevronRight size={22} />
          </button>

          {/* CARD */}
          <div
            className={`
              rounded-[38px]
              border
              ${activeTheme.border}
              ${activeTheme.card}
              px-5 sm:px-16
              py-8 sm:py-18
              shadow-[0_25px_120px_rgba(0,0,0,0.45)]
              backdrop-blur-3xl
              relative
              overflow-hidden
            `}
          >
            {/* SHINE */}
            <div
              className="
                absolute
                inset-0
                bg-linear-to-br
                from-white/6
                via-transparent
                to-transparent
                pointer-events-none
              "
            />

            {/* PAGE INFO */}
            <div
              className={`
                mb-8 sm:mb-10
                text-sm
                flex items-center justify-between
                relative z-10
                ${activeTheme.muted}
              `}
            >
              <span>
                Page {page + 1} of {pages.length}
              </span>

              <span>{Math.round(progress)}%</span>
            </div>

            {/* CONTENT */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{
                  opacity: 0,
                  x: 40,
                  scale: 0.985,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: -40,
                  scale: 0.985,
                  filter: "blur(8px)",
                }}
                transition={{ duration: 0.28 }}
                style={{ fontSize: `${fontSize}px` }}
                className={`
                  leading-loose
                  sm:leading-[2.2]
                  tracking-[0.015em]
                  font-[350]
                  text-[16px] sm:text-[17px]
                  whitespace-pre-wrap
                  wrap-break-word
                  antialiased
                  selection:bg-violet-500/30
                  relative z-10
                  ${activeTheme.text}
                `}
              >
                {pages[page]}
              </motion.div>
            </AnimatePresence>

            {/* BOTTOM BAR */}
            <div className="mt-14 relative z-10">
              <div
                className={`
                  w-full h-1.25
                  rounded-full overflow-hidden
                  ${
                    theme === "paper"
                      ? "bg-black/10"
                      : "bg-white/10"
                  }
                `}
              >
                <div
                  className="
                    h-full
                    bg-linear-to-r
                    from-fuchsia-500
                    via-violet-500
                    to-cyan-400
                    transition-all
                    duration-300
                  "
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className={`
          fixed bottom-0 left-0 w-full
          sm:hidden
          z-50
          backdrop-blur-3xl
          shadow-[0_-10px_50px_rgba(0,0,0,0.25)]
          border-t
          ${activeTheme.border}
          ${
            theme === "paper"
              ? "bg-white/70"
              : "bg-black/40"
          }
        `}
      >
        <div className="grid grid-cols-3 gap-3 p-3">
          <button
            onClick={prevPage}
            className={`
              h-12 rounded-2xl
              flex items-center justify-center
              transition-all
              hover:scale-[1.03]
              active:scale-95
              ${
                theme === "paper"
                  ? "bg-black/5"
                  : "bg-white/5"
              }
              ${activeTheme.text}
            `}
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className={`
              h-12 rounded-2xl
              flex items-center justify-center
              text-sm font-medium
              ${
                theme === "paper"
                  ? "bg-black/5"
                  : "bg-white/5"
              }
              ${activeTheme.text}
            `}
          >
            {page + 1}/{pages.length}
          </div>

          <button
            onClick={nextPage}
            className={`
              h-12 rounded-2xl
              flex items-center justify-center
              transition-all
              hover:scale-[1.03]
              active:scale-95
              ${
                theme === "paper"
                  ? "bg-black/50"
                  : "bg-white/5"
              }
              ${activeTheme.text}
            `}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}