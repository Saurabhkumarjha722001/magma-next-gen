import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="p-8">
      {/* Header with Logout Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear(); // Clear session or any related data
            window.location.href = "/admin"; // Redirect to login
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mb-8 flex space-x-6 border-b pb-2">
        <Link
          to="/admin/dashboard/contacts"
          className={`pb-1 ${
            location.pathname === "/admin/dashboard/contacts" || location.pathname === "/admin/dashboard"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-600 hover:text-red-600"
          } font-semibold transition`}
        >
          Contacts
        </Link>
        <Link
          to="/admin/dashboard/applications"
          className={`pb-1 ${
            location.pathname === "/admin/dashboard/applications"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-600 hover:text-red-600"
          } font-semibold transition`}
        >
          Applications
        </Link>
        <Link
          to="/admin/dashboard/products"
          className={`pb-1 ${
            location.pathname === "/admin/dashboard/products"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-600 hover:text-red-600"
          } font-semibold transition`}
        >
          Products
        </Link>
      </nav>

      {/* Outlet for Sub-Pages */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
