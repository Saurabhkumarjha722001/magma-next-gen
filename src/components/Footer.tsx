import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl">Magma Fire</span>
            </div>
            <p className="mt-2 text-gray-400">
              Protecting lives and property with cutting-edge firefighting equipment.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-400 hover:text-white">Products</Link>
              <Link to="/about" className="block text-gray-400 hover:text-white">About Us</Link>
              <Link to="/careers" className="block text-gray-400 hover:text-white">Careers</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white">Contact Us</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567</p>
              <p className="flex items-center"><Mail className="h-4 w-4 mr-2" /> info@magmafire.com</p>
              <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> 123 Safety Street, Fire City, FC 12345</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Emergency Support</h3>
            <p className="text-gray-400">24/7 Technical Support:</p>
            <p className="text-xl font-bold text-red-500">1-800-MAGMA-911</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Magma Fire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;