import React from 'react'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 h-14
                    w-[95%] max-w-6xl mx-auto
                    px-6
                    flex justify-between items-center
                    bg-white ">

      {/* Logo */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Drinkstore
      </h1>

      {/* Buttons */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate("/prod")}
          className="text-gray-700 hover:bg-[#e23744] hover:text-white 
                     font-medium px-4 py-2 rounded-lg transition"
        >
          Products
        </button>

        <button
          onClick={() => navigate("/search")}
          className="text-gray-700 hover:bg-[#e23744] hover:text-white 
                     font-medium px-4 py-2 rounded-lg transition"
        >
          Search
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="text-gray-700 hover:bg-[#e23744] hover:text-white 
                     font-medium px-4 py-2 rounded-lg transition"
        >
          Cart
        </button>

      </div>
    </nav>
  )
}

export default Nav