import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './components/nav';

function Product() {
  const navigate = useNavigate();

  const [products,setproduct]=useState([]);
  const [quantity,setquantity]=useState(1);
  const[number,setnumber]=useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "soft drinks", "cold drinks", "no suger", "premium range" ,"energy drinks"];

  useEffect(() => {
    const getdata = async () => {
      const data = await axios.get("http://localhost:5000/getdata");
      setproduct(data.data); 
    }
    getdata();
  }, []);

  async function senddata(e,prodid,quantity,num) {
    e.preventDefault();
    setnumber(number+1);

    await axios.post("http://localhost:5000/addtocart",
    {
      prodid,quantity,num
    },  
    {withCredentials:true})
  }

  let filteredProducts = [];

  if(selectedCategory === "All"){
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((item) => {
      return item.items === selectedCategory;
    });
  }

  return (
  
   <div className='min-h-screen bg-linear-to-br from-[#020617] via-[#0f172a] to-[#020617]'>

    {/* NAV */}
    <div className='border-b border-white/10 backdrop-blur bg-[#020617]/70'>
      <Nav/>
    </div>

    {/* 🔥 CATEGORY BAR */}
    <div className='sticky top-0 z-50 backdrop-blur bg-[#020617]/80 border-b border-white/10'>
      <div className="flex gap-4 px-6 py-4 overflow-x-auto">

        {categories.map((cat)=>(

          <div
            key={cat}
            onClick={()=>setSelectedCategory(cat)}
            className={`flex flex-col items-center cursor-pointer min-w-[90px] transition-all duration-300
            ${selectedCategory === cat ? "scale-110" : "opacity-70 hover:opacity-100"}`}
          >

            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl
              ${selectedCategory === cat 
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50" 
                : "bg-[#1f2937] text-gray-300"}`}>

              🥤
            </div>

            <span className={`text-xs mt-2 capitalize 
              ${selectedCategory === cat ? "text-cyan-400 font-semibold" : "text-gray-400"}`}>
              {cat}
            </span>

          </div>

        ))}

      </div>
    </div>

    {/* PRODUCTS */}
    <div className='px-6 py-10'>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>

        {filteredProducts.map((items,index)=>(

          <div key={items._id || index} 
            className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden 
            shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300'>

            {/* IMAGE */}
            <div className='bg-white h-52 flex items-center justify-center'>
              <img 
                className='max-h-full object-contain p-4' 
                src={"http://localhost:5000"+items.imageurl} 
              />
            </div>

            {/* CONTENT */}
            <div className='p-4'>

              <h2 className='text-white font-semibold text-lg'>
                {items.name}
              </h2>

              <p className='text-cyan-400 font-bold mt-1'>
                ₹ {items.rate}
              </p>

              {/* Quantity */}
              <div className='flex items-center justify-between mt-3'>
                <span className='text-gray-400 text-sm'>Qty</span>

                <input
                  className='w-16 text-center bg-[#020617] text-white border border-gray-600 rounded-md'
                  type="number"
                  max={items.quantity}
                  min={1}
                  defaultValue={1}
                  onChange={(e)=>{
                    setquantity(e.target.value)
                  }}
                />
              </div>

              {/* BUTTON */}
              <button
                className='mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold transition shadow-lg shadow-cyan-500/30'
                onClick={(e)=>senddata(e,items._id,quantity,number)}
              >
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

   </div>
  )
}

export default Product;