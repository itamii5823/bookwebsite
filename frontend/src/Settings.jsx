import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://bookwebsite-4q2b.onrender.com/me", {
      withCredentials: true
    })
    .then(res => {

    
      if (res.data.user) {
        setUser(res.data.user);
        setSaved(res.data.saved || []);
      } else {
      
        setUser(res.data);
        setSaved([]);
      }

      setLoading(false);
    })
    .catch(() => {
      navigate("/login");
    });
  }, []);

  const handleLogout = async () => {
    await axios.get(
      "https://bookwebsite-4q2b.onrender.com/logout",
      { withCredentials: true }
    );
    navigate("/login");
  };

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060304] text-gray-400">
        Loading...
      </div>
    );
  }


  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#060304] text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-37.5 -left-37.5 w-125 h-125 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-37.5 -right-37.5 w-125 h-125 bg-cyan-400/10 rounded-full blur-3xl"></div>

      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-between w-[320px] border-r border-white/10 p-8 relative z-10">

        <div>
          <h1 className="text-2xl font-semibold mb-6">
            Settings
          </h1>

          <div className="space-y-3 text-sm">
            <div className="text-white">Profile</div>
            <div className="text-gray-400">Saved</div>
            <div className="text-gray-400">Security</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10 relative z-10">

        {/* PROFILE */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <div className="space-y-4">

              <div>
                <p className="text-xs text-gray-400">Username</p>
                <p className="text-sm">{user?.username}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm">{user?.email}</p>
              </div>

            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-3 gap-4">

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-400">Saved Books</p>
            <p className="text-xl mt-1">{saved.length}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-400">Account Type</p>
            <p className="text-sm mt-1">User</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-400">Status</p>
            <p className="text-sm mt-1 text-green-400">Active</p>
          </div>

        </div>

        {/* SAVED BOOKS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Saved Books</h2>

          {saved.length === 0 ? (
            <p className="text-gray-400 text-sm">
              You haven’t saved any books yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {saved.map(book => (
                <div
                  key={book._id}
                  onClick={() => navigate(`/bookd/${book._id}`)}
                  className="cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.03] transition"
                >

                  <img
                    src={`data:image/jpeg;base64,${book.cover}`}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-3">
                    <p className="text-sm line-clamp-2">
                      {book.title}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}