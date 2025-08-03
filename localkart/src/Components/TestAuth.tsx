import React from 'react';
import { useAuth } from '../Contexts/AuthContext';


const TestAuth = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-semibold mb-4">
        {isLoggedIn ? 'You are logged in ✅' : 'You are logged out ❌'}
      </h2>
      <button
        onClick={isLoggedIn ? logout : login}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default TestAuth;
