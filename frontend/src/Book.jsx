import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Books() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 sm:px-6 py-10">

      {/* SUBTLE BACKGROUND ACCENT */}
      <div className="pointer-events-none absolute w-[500px] h-[500px] bg-blue-100 blur-[120px] opacity-40 top-[-200px] right-[-200px]" />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
          Stories
        </h1>

        <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-lg">
          Thoughtfully written stories from our community.
        </p>

      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center mt-10 text-gray-400">
          Loading stories...
        </p>
      )}

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/bookd/${book._id}`)}
            className="cursor-pointer rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={book.cover}
                alt="cover"
                className="w-full h-52 object-cover hover:scale-[1.02] transition duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="text-base font-semibold text-gray-900 leading-snug">
                {book.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {book.description}
              </p>

              <div className="flex justify-between items-center mt-4">

                <span className="text-xs text-blue-500 font-medium">
                  {book.username}
                </span>

                <span className="text-xs text-gray-400 hover:text-gray-700 transition">
                  Read →
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY */}
      {!loading && books.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          No stories yet
        </p>
      )}

    </div>
  );
}