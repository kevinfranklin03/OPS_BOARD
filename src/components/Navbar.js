import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-beige py-4 px-6 shadow-md border-b border-gray-300">
    <div className="max-w-6xl mx-auto flex justify-center space-x-8 text-primary font-semibold text-lg">
      <Link to="/" className="hover:underline">Dashboard</Link>
      <Link to="/vendors" className="hover:underline">Vendors</Link>
      <Link to="/inventory" className="hover:underline">Inventory</Link>
      <Link to="/invoices" className="hover:underline">Invoices</Link>
    </div>
  </nav>
);

export default Navbar;
