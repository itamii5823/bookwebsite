
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Darknav() {
    const navigate = useNavigate()
   
        function theme(){
              if(themelight){
                settheme(false);
              }
              else{
               settheme(true)
               
              }
            }
    
  return (
    <nav className=" sticky h-12
                    w-[90%] max-w-6xl
                    px-6 py-3
                    flex justify-center md:justify-between sm:justify-center items-center  ">

      <h1 className=" font-[caviar] font-bold text-xl hover:text-cyan-900 hidden sm:hidden md:block text-[rgb(147,159,160)]
                       ">
         Drinkstore 
      </h1>

      <div className="flex items-center gap-1 md:gap-4 sm:gap-1 ">

    
        <button
          onClick={() => navigate("/prod")}
          className="text-gray-200 bg-[rgb(147,159,160)] hover:bg-linear-to-r from-blue-500 to-purple-600
                     hover:text-white font-semibold px-4 py-2 rounded-xl md:px-4 md:py-2 sm:px-2 md:py1
                     shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.2)]
  "
        >
          Products
        </button>
  
    <button
          onClick={() => { navigate("/search");  }}
          className="text-gray-200 hover:bg-linear-to-r from-blue-500 to-purple-600 bg-[rgb(147,159,160)] 
                     hover:text-white font-semibold px-4 py-2 rounded-xl
                     shadow-[0_4px_12px_rgba(0,0,0,0.15)]

"  

        >
          Search
        </button>

        <button
          onClick={() => { navigate("/cart"); }}
          className=" text-gray-200 hover:bg-linear-to-r from-blue-500 to-purple-600 bg-[rgb(147,159,160)] 
                     hover:text-white font-semibold px-4 py-2 rounded-xl
                     shadow-[0_4px_12px_rgba(0,0,0,0.15)]

                     "
                     >
          Cart
        </button>
       

      </div>
    </nav>
  )
}

export default Darknav