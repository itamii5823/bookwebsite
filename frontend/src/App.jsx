import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Feather,
  Mail,
  Sparkles,
  Search,
  Flame,
  ArrowRight,
  Lock,
} from "lucide-react";
import cuteLogo from "/silver.png";
import darkLogo from "/silver.png";
import neutralLogo from "/silver.png";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("All");

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
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);

  const getSide = (category) => {
    if (!category) return "Unknown";
    if (!category.includes("|")) return "Neutral";
    return category.split(" | ")[0];
  };

  const filteredBooks =
    filter === "All"
      ? books
      : books.filter((b) => getSide(b.category) === filter);

  const content = {
    cute: {
      heading: "Stories wrapped in futuristic elegance.",
      sub: "A premium storytelling experience crafted with emotion, atmosphere, and immersive visuals.",
      about:
        "Silverveil blends cinematic design with meaningful storytelling to create an unforgettable reading experience.",
    },

    dark: {
      heading: "Where stories become obsessions.",
      sub: "Dive into cinematic worlds filled with mystery, emotion, and unforgettable characters.",
      about:
        "Built for readers who crave premium storytelling experiences beyond ordinary platforms.",
    },

    neutral: {
      heading: "Stories designed to feel timeless.",
      sub: "A calm, luxurious reading space inspired by elegance, depth, and modern aesthetics.",
      about:
        "Minimal yet immersive — crafted for readers who value atmosphere as much as storytelling.",
    },
  };

  const themes = {
    dark: {
      bg: `
        bg-[#06070A]
        text-[#F5F7FA]
      `,

      nav: `
        bg-black/30
        backdrop-blur-3xl
        border-b border-white/[0.06]
        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
      `,

      card: `
        bg-gradient-to-b
        from-white/[0.07]
        to-white/[0.03]
        backdrop-blur-2xl
        border border-white/[0.08]
        shadow-[0_10px_60px_rgba(0,0,0,0.45)]
        hover:border-[#7C8BFF]/30
        hover:shadow-[0_0_40px_rgba(124,139,255,0.15)]
        transition-all duration-500
      `,

      primaryBtn: `
        bg-gradient-to-r
        from-[#7C8BFF]
        via-[#8F6BFF]
        to-[#B06CFF]
        text-white
        hover:scale-[1.03]
        hover:shadow-[0_0_30px_rgba(143,107,255,0.45)]
        transition-all duration-300
      `,

      secondaryBtn: `
        bg-white/[0.04]
        border border-white/[0.08]
        hover:bg-white/[0.07]
        transition-all duration-300
      `,

      accent: `
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-[#DDE7FF]
        via-[#AEBBFF]
        to-[#8F6BFF]
      `,

      muted: "text-[#A1A8B8]",

      logo: darkLogo,
    },

    neutral: {
      bg: `
        bg-[#0D0E12]
        text-[#ECECEC]
      `,

      nav: `
        bg-[#111318]/70
        backdrop-blur-3xl
        border-b border-white/[0.05]
      `,

      card: `
        bg-[#151821]/70
        backdrop-blur-2xl
        border border-white/[0.06]
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        hover:border-[#C7A86D]/20
        transition-all duration-500
      `,

      primaryBtn: `
        bg-gradient-to-r
        from-[#C7A86D]
        to-[#E7C58A]
        text-black
        hover:scale-[1.03]
        transition-all duration-300
      `,

      secondaryBtn: `
        bg-white/[0.03]
        border border-white/[0.08]
        hover:bg-white/[0.05]
        transition-all duration-300
      `,

      accent: `
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-[#F5D9A5]
        to-[#C7A86D]
      `,

      muted: "text-[#9A9DA5]",

      logo: neutralLogo,
    },

    cute: {
      bg: `
        bg-[#0A0D14]
        text-[#F4F7FF]
      `,

      nav: `
        bg-[#0D111A]/70
        backdrop-blur-3xl
        border-b border-cyan-400/10
      `,

      card: `
        bg-gradient-to-b
        from-[#121826]/90
        to-[#0F1420]/90
        backdrop-blur-2xl
        border border-cyan-400/10
        shadow-[0_10px_50px_rgba(0,0,0,0.4)]
        hover:border-cyan-300/30
        hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]
        transition-all duration-500
      `,

      primaryBtn: `
        bg-gradient-to-r
        from-[#22D3EE]
        via-[#38BDF8]
        to-[#818CF8]
        text-white
        hover:scale-[1.03]
        hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
        transition-all duration-300
      `,

      secondaryBtn: `
        bg-white/[0.03]
        border border-cyan-400/10
        hover:bg-cyan-400/[0.05]
        transition-all duration-300
      `,

      accent: `
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-[#67E8F9]
        via-[#93C5FD]
        to-[#A5B4FC]
      `,

      muted: "text-[#A7B3C7]",

      logo: cuteLogo,
    },
  };

  const current = themes[theme];
  const text = content[theme];

  return (
    <div
      className={`${current.bg} min-h-screen overflow-hidden`}
      style={{
        fontFamily:
          "'Inter', 'SF Pro Display', 'Poppins', sans-serif",
      }}
    >
      {/* PREMIUM BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#05060A]" />

        <div className="absolute top-[-20%] left-[-10%] w-175 h-175 rounded-full bg-[#7C8BFF]/10 blur-[160px]" />

        <div className="absolute bottom-[-20%] right-[-10%] w-175 h-175 rounded-full bg-[#22D3EE]/10 blur-[180px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      {/* THEME SWITCHER */}
      <div className="hidden md:flex fixed top-28 right-5 z-50 flex-col gap-3">
        {["cute", "dark", "neutral"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTheme(t);
              setFilter(
                t.charAt(0).toUpperCase() + t.slice(1)
              );
            }}
            className="
              px-4 py-2 rounded-2xl
              backdrop-blur-xl
              border border-white/10
              bg-white/4
              hover:bg-white/8
              hover:scale-105
              transition-all duration-300
              capitalize
            "
          >
            {t}
          </button>
        ))}
      </div>

      {/* NAVBAR */}
      <nav
        className={`h-20 flex justify-between items-center px-4 md:px-10 sticky top-0 z-40 ${current.nav}`}
      >
        <img
          src={current.logo}
          className="h-14 object-contain cursor-pointer"
        />

        <div className="hidden md:flex items-center gap-2">
          {[
            {
              icon: <BookOpen size={18} />,
              text: "Books",
              path: "/book",
            },
            {
              icon: <Feather size={18} />,
              text: "Submit",
              path: "/sign",
            },
            {
              icon: <Search size={18} />,
              text: "Search",
              path: "/search",
            },
            {
              icon: <Mail size={18} />,
              text: "About",
              path: "/about",
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="
                px-5 py-2.5 rounded-2xl
                flex items-center gap-2
                hover:bg-white/6
                transition-all duration-300
              "
            >
              {item.icon}
              {item.text}
            </button>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden flex flex-col justify-center items-center
            w-10 h-10 rounded-xl
            hover:bg-white/6
            transition
          "
        >
          <span
            className={`block w-6 h-0.5 bg-current transition ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-current my-1 transition ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-current transition ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
    
{menuOpen && (
  <div className="md:hidden fixed inset-0 z-50">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-md"
      onClick={() => setMenuOpen(false)}
    />

    {/* MENU PANEL */}
    <div className="absolute top-20 left-0 w-full px-4">

      <div
        className={`
          rounded-[28px]
          p-6
          space-y-6
          ${current.card}
        `}
      >

        {/* NAVIGATION */}
        <div className="space-y-3">

          {[
            {
              icon: <BookOpen size={18} />,
              text: "Books",
              path: "/book",
            },

            {
              icon: <Feather size={18} />,
              text: "Submit",
              path: "/sign",
            },

            {
              icon: <Search size={18} />,
              text: "Search",
              path: "/search",
            },

            {
              icon: <Mail size={18} />,
              text: "About",
              path: "/about",
            },
          ].map((item, index) => (

            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              className="
                w-full
                p-4
                rounded-2xl
                flex items-center gap-3
                bg-white/3
                hover:bg-white/6
                border border-white/5
                transition-all duration-300
              "
            >
              {item.icon}
              <span className="font-medium">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/6" />

        {/* THEME SECTION */}
<div>

  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/40 mb-4">
    Story Atmosphere
  </p>

  <div className="space-y-3">

    {[
      {
        key: "dark",
        title: "Dark",
        desc: "Mystery • Power • Shadows",
        dot: "bg-violet-400",
        active:
          "border-violet-400/30 bg-violet-400/10",
      },

      {
        key: "neutral",
        title: "Neutral",
        desc: "Elegant • Calm • Timeless",
        dot: "bg-amber-300",
        active:
          "border-amber-300/30 bg-amber-300/10",
      },

      {
        key: "cute",
        title: "Cute",
        desc: "Fantasy • Soft • Dreamy",
        dot: "bg-cyan-300",
        active:
          "border-cyan-300/30 bg-cyan-300/10",
      },
    ].map((t) => (

      <button
        key={t.key}
        onClick={() => {
          setTheme(t.key);

          setFilter(
            t.key.charAt(0).toUpperCase() +
            t.key.slice(1)
          );
        }}
        className={`w-full rounded-[20px] border overflow-hidden transition-all duration-300 ${
          theme === t.key
            ? t.active +
              " shadow-[0_0_25px_rgba(255,255,255,0.03)]"
            : "border-white/6 bg-white/3 hover:bg-white/5"
        }`}
      >

        <div className="flex items-center justify-between px-5 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* DOT */}
            <div
              className={`w-3 h-3 rounded-full ${t.dot}`}
            />

            {/* TEXT */}
            <div className="text-left">

              <h3 className="text-sm font-semibold text-white">
                {t.title}
              </h3>

              <p className="text-xs text-white/45 mt-1">
                {t.desc}
              </p>

            </div>
          </div>

          {/* ACTIVE CHECK */}
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
              theme === t.key
                ? "border-white/30 bg-white/10"
                : "border-white/10"
            }`}
          >

            {theme === t.key && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}

          </div>
        </div>
      </button>
    ))}
  </div>
</div>

      </div>
    </div>
  </div>
)}

      {/* HERO */}
      <section className="relative text-center py-36 md:py-44 px-4 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/4 backdrop-blur-xl mb-8 text-sm">
          <Sparkles size={16} />
          Premium Storytelling Platform
        </div>

        <h1
          className={`
            text-5xl sm:text-6xl md:text-8xl
            font-black tracking-[-0.04em]
            leading-[0.95]
            max-w-6xl mx-auto mb-8
            drop-shadow-[0_0_25px_rgba(255,255,255,0.08)]
            ${current.accent}
          `}
        >
          {text.heading}
        </h1>

        <p
          className={`max-w-2xl mx-auto text-lg md:text-xl leading-8 mb-10 ${current.muted}`}
        >
          {text.sub}
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <button
            onClick={() => navigate("/book")}
            className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 ${current.primaryBtn}`}
          >
            Explore Stories
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/admin")}
            className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 ${current.secondaryBtn}`}
          >
            <Sparkles size={18} />
            Submit Story
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [books.length, "Stories"],
            ["24/7", "Readers"],
            ["∞", "Imagination"],
            ["100%", "Passion"],
          ].map(([value, label], index) => (
            <div
              key={index}
              className={`
                p-7 rounded-3xl
                text-center
                hover:-translate-y-1
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all duration-500
                ${current.card}
              `}
            >
              <h3
                className={`text-3xl font-black mb-2 ${current.accent}`}
              >
                {value}
              </h3>

              <p className="text-sm opacity-70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-362.5 mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FEATURED */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Flame className={current.accent} />
              <h2 className="text-3xl font-bold">
                Featured Stories
              </h2>
            </div>

            <div className="space-y-5">
              {filteredBooks.slice(-4).map((book) => (
                <div
                  key={book._id}
                  onClick={() => {
                    if (book.isPremium) return;
                    navigate(`/bookd/${book._id}`);
                  }}
                  className={`
                    group p-5 rounded-3xl
                    cursor-pointer
                    hover:-translate-y-1
                    hover:scale-[1.01]
                    active:scale-[0.99]
                    transition-all duration-500
                    ${current.card}
                  `}
                >
                  <div className="flex gap-5">
                    <div className="relative w-28 aspect-2/3 rounded-2xl overflow-hidden shrink-0">
                      <img
                        src={book.cover}
                        loading="lazy"
                        className={`
                          w-full h-full object-cover transition duration-700
                          ${
                            book.isPremium
                              ? "blur-sm brightness-75"
                              : "group-hover:scale-110"
                          }
                        `}
                      />

                      {book.isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-medium">
                          <div className="flex items-center gap-1.5">
                            <Lock size={13} strokeWidth={2.5} />
                              <span>Premium</span>
                           </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center flex-1">
                      <h3
                        className={`text-2xl font-bold mb-3 ${current.accent}`}
                      >
                        {book.title}
                      </h3>

                      <p className="opacity-70 leading-7 line-clamp-3">
                        {book.description}
                      </p>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING */}
          <div
            className={`
              p-6 rounded-3xl
              h-fit sticky top-28
              ${current.card}
            `}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className={current.accent} size={20} />
              <h3 className="text-2xl font-bold">Trending</h3>
            </div>

            <div className="space-y-3">
              {filteredBooks.map((b, index) => (
                <div
                  key={b._id}
                  onClick={() => navigate(`/bookd/${b._id}`)}
                  className="
                    group flex items-center justify-between
                    p-4 rounded-2xl
                    hover:bg-white/4
                    cursor-pointer transition-all
                  "
                >
                  <div>
                    <p className="font-semibold group-hover:translate-x-1 transition-all">
                      {b.title}
                    </p>
                  </div>

                  <span className="text-xs opacity-40 font-bold">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEW STORIES */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl font-black">
              New Stories
            </h2>

            <button
              onClick={() => navigate("/book")}
              className={`px-5 py-3 rounded-2xl font-medium ${current.secondaryBtn}`}
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredBooks.slice(-6).map((book) => (
              <div
                key={book._id}
                onClick={() => {
                  if (book.isPremium) return;
                  navigate(`/bookd/${book._id}`);
                }}
                className={`
                  group overflow-hidden rounded-3xl
                  cursor-pointer
                  hover:-translate-y-1
                  hover:scale-[1.01]
                  active:scale-[0.99]
                  transition-all duration-500
                  ${current.card}
                `}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={book.cover}
                    loading="lazy"
                    className={`
                      w-full h-full object-cover transition duration-700
                      ${
                        book.isPremium
                          ? "blur-sm brightness-75"
                          : "group-hover:scale-110"
                      }
                    `}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                  {book.isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-semibold">
                       <div className="flex items-center gap-1.5">
                            <Lock size={13} strokeWidth={2.5} />
                                  <span>Premium</span>
                                    </div>
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <h3
                    className={`text-xl font-bold mb-3 ${current.accent}`}
                  >
                    {book.title}
                  </h3>

                  <p className="text-sm opacity-70 leading-7 line-clamp-3">
                    {book.description}
                  </p>
                  <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/creator/${book.username}`);
  }}
  className="
    mt-4
    text-sm
    text-white/50
    hover:text-white
    transition-all
  "
>
  @{book.username}
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-4 pb-24">
        <div
          className={`
            max-w-5xl mx-auto
            p-10 md:p-16
            rounded-[28px]
            text-center
            ${current.card}
          `}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Our Story
          </h2>

          <p className="text-lg leading-9 opacity-80 max-w-3xl mx-auto">
            {text.about}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm opacity-50 backdrop-blur-xl bg-white/2">
        © 2026 Silverveil.press — Crafted for dreamers.
      </footer>
    </div>
  );
}