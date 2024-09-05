import { Routes, Route } from "react-router-dom";
import "./pages/chef-pages/animations.css";
import DishCard from "./pages/distCard";
import RecipeDishList from "./pages/recipeList";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Header_chef from "./pages/chef-pages/header";
import UserReg from "./components/UserReg"; // Update the path as per your file structure
import CheckoutComponent from "./components/checkout";
import { ContextProvider } from "./components/contextProvider";
import { ThemeProvider } from "@material-tailwind/react";
import Recipe_dish_management from "./pages/chef-pages/recpie-dish-management";
import { CartProvider } from "./components/cartcontext";
// import Cart from "../../server/Models/cart";
// import Cart from "./components/sidebarcart";
import CartSidebar from "./components/sidebarcart";
function App() {
  return (
    <>
    <CartProvider>

    
      <ThemeProvider>
        <ContextProvider>
          <Header />

          <Routes>
            <Route path="/RecipeDishList" element={<RecipeDishList />} />
            <Route path="/checkout" element={<CheckoutComponent/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserReg />} />
            <Route path="/UserReg" element={<userReg />} />
            <Route path="/DishCard" element={<DishCard />} />
            <Route path="/recipes" element={<Recipe_dish_management/>}/>
            <Route path="/cart" element={<CartSidebar/>}/>
            <Route path="/chef-profile" element={<Header_chef />} />
          </Routes>
          <Footer />
        </ContextProvider>
      </ThemeProvider>
      </CartProvider>
    </>
  );
}

export default App;
