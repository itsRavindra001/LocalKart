// src/Components/Pages/provider/ProviderDashboard.tsx
import React from "react";
import { useAuth } from "../../../Contexts/AuthContext";

const ProviderDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const username: string | null =
    currentUser?.username || localStorage.getItem("username");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {username || "Provider"} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          This is your provider dashboard. From here, you can manage your
          services, view bookings, and track your earnings.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Services */}
          <div className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              My Services
            </h2>
            <p className="text-gray-500">
              Manage and update the services you offer.
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View Services
            </button>
          </div>

          {/* Bookings */}
          <div className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Bookings
            </h2>
            <p className="text-gray-500">
              Check and manage your upcoming bookings.
            </p>
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Bookings
            </button>
          </div>

          {/* Earnings */}
          <div className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Earnings
            </h2>
            <p className="text-gray-500">
              Track your earnings and payment history.
            </p>
            <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              View Earnings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
