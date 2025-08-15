// src/Components/TestAuth.tsx
import React from "react";
import { useAuth } from "../Contexts/AuthContext";

const TestAuth: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();

  // A dummy user object to simulate a logged-in user
  const dummyUser = {
    _id: "123456",
    username: "testuser",
    email: "testuser@example.com",
    role: "client", // could be "admin" or "provider" too
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isLoggedIn ? "✅ You are logged in" : "❌ You are logged out"}
        </h1>

        <button
          onClick={() => {
            if (isLoggedIn) {
              logout();
            } else {
              login(dummyUser); // Pass required UserInfo object here
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default TestAuth;
