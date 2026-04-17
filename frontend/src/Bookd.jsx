import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookDetail() {

  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then(res => {
        const found = res.data.find(b => b._id === id);
        setBook(found);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-gray-400">
        Loading story...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 sm:px-6 py-10">

      {/* TOP CONTAINER */}
      <div className="max-w-3xl mx-auto">

        {/* COVER */}
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img
            src={book.cover}
            alt="cover"
            className="w-full h-56 sm:h-72 object-cover"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mt-6 leading-tight">
          {book.title}
        </h1>

        {/* AUTHOR */}
        <p className="text-sm text-gray-500 mt-2">
          by <span className="text-blue-500 font-medium">{book.username}</span>
        </p>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-600 italic text-sm sm:text-base leading-relaxed">
          {book.description}
        </p>

        {/* DIVIDER */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* CONTENT (READING EXPERIENCE) */}
        <div className="text-gray-800 text-[15px] sm:text-[17px] leading-relaxed sm:leading-loose">

          {book.content.split("\n").map((para, i) => (
            <p key={i} className="mb-5">
              {para}
            </p>
          ))}

        </div>

      </div>

    </div>
  );
}