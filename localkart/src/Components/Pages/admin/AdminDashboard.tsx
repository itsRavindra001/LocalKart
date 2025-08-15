import {
  Users,
  UserCheck,
  UserX,
  ClipboardList,
  DollarSign,
  Briefcase,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: "1,245", icon: Users, color: "bg-blue-500" },
    { label: "Active Providers", value: "320", icon: Briefcase, color: "bg-green-500" },
    { label: "Pending Approvals", value: "12", icon: ClipboardList, color: "bg-yellow-500" },
    { label: "Revenue", value: "$45,230", icon: DollarSign, color: "bg-purple-500" },
  ];

  const recentUsers = [
    { name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", role: "Provider", status: "Pending" },
    { name: "Mike Lee", email: "mike@example.com", role: "User", status: "Active" },
    { name: "Sarah Kim", email: "sarah@example.com", role: "Provider", status: "Suspended" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600 mt-1">Manage users, providers, and platform activity.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-full text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users Table */}
      <div className="bg-white shadow rounded-lg mt-8 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.role}</td>
                <td className={`py-2 font-medium ${
                  user.status === "Active"
                    ? "text-green-600"
                    : user.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition">
          <UserCheck className="inline-block mr-2" /> Approve Providers
        </button>
        <button className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition">
          <Users className="inline-block mr-2" /> Manage Users
        </button>
        <button className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 transition">
          <ClipboardList className="inline-block mr-2" /> View Reports
        </button>
        <button className="bg-red-500 text-white p-4 rounded-lg shadow hover:bg-red-600 transition">
          <UserX className="inline-block mr-2" /> Suspend Accounts
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
