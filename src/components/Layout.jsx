import React from "react";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar />
      <div className="flex-1 px-4 py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
