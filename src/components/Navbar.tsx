import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flame, Menu, X } from "lucide-react";
import { supabase } from "../supabase/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const location = useLocation(); // Get the current location

  // Check if the admin is logged in
  useEffect(() => {
    const checkAdminSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdminLoggedIn(!!session); // If a session exists, the admin is logged in
    };

    checkAdminSession();
  }, []);

  // Helper function to check active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Flame className="h-8 w-8" />
            <span className="font-bold text-xl">Magma Fire</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition ${
                isActive("/") ? "text-red-200 underline" : "hover:text-red-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`transition ${
                isActive("/products") ? "text-red-200 underline" : "hover:text-red-200"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`transition ${
                isActive("/about") ? "text-red-200 underline" : "hover:text-red-200"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/careers"
              className={`transition ${
                isActive("/careers") ? "text-red-200 underline" : "hover:text-red-200"
              }`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className={`transition ${
                isActive("/contact") ? "text-red-200 underline" : "hover:text-red-200"
              }`}
            >
              Contact Us
            </Link>
            {isAdminLoggedIn && (
              <Link
                to="/admin/dashboard"
                className={`transition ${
                  isActive("/admin/dashboard") ? "text-red-200 underline" : "hover:text-red-200"
                }`}
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`py-2 transition ${
                  isActive("/") ? "text-red-200 underline" : "hover:text-red-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`py-2 transition ${
                  isActive("/products") ? "text-red-200 underline" : "hover:text-red-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`py-2 transition ${
                  isActive("/about") ? "text-red-200 underline" : "hover:text-red-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className={`py-2 transition ${
                  isActive("/careers") ? "text-red-200 underline" : "hover:text-red-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className={`py-2 transition ${
                  isActive("/contact") ? "text-red-200 underline" : "hover:text-red-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              {isAdminLoggedIn && (
                <Link
                  to="/admin/dashboard"
                  className={`py-2 transition ${
                    isActive("/admin/dashboard") ? "text-red-200 underline" : "hover:text-red-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
