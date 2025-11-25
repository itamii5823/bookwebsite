import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function Search() {
    const[search,newsearch]=useState("")
    const[prod,setprod]=useState("")
    const[quant,setquant]=useState(1)
    console.log(search)

    async function datasend(e){
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/search",{search},{ withCredentials: true });
      setprod(res.data);
      console.log(prod);

    }
      async function button(e,prodid){
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/search",{prod,quant},{ withCredentials: true });
      

    }



  return (
    <div>
      <form onSubmit={datasend}>
       <input type='name' placeholder='search' value={search} onChange={(e)=>{newsearch(e.target.value)}} >
       </input>
        <button>smash</button>
      </form>
       <div>
         <h1>{prod.name}</h1>
         <img className='rounded-xl w-40 h-25 ml-3 object-cover'  src={"http://localhost:5000"+prod.imageurl}></img>
         <h2>{prod.rate}</h2>
         <input type="number" value={quant} onChange={(e)=>{setquant(e.target.value)}}  />
         <button onClick={(button)}>purchase</button>
       </div>


    </div>
  )
}

export default Search