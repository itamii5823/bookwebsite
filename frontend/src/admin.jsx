import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    cover: null,
    content: "",
    category: "",
    side: "",
    isPremium: false 
  });

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.cover ||
      !form.content.trim() ||
      !form.category
    ) {
      return setAlert({
        type: "error",
        message: "All fields are required "
      });
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("content", form.content.trim());
      formData.append("cover", form.cover);
      formData.append("category", form.category);
      formData.append("isPremium", form.isPremium);

      await axios.post(
        "https://bookwebsite-4q2b.onrender.com/addbook", 
        formData, 
        { 
          withCredentials: true, 
          headers: { 
            "Content-Type": "multipart/form-data" 
          } 
        } 
      ); 

      setAlert({ 
        type: "success", 
        message: "Book published successfully ", 
      }); 

      navigate("/book"); 


      setForm({ 
        title: "", 
        description: "", 
        cover: null, 
        content: "", 
        category: "", 
        side: "" 
      }); 

    } catch (err) { 
      console.log(err); 

      if (err.response?.data === "not logged in") { 
        setAlert({ 
          type: "error", 
          message: "Please login first " 
        }); 
      } else { 
        setAlert({ 
          type: "error", 
          message: "Failed to publish " 
        }); 
      } 
    } 
  }; 

  return ( 
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] relative overflow-hidden text-white"> 

      {/* ALERT */} 
      {alert && ( 
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50"> 
          <div className="bg-[#151821] border border-white/10 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3"> 
            <p className="text-sm text-white">{alert.message}</p> 
            <button 
              onClick={() => setAlert(null)} 
              className="ml-2 text-gray-400 hover:text-white" 
            > 
              ✕ 
            </button> 
          </div> 
        </div>   
      )}  

      {/* MAIN CARD */} 
      <div className="relative z-10 bg-[#151821] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] rounded-xl p-8 w-full max-w-md"> 

        {/* HEADER */} 
        <div className="text-center mb-6"> 
          <div className="text-4xl mb-2">📖</div> 

          <h2 className="text-3xl font-bold text-white"> 
            Create Story 
          </h2> 

          <p className="text-sm text-gray-400 mt-1"> 
            Turn your imagination into reality 
          </p> 
        </div> 

        <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-6"></div> 

        {/* FORM */} 
        <form onSubmit={handleSubmit} className="space-y-5"> 

          <input 
            type="text" 
            placeholder="Book Title" 
            value={form.title} 
            onChange={(e)=>setForm({...form, title:e.target.value})} 
            className="w-full px-4 py-3 rounded-lg bg-[#0f131f] border border-white/10 focus:border-yellow-400 focus:outline-none text-white placeholder:text-gray-500" 
          /> 

          <textarea 
            rows="3" 
            placeholder="Short description" 
            value={form.description} 
            onChange={(e)=>setForm({...form, description:e.target.value})} 
            className="w-full px-4 py-3 rounded-lg bg-[#0f131f] border border-white/10 focus:border-yellow-400 focus:outline-none text-white placeholder:text-gray-500" 
          /> 

          {/* SIDE SELECT */} 
          <select 
            value={form.side} 
            onChange={(e)=>setForm({...form, side:e.target.value, category:""})} 
            className="w-full px-4 py-3 rounded-lg bg-[#0f131f] border border-white/10 focus:border-yellow-400 focus:outline-none text-gray-300" 
          > 
            <option value="">Select Story Tone</option> 
            <option value="Cute"> Dreamy</option> 
            <option value="Neutral"> Neutral</option> 
            <option value="Dark"> Chilling</option> 
          </select> 

          {/* GENRE SELECT */} 
          <select 
            value={form.category} 
            onChange={(e)=>setForm({...form, category:e.target.value})} 
            className="w-full px-4 py-3 rounded-lg bg-[#0f131f] border border-white/10 focus:border-yellow-400 focus:outline-none text-gray-300" 
          > 
            <option value="">Select Genre</option> 

            {form.side === "Cute" && ( 
              <> 
                <option value="Cute | Slice of Life">Slice of Life</option> 
                <option value="Cute | Cozy Fantasy">Cozy Fantasy</option> 
                <option value="Cute | Light Comedy">Light Comedy</option> 
              </> 
            )} 

            {form.side === "Neutral" && ( 
              <> 
                <option value="Neutral | Literary Fiction">Literary Fiction</option> 
                <option value="Neutral | Fantasy">Fantasy</option> 
                <option value="Neutral | Sci-Fi">Sci-Fi</option> 
                <option value="Neutral | Mystery">Mystery</option> 
                <option value="Neutral | Historical Fiction">Historical Fiction</option> 
                <option value="Neutral | Adventure">Adventure</option> 
              </> 
            )} 

            {form.side === "Dark" && ( 
              <>
                <option value="Dark | Thriller">Thriller</option> 
                <option value="Dark | Horror">Horror</option> 
                <option value="Dark | Crime">Crime / Noir</option> 
                <option value="Dark | Dystopian">Dystopian</option> 
              </> 
            )} 
          </select> 

          <input 
            type="file" 
            accept="image/*" 
            onChange={(e)=>setForm({...form, cover:e.target.files[0]})} 
            className="w-full px-4 py-3 rounded-lg bg-[#0f131f] border border-white/10 file:text-white text-gray-300" 
          /> 

          <textarea 
            rows="6" 
            placeholder="Write your story..." 
            value={form.content} 
            onChange={(e)=>setForm({...form, content:e.target.value})} 
            className="w-full px-4 py-3 rounded-lg bg-[#0f131f] border border-white/10 focus:border-yellow-400 focus:outline-none text-white placeholder:text-gray-500" 
          /> 

          <div className="flex items-center justify-between bg-[#0f131f] border border-white/10 rounded-lg px-4 py-3"> 
            <span className="text-sm text-gray-300">Make this Premium</span> 

            <button 
              type="button" 
              onClick={() => setForm({ ...form, isPremium: !form.isPremium })} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${ 
                form.isPremium 
                  ? "bg-[#E37EAF] text-white" 
                  : "bg-white/10 text-gray-400" 
              }`} 
            > 
              {form.isPremium ? "Premium" : "Free"} 
            </button> 
          </div> 

          <button 
            type="submit" 
            className="w-full py-3 rounded-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-300 transition-colors" 
          > 
            Publish Story  
          </button> 

        </form> 

      </div> 
    </div> 
  ); 
}