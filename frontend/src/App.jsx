import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




function App() {
   const[userinfo,setuserinfo]=useState({username:"",password:"",email:""})
   const [newuser,setnewuser]=useState({username:"",password:"",email:""})
   const [theme,settheme]=useState(true)
   const[err,seterr]=useState("");
   const navigate = useNavigate()
   function signvalue(e){
     const {name,value}=e.target;
     setnewuser({...newuser,[name]:value})
     console.log(newuser);
   }
   

   function change(e){
   const {name,value} =e.target;
   setuserinfo({...userinfo,[name]:value})
    console.log(userinfo);
  
   }

   async function signup(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/signup",newuser,{withCredentials:true})
    console.log(res.data);
    if(res.data==="received"){  
       navigate("/prod");
    }
    else{
      alert("user already exist")
    }
   }




   async function submit (e){
    e.preventDefault();
    
      console.log('Attempting login...', userinfo);
      const res = await axios.post("http://localhost:5000/login", userinfo, { withCredentials: true });
      console.log('Login response:', res.data);
      if (res.data === "done") {
       console.log('Login successful, navigating to /prod');
        navigate("/prod");
       console.log('Navigation called');
      
      }
      else{
        alert("user doesnt exist")
      }
    
   }
    function changer(){
      if(theme){
        settheme(false);
      }
      else{
       settheme(true)
      }
    }
   
 
  if (theme) {return (   
    
         <>
          {err && (
    <div className='fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-xl z-50'>
      {err}
    </div>
  )}
       <div className="w-full min-h-screen flex justify-center items-center backdrop-blur-md bg-cover relative" 
            style={{
              backgroundImage: "url('/spiderman.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}>
           



             <button className='absolute top-10 left-7 py-2 px-4 bg-[#363636] text-white outline-none  mt-5 rounded-xl  ' onClick={changer}>dark theme</button>
          <form onSubmit={submit} className='w-1/3 h-90 bg-transparent flex flex-col items-center justify-center rounded-xl text-shadow-neutral-200 shadow-xl hover:inset-shadow-amber-50'>

          <input className=' outline-none bg-white/35 mb-2 rounded-xl py-2 px-4' type='text'id='username' value={userinfo.username} onChange={change} name='username' placeholder='username'/>
         <input className=' outline-none bg-white/35 mb-2 rounded-xl py-2 px-4' type='text' id='email' value={userinfo.email} onChange={change} name='email' placeholder='email' />
         <input className=' outline-none bg-white/35 mb-2 rounded-xl py-2 px-4' type='text' id='password' value={userinfo.password} onChange={change} name='password' placeholder='password'/>
        <button className='outline-none mb-2 bg-black text-orange-600  py-2 px-4 rounded-xl' type='submit'>login</button>
           </form>

        <form onSubmit={signup} className='w-1/3 ml-12 h-90 bg-transparent flex flex-col items-center justify-center rounded-xl shadow-2xl transition-all
         duration-300'>
          <input className='outline-none mb-2 bg-white/35 py-2 px-4 rounded-xl' type='text' id='susername' value={newuser.username} onChange={signvalue} name='username' placeholder='username'/>
         <input className='outline-none mb-2 bg-white/35 py-2 px-4 rounded-xl'  value={newuser.email} onChange={signvalue} name='email' placeholder='email' />
         <input className='outline-none mb-2 bg-white/35 py-2 px-4 rounded-xl' type='password' id='spassword' value={newuser.password} onChange={signvalue} name='password' placeholder='password'/>
        <button className='outline-none mb-2 bg-red-700 py-2 px-4 rounded-xl' type='submit'>signup</button>
           </form>

    </div>
     
  </>
  )}else {
    return (   
    <>
        
       <div className="bg-gray-800 w-full min-h-screen flex justify-center items-center backdrop-blur-md" 
            style={{
              backgroundImage: "url('/batman.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}>
            <button className='absolute top-10 left-7 py-2 px-4 bg-[#363636] text-white outline-none  mt-5 rounded-xl  ' onClick={changer}>light theme</button>

          <form onSubmit={submit} className='w-1/3 h-90 bg-transparent flex flex-col items-center justify-center rounded-xl shadow-xl'>

          <input class="bg-white/35 mb-2 text-black rounded-xl px-4 py-2 outline-none" value={userinfo.username} onChange={change} name='username' placeholder='username'/>
         <input class="bg-white/35 mb-2 text-black rounded-xl px-4 py-2 outline-none "  type='text' id='email' value={userinfo.email} onChange={change} name='email' placeholder='email' />
         <input class="bg-white/35 mb-2 text-black rounded-xl px-4 py-2 outline-none " type='password' id='password' value={userinfo.password} onChange={change} name='password' placeholder='password'/>
        <button class=' bg-[#363636] py-2 px-4 rounded-xl text-white outline-none' type='submit'>login</button>
           </form>

        <form onSubmit={signup} className='w-1/3 ml-12 h-90 bg-transparent flex flex-col items-center justify-center rounded-xl shadow-2xl transition-all
         duration-300 ' >
          <input class="bg-white/35 mb-2  rounded-xl px-4 py-2 outline-none" type='text' id='susername' value={newuser.username} onChange={signvalue} name='username' placeholder='username'/>
         <input class="bg-white/35 mb-2  rounded-xl px-4 py-2 outline-none" type='text' id='semail' value={newuser.email} onChange={signvalue} name='email' placeholder='email' />
         <input class="bg-white/35 mb-2 rounded-xl px-4 py-2 outline-none" type='password' id='spassword' value={newuser.password} onChange={signvalue} name='password' placeholder='password'/>
        <button class=" bg-[#fad608] text-black rounded-xl px-4 py-2 outline-none" type='submit'>signup</button>
           </form>

    </div>
     
  </>
  )
  }
}

export default App;