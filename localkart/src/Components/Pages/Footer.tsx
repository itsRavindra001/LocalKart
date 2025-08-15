// import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">LocalKart</h2>
          <p className="text-slate-400 mb-4">
            Your trusted local service marketplace for on-demand home services.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-slate-300 hover:text-white text-lg"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-slate-300 hover:text-white text-lg"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-slate-300 hover:text-white text-lg"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-slate-300 hover:text-white text-lg"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services/plumbing" className="hover:text-white">Plumbing</Link></li>
            <li><Link to="/services/electrician" className="hover:text-white">Electrician</Link></li>
            <li><Link to="/services/cleaning" className="hover:text-white">Cleaning</Link></li>
            <li><Link to="/services/groceries" className="hover:text-white">Groceries</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/provider" className="hover:text-white">Become a Provider</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm text-slate-400">support@localkart.com</p>
          <p className="text-sm text-slate-400 mt-1">+91 1234567890</p>
          <p className="text-sm text-slate-400 mt-1">Rajkot,Gujarat</p>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} LocalKart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
