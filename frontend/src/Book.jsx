import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Sparkles, BookOpen, Grid, Heart, Skull, Compass } from "lucide-react";

export default function Books() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");

  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/books", { withCredentials: true })
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

  const getAverage = (book) => {
    if (book.average) return book.average;
    if (!book.ratings || book.ratings.length === 0) return 0;

    let total = 0;
    for (let i = 0; i < book.ratings.length; i++) {
      total += book.ratings[i].value;
    }
    return total / book.ratings.length;
  };

  const filteredBooks = books.filter(book => {

    if (category === "All" && subCategory === "All") return true;

    if (category !== "All" && subCategory === "All") {
      return getSide(book.category) === category;
    }

    if (category === "All" && subCategory !== "All") {
      return getGenre(book.category) === subCategory;
    }

    return (
      getSide(book.category) === category &&
      getGenre(book.category) === subCategory
    );
  });

  
  const subMap = {
    Cute: ["Romance","Slice of Life","Coming-of-Age","Cozy Fantasy","Light Comedy","Young Adult"],
    Neutral: ["Literary Fiction","Adventure","Fantasy","Mystery","Sci-Fi"],
    Dark: ["Dark Romance","Thriller","Horror","Crime","Dystopian"]
  };

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

  const handleSave = async (bookId) => {
    try {
      const res = await axios.post(
        "https://bookwebsite-4q2b.onrender.com/save",
        { bookId },
        { withCredentials: true }
      );
      alert(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  const handleBuyPremium = async () => {
  try {
   
    const { data } = await axios.post(
      "https://bookwebsite-4q2b.onrender.com/create-order",
      {},
      { withCredentials: true }
    );

    
    const options = {
      key: "rzp_test_ShZapsd7RsMLIU", //
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,

      handler: async function (response) {
  try {
    const res = await axios.post(
      "https://bookwebsite-4q2b.onrender.com/verify-payment",
      response,
      { withCredentials: true }
    );

    console.log("VERIFY SUCCESS:", res.data);
    alert("Premium Activated 🎉");

  } catch (err) {
    console.log("VERIFY ERROR:", err.response?.data || err.message);
    alert("Payment done but verification failed ");
  }
}
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Payment failed");
  }
};
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen size={18}/> StarLit
        </h1>

        <div className="hidden sm:flex gap-6 text-sm text-gray-400">
          <button
  onClick={handleBuyPremium}
  className="px-4 py-1.5 rounded-lg bg-yellow-400 text-black font-medium"
>
  Get Premium
</button>
          <span onClick={()=>navigate("/")} className="cursor-pointer hover:text-white">Home</span>
          <span onClick={()=>navigate("/admin")} className="cursor-pointer hover:text-white">Submit</span>
          <span onClick={()=>navigate("/")} className="cursor-pointer hover:text-white">About</span>
          <span onClick={()=>navigate("/search")} className="cursor-pointer hover:text-white">Search</span>
          <span onClick={()=>navigate("/setting")} className="cursor-pointer hover:text-white">Dashboard</span>
        </div>

        <div className="flex gap-3 text-sm">
          <button onClick={()=>navigate("/login")} className="px-4 py-1.5 rounded-lg border border-white/20 hover:bg-white/10">
            Login
          </button>
          <button onClick={()=>navigate("/sign")} className="px-4 py-1.5 rounded-lg bg-white text-black font-medium">
            Register
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="px-6 py-8 border-b border-white/10">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles size={20}/> All Stories
        </h1>
      </div>

      {/* MAIN CATEGORY */}
      <div className="px-6 py-4 border-b border-white/10 flex gap-3 overflow-x-auto">

        <button onClick={()=>{setCategory("All"); setSubCategory("All");}} className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm">
          <Grid size={14}/> All
        </button>

        <button onClick={()=>{setCategory("Cute"); setSubCategory("All");}} className="flex items-center gap-2 px-4 py-1.5 bg-pink-400 text-black rounded-full text-sm">
          <Heart size={14}/> Cute
        </button>

        <button onClick={()=>{setCategory("Neutral"); setSubCategory("All");}} className="flex items-center gap-2 px-4 py-1.5 bg-yellow-400 text-black rounded-full text-sm">
          <Compass size={14}/> Neutral
        </button>

        <button onClick={()=>{setCategory("Dark"); setSubCategory("All");}} className="flex items-center gap-2 px-4 py-1.5 bg-red-900 text-white rounded-full text-sm">
          <Skull size={14}/> Dark
        </button>

      </div>

   
      <div className="relative px-6 py-2 border-b border-white/10">

        {/* LEFT */}
        <button
          onClick={() => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black px-2 py-1 rounded-full"
        >
          ‹
        </button>

        {/* RIGHT */}
        <button
          onClick={() => scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black px-2 py-1 rounded-full"
        >
          ›
        </button>

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
                onClick={()=>setSubCategory(sub)}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 whitespace-nowrap"
              >
                {sub}
              </button>
            ))}

          </div>
        </div>

      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">

        {loading && <p className="text-gray-400">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredBooks.map((book) => (
            <div key={book._id} className="cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:scale-[1.02] transition">

              <div className="relative">
                <img
                  onClick={() => navigate(`/bookd/${book._id}`)}
                  src={`data:image/jpeg;base64,${book.cover}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <h2 className="text-sm font-semibold line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-xs mt-1 opacity-60">
                  {getGenre(book.category)}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}