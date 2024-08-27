import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import Dashboard from "./Admin/Pages/Dashboard";
import Categories from "./Admin/Pages/Categories";
import Products from "./Admin/Pages/Products";
import Customers from "./Admin/Pages/Customers";
import ProtectAdmin from "./Admin/Pages/AdminHome/HomeProtect";
import UserDetails from "./Admin/Pages/CustomerDetials";

const App = () => {
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

        {/* Admin routes */}
        <Route
          path="/adminhome"
          element={
            <ProtectAdmin>
              <AdminHome />
            </ProtectAdmin>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectAdmin>
              <AdminHome>
                <Dashboard />
              </AdminHome>
            </ProtectAdmin>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectAdmin>
              <AdminHome>
                <Categories />
              </AdminHome>
            </ProtectAdmin>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectAdmin>
              <AdminHome>
                <Products />
              </AdminHome>
            </ProtectAdmin>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectAdmin>
              <AdminHome>
                <Customers />
              </AdminHome>
            </ProtectAdmin>
          }
        />
        <Route
          path="/customers/:userId"
          element={
            <ProtectAdmin>
              <AdminHome>
                <UserDetails />
              </AdminHome>
            </ProtectAdmin>
          }
        />
      </Routes>
    </>
  );
};

export default App;
