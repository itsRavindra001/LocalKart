import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const resetLink = `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}`;
    const templateParams = { to_email: email, reset_link: resetLink };

    try {
      await emailjs.send(
        'service_lfwrs5j',
        'template_yobdazk',
        templateParams,
        '_ifDJ94YMPffwWLlN'
      );
      setSent(true);
    } catch (err) {
      console.error('Email failed:', err);
      setError('❌ Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen px-6 gap-8 bg-[#f8f9fb]">
      {/* Image side */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://jungleworks.com/wp-content/uploads/2021/07/HyperLocalImg.png"
          alt="HyperLocal Illustration"
          className="w-full max-w-[500px] sm:max-w-[300px] object-contain"
        />
      </div>

      {/* Form side */}
      <form
        onSubmit={handleSend}
        className="flex-1 max-w-[420px] w-full bg-white/15 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30"
      >
        <h2 className="text-[1.8rem] text-[#0077cc] mb-6 text-center font-semibold">
          Forgot Password
        </h2>

        {!sent ? (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base bg-white/80 backdrop-blur-sm focus:outline-none"
            />
            {error && (
              <p className="text-red-600 text-sm text-center mb-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0077cc] text-white rounded-lg text-base font-semibold hover:bg-[#005fa3] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </>
        ) : (
          <p className="text-[#0077cc] text-center text-base font-medium">
            ✅ Reset link sent to <strong>{email}</strong>
            <br />
            Please check your inbox.
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
