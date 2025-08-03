import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

emailjs.init('_ifDJ94YMPffwWLlN');

const SERVICE_ID = 'service_lfwrs5j';
const TEMPLATE_ID = 'template_7ab41ra';
const PUBLIC_KEY = '_ifDJ94YMPffwWLlN';

const Contact = ({ serviceName = 'General Inquiry' }) => {
  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_address: '',
    user_message: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email)) {
      setStatus({ loading: false, error: 'Please enter a valid email.', success: false });
      return;
    }

    setStatus({ loading: true, error: '', success: false });

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        ...form,
        service_name: serviceName,
      }, PUBLIC_KEY);

      setStatus({ loading: false, error: '', success: true });
      setForm({
        user_name: '',
        user_email: '',
        user_phone: '',
        user_address: '',
        user_message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({ loading: false, error: 'Failed to send message.', success: false });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left: Image or Illustration */}
        <div className="bg-blue-600 md:w-1/2 p-8 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">Let’s Talk!</h2>
          <p className="mb-8 text-white/90">
            Whether you’re a customer needing support or a service provider with a query, we’re here to help.
          </p>
          <img
            src="https://jungleworks.com/wp-content/uploads/2021/07/HyperLocalImg.png"
            alt="Contact Us"
            className="w-64 mx-auto"
          />
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 p-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">Contact Us</h3>
          <p className="text-gray-500 text-sm text-center mb-6">We'll get back to you shortly.</p>

          {status.success && (
            <p className="text-green-600 text-center text-sm mb-4">
              ✅ Your message about <strong>{serviceName}</strong> was sent successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Full Name"
              value={form.user_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email Address"
              value={form.user_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
            />
            <input
              type="tel"
              name="user_phone"
              placeholder="Phone Number"
              value={form.user_phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              name="user_address"
              placeholder="Address"
              value={form.user_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
            />
            <textarea
              name="user_message"
              placeholder="Your Message"
              rows={4}
              value={form.user_message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
            ></textarea>

            {status.error && (
              <p className="text-red-600 text-sm text-center">{status.error}</p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-6 text-center text-sm text-blue-600 space-y-2">
            <a href="tel:+911234567890" className="block hover:underline">📞 +91 12345 67890</a>
            <a href="mailto:support@localkart.com" className="block hover:underline">📧 support@localkart.com</a>
            <a
              href="https://wa.me/917061188736"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 hover:underline"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-5 h-5"
              />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
