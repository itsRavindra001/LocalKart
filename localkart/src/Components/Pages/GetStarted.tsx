import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-cyan-50 px-4 py-16 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 p-10">
          <img
            src="https://img.freepik.com/free-vector/cute-cool-boy-dabbing-pose-cartoon-vector-icon-illustration-people-fashion-icon-concept-isolated_138676-5680.jpg?semt=ais_hybrid&w=740"
            alt="Get Started Illustration"
            className="w-[90%] max-w-sm drop-shadow-2xl rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="p-10 flex flex-col justify-center space-y-8">
          <h1 className="text-3xl font-extrabold text-blue-700">
            Welcome to LocalKart!
          </h1>
          <p className="text-gray-600">
            You’re all set to explore a wide range of local services—from plumbing and electrical
            work to beauty, cleaning, and more. Book trusted professionals with just a few clicks.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>✅ Seamless booking & instant confirmation</li>
            <li>✅ Verified, top‑rated service providers</li>
            <li>✅ Transparent pricing and secure payments</li>
            <li>✅ 24/7 customer support</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/services"
              className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Services
            </Link>
            <Link
              to="/provider"
              className="flex-1 text-center bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
