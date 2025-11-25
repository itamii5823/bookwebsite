import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
const [product,setproduct]=useState([])
const [total,settotal]=useState([])
const navigate = useNavigate()



   
   

    useEffect(() => {
     
      async function getdata() {
        const res = await axios.post("http://localhost:5000/cart","hii",{withCredentials:true})
        console.log(res.data.total);
        setproduct(res.data.cart);
        settotal(res.data.total);
       
        
      }
      getdata()
      }
    ,[])

  async function removeproduct(e,product){
       e.preventDefault();
     const data = await axios.post("http://localhost:5000/addtocartr",{product},{withCredentials:true})

  }


  return (
    <div className='w-full h-screen bg-gradient-to-tl from-cyan-950 to-white/100 flex overflow-y-auto '>
      <button onClick={()=>{navigate("/prod");}} className=' absolute top-10 right-9 bg-white/100
                         text-black font-semibold py-3 px-4 rounded-xl shadow-md
                         hover:shadow-lg 
                         transition-all '>products</button>
        <div className='w-1/3 h-max bg-amber-50 ml-25 flex mt-2 flex-col justify-center items-center'>  
        {product.map((items,index)=>(
        <div key={index} className='w-110 bg-cyan-900 h-37 mt-2 flex items-center rounded-2xl relative'>
         <img className='rounded-xl w-40 h-25 ml-3 object-cover'  src={"http://localhost:5000"+items.product.imageurl}></img>
          <div className='text-xl text-shadow-black absolute top-5 left-50 flex flex-col' >
            <p2>{items.product.name}</p2>
            <p2>{items.product.rate}</p2>
            <p2>{items.quantity}</p2>
            <button onClick={(e)=>removeproduct(e,items.product._id)} className='rounded-xl px-2 py-1 text-cyan-950 bg-cyan-700 to-cyan-200'>remove</button>

          </div>


        </div>  ))}
        </div>
        <div className='bg-cyan-900 w-110 h-60 mt-50 ml-60 flex'>
           <div className='relative top-10 left-5 text-2xl'> <h1>total value:{total}</h1></div>
        

        </div>



    </div>
  )
}

export default Cart