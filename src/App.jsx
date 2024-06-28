import React from "react";
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop/:id" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
