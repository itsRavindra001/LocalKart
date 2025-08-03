import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import MapPicker from './MapPicker';

emailjs.init('_ifDJ94YMPffwWLlN'); // Replace with your actual EmailJS public key

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    address: '',
    captcha: '',
  });

  const [captcha, setCaptcha] = useState({ question: '', answer: 0 });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ question: `What is ${a} + ${b}?`, answer: a + b });
    setFormData((prev) => ({ ...prev, captcha: '' }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (+formData.captcha !== captcha.answer) {
      alert('❌ Incorrect Captcha.');
      return generateCaptcha();
    }

    try {
      // ✅ Send confirmation email
      await emailjs.send('service_lfwrs5j', 'template_7ab41ra', {
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        user_service: formData.service,
        user_date: formData.date,
        user_address: formData.address,
      });

      // ✅ Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('❌ You must be logged in to book a service.');
        return;
      }

      // ✅ Send booking to backend with token
      const dbRes = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Important!
        },
        body: JSON.stringify(formData),
      });

      if (!dbRes.ok) {
        const errorData = await dbRes.json();
        throw new Error(errorData?.error || 'DB Save Failed');
      }

      alert('✅ Booking submitted and saved!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        address: '',
        captcha: '',
      });
      generateCaptcha();
    } catch (err) {
      console.error('❌ Failed to submit booking:', err);
      alert('❌ Failed to submit booking.');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Left: Form */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Book a Service</h2>
          <p className="text-gray-500 text-sm mb-8">Fill out the form and we’ll confirm your booking shortly.</p>

          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select a Service</option>
              {[
                'Plumbing', 'Electrician', 'AC Repair', 'Salon at Home',
                'House Cleaning', 'Painting', 'Carpentry', 'Pest Control',
                'Groceries', 'Tutors', 'Tailors',
              ].map((svc) => (
                <option key={svc}>{svc}</option>
              ))}
            </select>

            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-field"
            />

            <textarea
              name="address"
              rows={3}
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field resize-none"
            />

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Human Verification: {captcha.question}
              </label>
              <input
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                placeholder="Enter your answer"
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              Book Now
            </button>
          </form>
        </div>

        {/* Right: Map Picker */}
        <div className="bg-blue-50 flex items-center justify-center p-6 lg:p-10">
          <MapPicker
            onLocationSelect={(addr) =>
              setFormData((prev) => ({ ...prev, address: addr }))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
