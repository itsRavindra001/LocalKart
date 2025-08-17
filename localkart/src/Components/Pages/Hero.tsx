import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/getstarted');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full filter blur-[100px] opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-100 rounded-full filter blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        {/* Left text content */}
        <div className="md:w-1/2 space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
              Hyperlocal Marketplace
            </span>{' '}
            <br />
            Platform for Modern <br />
            Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-lg"
          >
            Empower your local commerce with our feature-rich platform designed to connect businesses with their community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group"
            >
              <span>Get Started</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4 pt-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <img
                  key={item}
                  src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <p>Trusted by 500+ businesses</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">5.0 (200+ reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right image content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center relative"
        >
          <div className="relative w-full max-w-xl">
            <img
              src="https://jungleworks.com/wp-content/uploads/2021/07/HyperLocalImg.png"
              alt="Marketplace Illustration"
              className="w-full h-auto object-contain rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-2xl shadow-xl z-[-1]"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400 rounded-2xl shadow-xl z-[-1]"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;