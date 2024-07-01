import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Testimonial from "./Pages/Testimonial";
import Cart from "./Component/Cart/Cart";
import CartItems from "./Component/Cart/CartItems";
import CheckOut from "./Component/Payment/CheckOut";
import ProtectRoute from "./Context/ProfileProtect/ProtectUserData";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route path="/shop/:id" element={<Cart />} />
        <Route path="/cartitems" element={<CartItems />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

export default App;
