import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    Cute: ["Romance","Slice of Life","Coming-of-Age","Cozy Fantasy","Light Comedy","Young Adult"],
    Neutral: ["Literary Fiction","Adventure","Fantasy","Mystery","Sci-Fi"],
    Dark: ["Dark Romance","Thriller","Horror","Crime","Dystopian"]
  };

  const suggestions = books
    .filter(book => {
      const side = getSide(book.category);
      const genre = getGenre(book.category);

      return (
        (category === "All" || side === category) &&
        (subCategory === "All" || genre === subCategory) &&
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(0, 5);

  const filteredBooks = books.filter(book => {

    const side = getSide(book.category);
    const genre = getGenre(book.category);

    return (
      (category === "All" || side === category) &&
      (subCategory === "All" || genre === subCategory) &&
      (
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
  <div className="min-h-screen bg-[#060304] text-white">

    {/* HERO */}
    <div className="flex flex-col items-center text-center py-16 px-4">

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
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
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E37EAF] focus:outline-none"
        />

        {showSuggestions && search && (
          <div className="absolute w-full mt-2 bg-[#0f0f1a] border border-white/10 rounded-xl shadow-lg z-50">

            {suggestions.length > 0 ? (
              suggestions.map(s => (
                <div
                  key={s._id}
                  onClick={() => navigate(`/bookd/${s._id}`)}
                  className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-none"
                >
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs opacity-60">
                    {getSide(s.category)} • {getGenre(s.category)}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No matches
              </div>
            )}

          </div>
        )}

      </div>
    </div>

    {/* CATEGORY */}
    <div className="max-w-5xl mx-auto px-4">

      {/* MAIN */}
      <div className="flex justify-center flex-wrap gap-3 mb-4">
        {["All","Cute","Neutral","Dark"].map(cat => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setSubCategory("All");
            }}
            className={`px-5 py-2 rounded-full text-sm ${
              category === cat
                ? "bg-[#E37EAF] text-white"
                : "bg-white/5 border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      
      <div className="relative w-full">

        {/* LEFT */}
        <button
          onClick={() => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black px-2 py-1 rounded-full"
        >
          ‹
        </button>

        {/* RIGHT */}
        <button
          onClick={() => scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black px-2 py-1 rounded-full"
        >
          ›
        </button>

        {/* SCROLL */}
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar px-8">

          <div className="flex gap-2 min-w-max">

            {(category === "All"
              ? [
                  "Romance","Slice of Life","Coming-of-Age","Cozy Fantasy","Light Comedy","Young Adult",
                  "Literary Fiction","Adventure","Fantasy","Mystery","Sci-Fi",
                  "Dark Romance","Thriller","Horror","Crime","Dystopian"
                ]
              : subMap[category] || []
            ).map(sub => (
              <button
                key={sub}
                onClick={() => setSubCategory(sub)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                  subCategory === sub
                    ? "bg-[#E37EAF]"
                    : "bg-white/5 border border-white/10"
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
    <div className="max-w-6xl mx-auto px-4 mt-10 pb-10">

      <p className="text-center text-sm text-gray-400 mb-6">
        {filteredBooks.length} results
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

        {filteredBooks.map(book => (
          <div
            key={book._id}
            onClick={() => navigate(`/bookd/${book._id}`)}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.03] transition cursor-pointer"
          >

            <img
              src={`data:image/jpeg;base64,${book.cover}`}
              className="h-44 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="text-sm font-medium line-clamp-2">
                {book.title}
              </h3>

              <p className="text-xs opacity-60 mt-1">
                {getSide(book.category)} • {getGenre(book.category)}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>

  </div>
);
}