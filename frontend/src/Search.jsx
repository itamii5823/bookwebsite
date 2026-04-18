import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 SUGGESTIONS LOGIC
  const suggestions = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  // 🔥 MAIN FILTER
  const filteredBooks = books.filter(book => {

    const matchCategory =
      category === "All" || book.category === category;

    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.description.toLowerCase().includes(search.toLowerCase()) ||
      book.username.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#060304] text-white">

      {/* 🔥 HERO SEARCH SECTION (DIFFERENT LOOK) */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">

        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-[#E37EAF] to-purple-400 text-transparent bg-clip-text">
          Find Your Story
        </h1>

        <p className="text-gray-400 mb-8">
          Search across stories, genres, and authors
        </p>

        {/* SEARCH BOX */}
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
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[#E37EAF] focus:outline-none text-lg"
          />

          {/* 🔥 SUGGESTIONS DROPDOWN */}
          {showSuggestions && search && (
            <div className="absolute w-full mt-2 bg-[#0f0f1a] border border-white/10 rounded-xl shadow-xl z-50">

              {suggestions.length > 0 ? (
                suggestions.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => {
                      navigate(`/bookd/${s._id}`);
                    }}
                    className="px-4 py-3 text-sm hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-none"
                  >
                    {s.title}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No matches found
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* 🔥 CATEGORY BAR */}
      <div className="flex justify-center gap-3 px-6 pb-6 flex-wrap">

        {["All", "Romance", "Fantasy", "Drama", "Horror", "Adventure"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              category === cat
                ? "bg-[#E37EAF] text-white"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* RESULTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">

        {loading && (
          <p className="text-gray-400 text-center">Loading...</p>
        )}

        <p className="text-sm text-gray-500 mb-6 text-center">
          {filteredBooks.length} results found
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredBooks.map((book) => (
            <div
              key={book._id}
              onClick={() => navigate(`/bookd/${book._id}`)}
              className="cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.03] transition"
            >

              <img
                src={`data:image/jpeg;base64,${book.cover}`}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h2 className="text-sm font-semibold line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  <span>{book.username}</span>
                  <span className="text-[#E37EAF]">Read →</span>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* EMPTY */}
        {!loading && filteredBooks.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            No stories found 😢
          </div>
        )}

      </div>

    </div>
  );
}