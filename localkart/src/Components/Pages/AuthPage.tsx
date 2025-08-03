import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    captcha: '',
    role: '',
  });

  const [captcha, setCaptcha] = useState({ question: '', answer: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ question: `What is ${a} + ${b}?`, answer: a + b });
    setFormData((prev) => ({ ...prev, captcha: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(formData.captcha) !== captcha.answer) {
      alert('Incorrect human verification answer.');
      generateCaptcha();
      return;
    }

    try {
      if (isLogin) {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (res.ok && data.user) {
          alert('Login successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.user.username);
          login({
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
          });
          navigate('/');
        } else {
          alert(data.message || 'Login failed');
        }
      } else {
        if (
          !formData.name ||
          !formData.username ||
          !formData.email ||
          !formData.dob ||
          !formData.password ||
          !formData.confirmPassword ||
          !formData.role
        ) {
          alert('Please fill out all fields.');
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }

        const res = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
          alert('Signup successful!');
          localStorage.setItem('username', formData.username);
          login({
            username: formData.username,
            email: formData.email,
            role: formData.role,
          });
          navigate('/');
        } else {
          alert(data.message || 'Signup failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4">
      {/* Left: Illustration */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img
          src="https://jungleworks.com/wp-content/uploads/2021/07/HyperLocalImg.png"
          alt="illustration"
          className="max-w-[500px] max-h-[400px] object-contain"
        />
      </div>

      {/* Right: Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isLogin ? 'Login to LocalKart' : 'Create your LocalKart account'}
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="" disabled>Select your role</option>
                <option value="client">Client</option>
                <option value="provider">Service Provider</option>
              </select>
            </div>
          </>
        )}

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {!isLogin && (
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
        )}

        {isLogin && (
          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember Me
            </label>
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>
        )}

        {/* CAPTCHA */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Human Verification: {captcha.question}
          </label>
          <input
            type="text"
            name="captcha"
            value={formData.captcha}
            onChange={handleChange}
            placeholder="Enter answer"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? 'Login' : 'Signup'}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => navigate(isLogin ? '/signup' : '/login')}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? 'Signup here' : 'Login here'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
