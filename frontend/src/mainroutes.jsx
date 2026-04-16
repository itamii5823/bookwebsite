import {Routes,Route} from "react-router-dom"
import App from "./App";
import Admin from "./admin";




function Mainroutes(){
    return(
       <Routes>
         <Route path="/" element={<App/>}/>
         <Route path="/admin" element={<Admin/>}/>


       </Routes>
    );
};
export default Mainroutes;
