import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate = useNavigate()
    const [products,setproduct]=useState([]);
    const [quantity,setquantity]=useState(1)
    const[number,setnumber]=useState(1)

   useEffect(() => {
    const getdata = async () => {
       const data = await axios.get("http://localhost:5000/getdata");
       setproduct(data.data); 
       
     }
    getdata();
   }, [])
   
  async function senddata(e,prodid,quantity,num) {
        e.preventDefault();
            setnumber(number+1);
          
           const data = await axios.post("http://localhost:5000/addtocart",
         {
           prodid,quantity,num
         },  
        {withCredentials:true})
  }     

       console.log(number)
  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);


   


  return (
    
   <div className='bg-gradient-to-br from-indigo-900 via-blue-950 to-gray-900 min-h-screen w-full flex flex-wrap justify-center items-start gap-6 p-8'>
     <button onClick={()=>{navigate("/cart");}} className=' absolute top-10 left-9 bg-indigo-800
                         text-black font-semibold py-3 px-4 rounded-xl shadow-md
                         hover:shadow-lg 
                         transition-all '>cart</button>
        {products.map((items,index)=>(
          <div key={items._id || index} className='bg-gray-300 w-72 h-85 flex-shrink-0 flex flex-col pt-4 items-center mx-2
            rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300'>
         <div className='bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden 
                     hover:scale-105 hover:shadow-2xl transition-all duration-300 w-68 h-40'>
          <img className='w-68 h-40 object-cover object-center' src={"http://localhost:5000"+items.imageurl} ></img>
          
         </div>
            <div className='w-60 h-20 mt-2 '>
             <h2 className='text-lg font-semibold text-white'>name:    {items.name}</h2>
             <h2 className=' font-bold text-lg mt-2' style={{color:items.color}}  >price  {items.rate}</h2>
             <div  className='flex text-lg font-semibold text-white'> <h2>quantity</h2><input value={quantity} className= ' border-gray-200 ml-2 text-center bg-gray-300 flex flex-col items-centerrounded-2xl shadow-lg transition-all duration-300 rounded-2xl' type="number" 
             name='quantity' max={items.quantity} min={1}
              onChange={(e)=>{
                const value = e.target.value;
                setquantity(e.target.value)}} /></div>
            </div>
             <div  className='w-full relative left-5'>
               
                   <button className='mt-6 w-1/2 bg-gradient-to-r  from-yellow-400 to-orange-500 
                         text-black font-semibold py-2 rounded-xl shadow-md
                         hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg 
                         transition-all duration-300' style={
                          {  background:items.color} 
                         } onClick={(e)=>senddata(e,items._id,quantity,number)}>Add to cart</button>
             </div>
             

      </div>))}
       


   </div>
   
  )
}

export default Products;