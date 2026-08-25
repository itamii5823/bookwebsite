import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function SearchPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    axios
      .get("https://bookwebsite-4q2b.onrender.com/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get("https://bookwebsite-4q2b.onrender.com/me", {
        withCredentials: true,
      })
      .then((res) => {
        setIsPremium(res.data.user.isPremium);
      })
      .catch(() => {});
  }, []);

  const getSide = (cat) => {
    if (!cat) return "";
    if (!cat.includes("|")) return "Neutral";
    return cat.split(" | ")[0];
  };

  const getGenre = (cat) => {
    if (!cat) return "";
    if (!cat.includes("|")) return cat;
    return cat.split(" | ")[1];
  };

  const subMap = {
    Cute: [
      "Slice of Life",
      "Coming-of-Age",
      "Cozy Fantasy",
      "Light Comedy",
      "Young Adult",
    ],
    Neutral: [
      "Literary Fiction",
      "Adventure",
      "Fantasy",
      "Mystery",
      "Sci-Fi",
    ],
    Dark: [
      
      "Thriller",
      "Horror",
      "Crime",
      "Dystopian",
    ],
  };

  const suggestions = books
    .filter((book) => {
      const side = getSide(book.category);
      const genre = getGenre(book.category);

      return (
        ((category === "All" || side === category) &&
          (subCategory === "All" || genre === subCategory) &&
          book.title.toLowerCase().includes(search.toLowerCase())) ||
        book.username.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(0, 5);

  const filteredBooks = books.filter((book) => {
    const side = getSide(book.category);
    const genre = getGenre(book.category);

    return (
      (category === "All" || side === category) &&
      (subCategory === "All" || genre === subCategory) &&
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase()) ||
        book.username.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      {/* HERO */}
      <div className="flex flex-col items-center text-center px-4 py-16">
        <h1 className="mb-6 text-4xl font-semibold md:text-5xl text-white">
          Find Your Story
        </h1>

        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() =>
              setTimeout(() => setShowSuggestions(false), 200)
            }
            className="w-full rounded-xl border border-white/10 bg-[#151821] px-5 py-3 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none"
          />

          {showSuggestions && search && (
            <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#151821] shadow-lg">
              {suggestions.length > 0 ? (
                suggestions.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => navigate(`/bookd/${s._id}`)}
                    className="cursor-pointer border-b border-white/5 px-4 py-3 last:border-none hover:bg-[#1b2130]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-white">
                        {s.title}
                      </div>

                      <div className="text-[11px] text-amber-50">
                        @{s.username}
                      </div>
                    </div>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {getSide(s.category)} • {getGenre(s.category)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No matches
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mx-auto max-w-5xl px-4">
        {/* MAIN */}
        <div className="mb-4 flex flex-wrap justify-center gap-3">
          {["All", "Cute", "Neutral", "Dark"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSubCategory("All");
              }}
              className={`rounded-md px-5 py-2 text-sm transition-colors ${
                category === cat
                  ? "bg-gray-500 text-black"
                  : "border border-white/10 bg-transparent text-gray-400 hover:bg-[#151821]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full">
          {/* LEFT */}
          <button
            onClick={() =>
              scrollRef.current.scrollBy({
                left: -200,
                behavior: "smooth",
              })
            }
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-[#151821] px-2 py-1 text-white"
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            onClick={() =>
              scrollRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
              })
            }
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-[#151821] px-2 py-1 text-white"
          >
            ›
          </button>

          {/* SCROLL */}
          <div
            ref={scrollRef}
            className="no-scrollbar overflow-x-auto px-8"
          >
            <div className="flex min-w-max gap-2">
              {(category === "All"
                ? [
                    "Slice of Life",
                    "Coming-of-Age",
                    "Cozy Fantasy",
                    "Light Comedy",
                    "Young Adult",
                    "Literary Fiction",
                    "Adventure",
                    "Fantasy",
                    "Mystery",
                    "Sci-Fi",
                    "Thriller",
                    "Horror",
                    "Crime",
                    "Dystopian",
                  ]
                : subMap[category] || []
              ).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubCategory(sub)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs transition-colors ${
                    subCategory === sub
                      ? "bg-[#3b4558] text-white"
                      : "border border-white/10 bg-transparent text-gray-400 hover:bg-[#151821]"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="mx-auto mt-10 max-w-6xl px-4 pb-10">
        <p className="mb-6 text-center text-sm text-gray-400">
          {filteredBooks.length} results
        </p>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              onClick={() => {
                if (book.isPremium && !isPremium) return;
                navigate(`/bookd/${book._id}`);
              }}
              className="group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-[#151821] transition-colors hover:border-white/20"
            >
              <div className="relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className={`h-44 w-full object-cover ${
                    book.isPremium && !isPremium
                      ? "blur-sm brightness-75"
                      : "transition-transform duration-200 group-hover:scale-[1.02]"
                  }`}
                />

                {/* LOCK */}
                {book.isPremium && !isPremium && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm text-white">
                    <div className="flex items-center gap-1.5">
                      <Lock size={13} strokeWidth={2.5} />
                      <span>Premium</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="line-clamp-2 text-sm font-medium text-white">
                  {book.title}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-white">
                    {getSide(book.category)} • {getGenre(book.category)}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/creator/${book.username}`);
                    }}
                    className="text-[11px] text-white transition-colors hover:text-white"
                  >
                    @{book.username}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}