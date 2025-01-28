import { Briefcase, Users, Award } from 'lucide-react';
import { supabase } from '../supabase/client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  role: string;
  cover_letter: string;
};

const Careers = () => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setSubmitting(true);
    setMessage(null);

    try {
      // Insert data into Supabase
      const { data, error } = await supabase.from('applications').insert([formData]);

      if (error) {
        console.error('Error submitting application:', error.message);
        setMessage('Failed to submit application. Please try again!');
      } else {
        console.log('Application submitted:', data);
        setMessage('Application submitted successfully!');
        reset(); // Clear form on successful submission
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    }

    setSubmitting(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl">Build a rewarding career in fire safety with industry leaders</p>
          </div>
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Magma Fire?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600">Opportunities for professional development and advancement</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Culture</h3>
              <p className="text-gray-600">Collaborative environment with passionate professionals</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Benefits</h3>
              <p className="text-gray-600">Comprehensive healthcare, 401(k), and more</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>
          <div className="bg-gray-100 rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  {...register('full_name', { required: 'Full name is required' })}
                  type="text"
                  id="full_name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Your Name"
                />
                {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Enter a valid email address' },
                  })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number' },
                  })}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Your Contact Number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Interested Role
                </label>
                <input
                  {...register('role', { required: 'Role is required' })}
                  type="text"
                  id="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Your Interested Role"
                />
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              </div>

              <div>
                <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  {...register('cover_letter', { required: 'Cover letter is required' })}
                  id="cover_letter"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Your Message Here..."
                ></textarea>
                {errors.cover_letter && <p className="text-red-500 text-sm">{errors.cover_letter.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full ${
                  submitting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
                } text-white px-6 py-3 rounded-lg font-semibold transition`}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
