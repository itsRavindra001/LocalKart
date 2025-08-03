import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Provider = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    city: '',
    experience: '',
    about: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Become a Service Provider</h1>
        <p className="text-gray-600 text-lg">
          Join LocalKart and offer your services to thousands of customers in your area. It's free, easy, and effective!
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-4xl mx-auto p-8 rounded-xl shadow-md grid md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          placeholder="Service You Offer (e.g., Electrician, Plumber)"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Years of Experience"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="Tell us about your service..."
          rows={4}
          className="p-3 border border-gray-300 rounded md:col-span-2"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 md:col-span-2"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Provider;
