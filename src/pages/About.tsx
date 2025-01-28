import React from 'react';
import { Shield, Users, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Magma Fire</h1>
            <p className="text-xl">Leading the way in firefighting equipment since 1970</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              To provide cutting-edge firefighting equipment that protects lives and property, 
              while setting new standards for safety, reliability, and innovation in the fire 
              safety industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">Committed to the highest safety standards in all our products</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Staffed by industry veterans and safety specialists</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Globe className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Serving fire departments and industries worldwide</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Quality</h3>
              <p className="text-gray-600">ISO certified manufacturing processes</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Journey</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3" 
                    alt="Company History" 
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-xl md:text-2xl font-bold mb-4">Founded in 1970</h3>
                <p className="text-gray-600 mb-4">
                  Magma Fire was established with a vision to revolutionize firefighting equipment. 
                  Starting with a single manufacturing facility, we've grown to become a global 
                  leader in fire safety solutions.
                </p>
                <p className="text-gray-600">
                  Our commitment to innovation and quality has earned us the trust of fire 
                  departments and industries worldwide, making us a preferred choice for 
                  professional firefighting equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">1000+</div>
              <div className="text-gray-600">Fire Departments Served</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">30+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;