import axios from 'axios'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';


function Admin() {
 const [product,setproduct]=useState({name:"",price:"",image:null,quantity:"",color:"#000000",items:"default"})



//change function 
  function change(e){
  const {name,value}=e.target
    setproduct({...product,[name]:value}) //we used [name] becouse name is key and a dynamic value
   }
   

//postdata
   async function postdata(e){
     e.preventDefault();
     const formData = new FormData()
     formData.append("items",product.items)
     formData.append("name", product.name);
     formData.append("price", product.price);
     formData.append("quantity", product.quantity);
     formData.append("image", product.image);
     formData.append("color",product.color);
     const res = await axios.post("http://localhost:5000/addprod",formData,{withCredentials:true})
     console.log(res);
     
   }

    const navigate = useNavigate();
    useEffect(() => {
     async function isadmin(){
      try {
      const res = await axios.post("http://localhost:5000/isadmin","heyy",{withCredentials:true});
    if(res.data=="user doesnt exist"){
       navigate("/");
       
    }}
    catch(err){
      console.log("backend failed",err);
      navigate("/")
    }
   }
   isadmin()
    }, [])
    
  

  return (
    <>
     <div className='w-full h-full bg-cyan-900 flex items-center justify-center'>
      <div className='w-1/3 h-115 bg-cyan-100/90 text-xl font-sans flex flex-col items-center rounded-xl '>
       <form className='flex flex-col' encType='multipart/form-data' onSubmit={postdata}>
        <input className='mt-6 text-center bg-cyan-600/30 rounded-xl px-4 py-2 ' type="text" name='name' onChange={change} placeholder='name' value={product.name}/>
        <input className='mt-6 text-center bg-cyan-600/30 rounded-xl px-4 py-2 ' type="number" name='price' placeholder='price' onChange={change} value={product.price}/>
        <input className='mt-6 text-center bg-cyan-600/30 rounded-xl px-4 py-2 ' type="number"  name='quantity' placeholder='quantity' onChange={change} value={product.quantity}/>
        <input className='mt-6 text-center bg-cyan-600/30 rounded-xl px-4 py-2 ' onChange={(e)=>{
          console.log(e.target.files[0])
          setproduct({...product,image: e.target.files[0]})}} type="file" name='image' placeholder='name'/>
        <input className='m-4 text-center bg-cyan-600/30 rounded-xl px-4 py-2 mb-2' onChange={change} type="color" name='color' placeholder='name' value={product.color}/>
        <select className='bg-amber-50/25 px-4 py-2 rounded-xl' name='items' onChange={change} value={product.items}>
          <option className='bg-cyan-600/30' value="default">default</option>
          <option className='bg-cyan-600/25' value="glocerry">glocerry</option>
          <option className='bg-cyan-600/20' value="electronics">electronics</option>
          <option className='bg-cyan-600/15' value="gifts">gifts</option>
          <option className='bg-cyan-600/10' value="mens feshion">mens feshion</option>
          <option className='bg-cyan-600/5' value="womens">womens</option>
          <option value="kids">kids</option>


        </select>
        <button className=' rounded-xl px-3 py-2 text-cyan-950 mt-4 bg-gradient-to-r from-cyan-600/70 to-cyan-200' type='sumit'>submit</button>
       </form>
      </div>

     </div>
    </>
  )
}

export default Admin;