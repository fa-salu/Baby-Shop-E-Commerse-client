import React from "react";
import Navbar from "../../Component/AdminNavbar";
import Sidebar from "../../Component/AdminSidebar";

const AdminHome = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#172F4A] overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 z-1">
        <Navbar />

        <div className="relative flex-1 p-6 overflow-y-auto mt-16 ml-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
