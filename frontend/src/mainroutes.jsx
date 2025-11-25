import {Routes,Route} from "react-router-dom"
import App from "./App";
import Admin from "./admin";
import Protected from "./Protected";
import Products from "./Product";
import Cart from "./Cart";
import Search from "./Search";


function Mainroutes(){
    return(
       <Routes>
         <Route path="/" element={<App/>}/>
         <Route path="/admin" element={<Admin/>}/>
         <Route path="/prod" element={<Products/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/search" element={<Search/>}/>
       </Routes>
    );
};
export default Mainroutes;
