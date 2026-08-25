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
  User,
  CalendarDays,
  Clock3,
  Star,
} from "lucide-react";
import darkLogo from "/silver.png";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

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


  const getGenre = (book) => book?.genre || getSide(book?.category) || "Fiction";
  const getAuthor = (book) => book?.author || book?.username || "Silverveil Press";

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getReadingTime = (book) => {
    if (book?.readingTime) return `${book.readingTime} min read`;
    if (book?.pages) {
      const minutes = Math.max(5, Math.round(Number(book.pages) * 1.2));
      return `${minutes} min read`;
    }
    return "";
  };

  const current = {
    bg: "bg-[#0B0F1A] text-white",
    nav: "bg-[#0B0F1A] border-white/10",
    card: "bg-[#151821] border-white/10 hover:border-white/15",
    primaryBtn: "bg-yellow-400 text-black hover:bg-yellow-300",
    secondaryBtn: "bg-white/5 border-white/10 hover:bg-yellow-300/10",
    accent: "text-white",
    muted: "text-gray-400",
    subtext: "text-gray-500",
    line: "border-white/10",
    logo: darkLogo,
  };

  const pressBooks = filteredBooks.slice(-4);
  const gridBooks = filteredBooks.slice(-6);
  const editorBook = filteredBooks[filteredBooks.length - 1] || null;

  const editorRecommendation =
    "A quietly assured piece of writing with a strong sense of place. It is the kind of story that rewards a slower read and stays in the mind after the page is closed.";

  return (
    <div
      className={`${current.bg} min-h-screen relative`}
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage: "url(/silverveil-paper-grain.svg)",
backgroundSize: "160px 160px",
        }}
      />

      {/* NAVIGATION */}
      <nav className={`sticky top-0 z-40 border-b ${current.nav} backdrop-blur-sm`}>
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="shrink-0"
            aria-label="Silverveil Press home"
          >
            <img
              src={current.logo}
              alt="Silverveil Press"
              className="h-9 w-auto object-contain"
            />
          </button>

          <div className="hidden md:flex items-center gap-5">
            {[
              { icon: <BookOpen size={16} />, text: "Books", path: "/book" },
              { icon: <Feather size={16} />, text: "Submit", path: "/sign" },
              { icon: <Search size={16} />, text: "Search", path: "/search" },
              { icon: <User size={16} />, text: "Account", path: "/setting" },
            ].map((item) => (
              <button
                type="button"
                key={item.path}
                onClick={() => navigate(item.path)}
                className="group flex items-center gap-2 py-2 text-sm text-gray-300 transition-colors hover:text-[#f1ece4]"
              >
                {item.icon}
                <span className="relative">
                  {item.text}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-200 group-hover:w-full" />
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 flex-col items-center justify-center rounded-md border border-white/10 md:hidden"
          >
            <span className={`block h-px w-5 bg-current transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`my-1 block h-px w-5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-current transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/70"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute left-3 right-3 top-[4.75rem]">
            <div className={`rounded-lg border p-3 shadow-xl ${current.card}`}>
              {[
                { icon: <BookOpen size={18} />, text: "Books", path: "/book" },
                { icon: <Feather size={18} />, text: "Submit", path: "/sign" },
                { icon: <Search size={18} />, text: "Search", path: "/search" },
                { icon: <Mail size={18} />, text: "Account", path: "/setting" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left text-sm text-white last:border-b-0 hover:bg-yellow-300/5"
                >
                  {item.icon}
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_280px]">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs uppercase tracking-[0.22em] text-gray-400">
                Silverveil Press
              </p>

              <h1 className="font-sans text-5xl font-semibold leading-[1.05] tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl">
                Find a book. Start reading.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
               Explore books and stories from different writers.
              </p>

              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/book")}
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-yellow-300"
                >
                  Explore the Library
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-yellow-300/5"
                >
                  Share Your Story
                  <Feather size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            <div className="hidden border-l border-white/10 pl-6 lg:block">
              <p className="text-sm leading-6 text-gray-400">
                Independent publishing for stories with a point of view.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* FROM THE PRESS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Recent selection
            </p>
            <h2 className="font-sans text-3xl font-medium text-white sm:text-4xl">
              From the Press
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/book")}
            className="hidden text-sm text-gray-400 transition-colors hover:text-[#f1ece4] sm:inline-flex sm:items-center sm:gap-1"
          >
            View library
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 xl:grid-cols-4">
          {pressBooks.map((book) => {
            const date = formatDate(book.publishedAt || book.createdAt);
            const readTime = getReadingTime(book);

            return (
              <article key={book._id} className="group border-b border-white/10 pb-6 last:border-b-0 md:border-b-0 md:pb-0">
                <div className="flex gap-4 sm:gap-5 md:block">
                  <button
                    type="button"
                    onClick={() => {
                      if (book.isPremium) return;
                      navigate(`/bookd/${book._id}`);
                    }}
                    className="block shrink-0 text-left"
                  >
                    <div className="relative h-36 w-24 overflow-hidden rounded-md border border-white/10 bg-[#151821] sm:h-40 sm:w-27 md:h-auto md:w-full">
                      <div className="h-full w-full md:aspect-[2/3]">
                        <img
                          src={book.cover}
                          alt={book.title}
                          loading="lazy"
                          className={`h-full w-full object-cover transition-transform duration-300 ${
                            book.isPremium
                              ? "blur-sm brightness-75"
                              : "group-hover:scale-[1.025]"
                          }`}
                        />
                      </div>

                      {book.isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-xs font-medium text-white">
                          <span className="flex items-center gap-1.5">
                            <Lock size={12} />
                            Premium
                          </span>
                        </div>
                      )}
                    </div>
                  </button>

                  <div className="min-w-0 flex-1 pt-1 md:pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-amber-300">
                    {getGenre(book)}
                  </p>

                  <h3 className="mt-1 font-sans text-2xl font-semibold leading-tight text-white">
                    {book.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => navigate(`/creator/${book.username}`)}
                    className="mt-1 text-sm text-gray-400 transition-colors hover:text-[#f1ece4]"
                  >
                    by {getAuthor(book)}
                  </button>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/50">
                    {book.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.1em] text-white/30">
                    {date && (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={11} />
                        {date}
                      </span>
                    )}
                    {readTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={11} />
                        {readTime}
                      </span>
                    )}
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-gray-300 transition-colors group-hover:text-[#f1ece4]">
                    Read story
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => navigate("/book")}
          className="mt-8 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#f1ece4] sm:hidden"
        >
          View library
          <ArrowRight size={14} />
        </button>
      </section>

      {/* EDITORIAL STATEMENT */}
      <section className="border-y border-white/10 bg-[#0B0F1A]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 md:grid-cols-[180px_1fr] md:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Our approach
              </p>
            </div>

            <div className="max-w-3xl">
              <h2 className="font-sans text-4xl font-semibold leading-tight text-white sm:text-5xl">
                New voices. Carefully chosen.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                We look for writers with a distinct voice, a strong point of view, and something worth saying. Silverveil Press is interested in character, atmosphere, and stories that feel considered rather than hurried.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-white/40">
                We publish selectively, read closely, and give each story room to breathe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDITOR'S PICK */}
      {editorBook && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid overflow-hidden border border-white/10 bg-[#151821] md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative h-[300px] sm:h-[380px] md:h-[560px]">
              <img
                src={editorBook.cover}
                alt={editorBook.title}
                loading="lazy"
                className={`h-full w-full object-cover ${
                  editorBook.isPremium ? "blur-sm brightness-75" : ""
                }`}
              />

              {editorBook.isPremium && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-sm font-medium text-white">
                  <span className="flex items-center gap-1.5">
                    <Lock size={14} />
                    Premium
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                Editor&apos;s Pick
              </p>

              <h2 className="mt-4 font-sans text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {editorBook.title}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                by {getAuthor(editorBook)}
              </p>

              <p className="mt-7 max-w-xl text-base leading-8 text-gray-300">
                {editorRecommendation}
              </p>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/40">
                {editorBook.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (editorBook.isPremium) return;
                    navigate(`/bookd/${editorBook._id}`);
                  }}
                  className="group inline-flex items-center gap-2 text-sm text-white"
                >
                  Read more
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                <span className="text-xs uppercase tracking-[0.12em] text-white/30">
                  {getGenre(editorBook)}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NEW BOOKS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                Latest arrivals
              </p>
              <h2 className="font-sans text-3xl font-medium text-white sm:text-4xl">
                New Books
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/book")}
              className="group inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#f1ece4]"
            >
              View all
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {gridBooks.map((book, index) => (
              <article
                key={book._id}
                className={`group ${
                  index === 1 ? "lg:pt-10" : index === 4 ? "lg:-mt-6" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (book.isPremium) return;
                    navigate(`/bookd/${book._id}`);
                  }}
                  className="block w-full text-left"
                >
                  <div className="mx-auto aspect-[2/3] w-full max-w-[140px] overflow-hidden rounded-md border border-white/10 bg-[#151821] sm:max-w-none">
                    <img
                      src={book.cover}
                      alt={book.title}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-transform duration-300 ${
                        book.isPremium
                          ? "blur-sm brightness-75"
                          : "group-hover:scale-[1.025]"
                      }`}
                    />
                  </div>
                </button>

                <div className="pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-amber-300">
                    {getGenre(book)}
                  </p>

                  <h3 className="mt-1 font-sans text-base font-semibold leading-tight text-white sm:text-2xl">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    by {getAuthor(book)}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                    {book.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / CLOSE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 md:grid-cols-[180px_1fr] md:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Silverveil Press
              </p>
            </div>

            <div className="max-w-3xl">
              <h2 className="font-sans text-3xl font-medium text-white sm:text-4xl">
                Stories with a little more weight.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/50">
                We publish stories for readers who still like to linger over a sentence, notice a voice, and remember a book after it is finished.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <img
                src={current.logo}
                alt="Silverveil Press"
                className="h-9 w-auto object-contain"
              />
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/35">
                Stories with a little more weight.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/30">
                Navigation
              </p>
              <div className="mt-3 space-y-2 text-sm text-gray-400">
                <button type="button" onClick={() => navigate("/book")} className="block hover:text-[#f1ece4]">Books</button>
                <button type="button" onClick={() => navigate("/sign")} className="block hover:text-[#f1ece4]">Submit</button>
                <button type="button" onClick={() => navigate("/search")} className="block hover:text-[#f1ece4]">About</button>
                <button type="button" onClick={() => navigate("/setting")} className="block hover:text-[#f1ece4]">Contact</button>
              </div>
            </div>

            <div>
             
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/25">
            © 2026 Silverveil Press
          </div>
        </div>
      </footer>
    </div>
  );
}