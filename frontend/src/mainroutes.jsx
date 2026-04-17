import {Routes,Route} from "react-router-dom"
import App from "./App";
import Admin from "./admin";
import Login from "./Login";
import Sign from "./Sign";
import Books from "./Book";
import Bookd from "./Bookd";




function Mainroutes(){
    return(
       <Routes>
         <Route path="/" element={<App/>}/>
         <Route path="/admin" element={<Admin/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign" element={<Sign/>}/>
          <Route path="/book" element={<Books/>}/>
          <Route path="/bookd/:id" element={<Bookd/>}/>


       </Routes>
    );
};
export default Mainroutes;
