import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const serviceSuggestions = [
  { name: "AC Repair", path: "ac-repair" },
  { name: "Electrician", path: "electrician" },
  { name: "Plumbing", path: "plumbing" },
  { name: "Salon at Home", path: "salon" },
  { name: "House Cleaning", path: "cleaning" },
  { name: "Painting", path: "painting" },
  { name: "Carpentry", path: "carpentry" },
  { name: "Groceries", path: "groceries" },
  { name: "Tutors", path: "tutors" },
  { name: "Tailors", path: "tailors" },
];

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    captcha: "",
    role: "",
    serviceType: "",
  });

  const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [filteredServices, setFilteredServices] = useState(serviceSuggestions);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ question: `What is ${a} + ${b}?`, answer: a + b });
    setFormData((prev) => ({ ...prev, captcha: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "serviceType") {
      const filtered = serviceSuggestions.filter((s) =>
        s.name.toLowerCase().includes(value.toLowerCase())
      );

      // ✅ Hide suggestions if exact match
      if (serviceSuggestions.some(s => s.name.toLowerCase() === value.toLowerCase())) {
        setFilteredServices([]);
      } else {
        setFilteredServices(filtered);
      }
    }
  };

  const redirectByRole = (role: string) => {
    const r = role.toLowerCase();
    if (r === "admin") navigate("/admin/dashboard");
    else if (r === "provider") navigate("/provider/dashboard");
    else navigate("/"); // client → home
  };

  const showSuccessPopup = async (role: string) => {
    confetti({ particleCount: 150, spread: 70, origin: { x: 0 } });
    confetti({ particleCount: 150, spread: 70, origin: { x: 1 } });

    await Swal.fire({
      title: "🎉 Login Successful!",
      text: `Welcome back, ${role}!`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });

    redirectByRole(role);
  };

  const showErrorPopup = (message: string) => {
    Swal.fire({
      title: "❌ Login Failed",
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(formData.captcha) !== captcha.answer) {
      showErrorPopup("Incorrect human verification answer.");
      generateCaptcha();
      return;
    }

    try {
      if (isLogin) {
        if (!formData.username || !formData.password) {
          showErrorPopup("Please enter username and password.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.token && data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("role", data.user.role);
          login(data.user);
          await showSuccessPopup(data.user.role);
        } else {
          showErrorPopup(data.error || "Invalid username or password.");
        }
      } else {
        // signup
        if (
          !formData.name ||
          !formData.username ||
          !formData.email ||
          !formData.dob ||
          !formData.password ||
          !formData.confirmPassword ||
          !formData.role
        ) {
          showErrorPopup("Please fill out all fields.");
          return;
        }

        if (formData.role === "provider" && !formData.serviceType) {
          showErrorPopup("Please specify the service you provide.");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          showErrorPopup("Passwords do not match!");
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            dob: formData.dob,
            password: formData.password,
            role: formData.role,
            serviceType:
              formData.role === "provider" ? formData.serviceType : undefined,
          }),
        });

        const data = await res.json();

        if (res.ok && data.user) {
          Swal.fire({
            title: "✅ Signup Successful!",
            text: "Please login to continue.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          }).then(() => navigate("/login"));
        } else {
          showErrorPopup(data.error || "Signup failed.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorPopup("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4">
      <div className="hidden md:flex w-1/2 justify-center">
        <img
          src="https://jungleworks.com/wp-content/uploads/2021/07/HyperLocalImg.png"
          alt="illustration"
          className="max-w-[500px] max-h-[400px] object-contain"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isLogin ? "Login to LocalKart" : "Create your LocalKart account"}
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
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="client">Client</option>
              <option value="provider">Service Provider</option>
            </select>

            {/* Provider Service Type with Suggestions */}
            {formData.role === "provider" && (
              <div className="mb-4 relative">
                <input
                  type="text"
                  name="serviceType"
                  placeholder="Enter the service you provide"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  autoComplete="off"
                />
                {formData.serviceType &&
                  filteredServices.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-40 overflow-auto">
                      {filteredServices.map((service) => (
                        <li
                          key={service.path}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              serviceType: service.name,
                            });
                            setFilteredServices([]); // ✅ Hide suggestions after click
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {service.name}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            )}
          </>
        )}

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 select-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password */}
        {!isLogin && (
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 select-none"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
        )}

        {/* Captcha */}
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => navigate(isLogin ? "/signup" : "/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Signup here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
