import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Books() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/books", { withCredentials: true })
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ FIX: rating fallback
  const getAverage = (book) => {
    if (book.average) return book.average;

    if (!book.ratings || book.ratings.length === 0) return 0;

    let total = 0;
    for (let i = 0; i < book.ratings.length; i++) {
      total += book.ratings[i].value;
    }

    return total / book.ratings.length;
  };

  // FILTER
  const filteredBooks =
    category === "All"
      ? books
      : books.filter(book => book.category === category);

  // RATE FUNCTION
  const handleRating = async (bookId, value) => {
    try {
      const res = await axios.post(
        "https://bookwebsite-4q2b.onrender.com/rate",
        { bookId, value },
        { withCredentials: true }
      );

      setBooks(prev =>
        prev.map(b =>
          b._id === bookId
            ? { ...b, average: res.data.average }
            : b
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // SAVE FUNCTION
  const handleSave = async (bookId) => {
    try {
      const res = await axios.post(
        "https://bookwebsite-4q2b.onrender.com/save",
        { bookId },
        { withCredentials: true }
      );

      alert(res.data); // 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold">StarLit</h1>

        <div className="hidden sm:flex gap-6 text-sm text-gray-400">
          <span onClick={()=>{navigate("/")}} className="cursor-pointer hover:text-white">Home</span>
          <span onClick={()=>{navigate("/admin")}} className="cursor-pointer hover:text-white">Submit</span>
          <span onClick={()=>{navigate("/")}} className="cursor-pointer hover:text-white">About</span>
        </div>

        <div className="flex gap-3 text-sm">
          <button onClick={()=>{navigate("/login")}} className="px-4 py-1.5 rounded-lg border border-white/20 hover:bg-white/10">
            Login
          </button>
          <button onClick={()=>{navigate("/sign")}}  className="px-4 py-1.5 rounded-lg bg-white text-black font-medium">
            Register
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="px-6 py-8 border-b border-white/10">
        <h1 className="text-2xl font-semibold">
          All Stories
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Browse and discover stories from the community
        </p>
      </div>

      {/* CATEGORY BAR */}
      <div className="px-6 py-4 border-b border-white/10 flex gap-3 overflow-x-auto">

        <button onClick={() => setCategory("All")} className="px-4 py-1.5 bg-white text-black rounded-full text-sm">
          All
        </button>

        <button onClick={() => setCategory("Romance")} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10">
          Romance
        </button>

        <button onClick={() => setCategory("Fantasy")} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10">
          Fantasy
        </button>

        <button onClick={() => setCategory("Drama")} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10">
          Drama
        </button>

        <button onClick={() => setCategory("Horror")} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10">
          Horror
        </button>

        <button onClick={() => setCategory("Adventure")} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10">
          Adventure
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">

        {loading && <p className="text-gray-400">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
            >

              <img
                onClick={() => navigate(`/bookd/${book._id}`)}
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

                {/* ⭐ FIXED RATING */}
                <p className="text-sm mt-2">
                  ⭐ {getAverage(book).toFixed(1)}
                </p>

                <div className="flex gap-2 mt-2">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRating(book._id, star)}
                      className="text-2xl px-2 py-1 rounded-lg transition 
                        hover:scale-125 hover:text-yellow-300 
                        active:scale-95"
                    >
                      ★
                    </button>
                  ))}
                </div>

                {/* 💾 SAVE */}
                <button
                  onClick={() => handleSave(book._id)}
                  className="mt-2 text-xs px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                >
                  Save
                </button>

                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  <span>{book.username}</span>
                  <span onClick={() => navigate(`/bookd/${book._id}`)} className="text-[#E37EAF] cursor-pointer">
                    Read →
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm py-10 border-t border-white/10">
        © 2026 SilverVeil.Press
      </div>

    </div>
  );
}