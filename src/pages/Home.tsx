import React from "react";
import { Shield, Award, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import backgroundImage from "./index.jpg";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative min-h-[40vh] lg:min-h-[95vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Protecting Lives, Securing Futures
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8">
              Industry-leading firefighting equipment for professional fire
              services
            </p>
            <Link
              to="/products"
              className="inline-block bg-red-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose Magma Fire?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Superior Quality</h3>
              <p className="text-gray-600">
                Premium firefighting equipment that meets international safety
                standards
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Products</h3>
              <p className="text-gray-600">
                All products are certified by leading safety organizations
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock technical support and emergency assistance
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Experienced professionals dedicated to your safety needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Enhance Your Fire Safety?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Contact our team of experts for a personalized consultation
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-red-700 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
