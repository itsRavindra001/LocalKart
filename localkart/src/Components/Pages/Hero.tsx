// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';   // ← adjust path if needed

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
    <section className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left text content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            A Feature‑Rich Hyperlocal <br />
            Marketplace Platform for <br />
            Every Business
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ensure on‑time delivery for your local target audience by leveraging a powerful local
            marketplace solution tailored for your business.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right image content */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://jungleworks.com/wp-content/uploads/2021/07/HyperLocalImg.png"
            alt="Marketplace Illustration"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
