import React, { useCallback, useEffect, useState } from "react";
import {
  Users,
  ClipboardList,
  DollarSign,
  Briefcase,
  Loader,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Search,
  Filter,
  BarChart3,
  Eye,
  Edit,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  Calendar,
  Download,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/admin";

type UserItem = {
  _id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  status?: string | null;
  createdAt?: string | null;
  phone?: string | null;
  location?: string | null;
  lastActive?: string | null;
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProviders: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeBookings: 0,
  });

  const [recentUsers, setRecentUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // track in-flight actions so buttons can be disabled per-user
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>({});

  const token = localStorage.getItem("token"); // adjust if your token is stored differently

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      setRefreshing(true);

      const resp = await fetch(`${API_BASE}/dashboard`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`Failed to fetch dashboard data: ${resp.status} ${text}`);
      }

      // some servers return no body (204) - handle defensively
      const text = await resp.text().catch(() => "");
      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          // not JSON, ignore
          data = {};
        }
      }

      if (data.stats) {
        setStats({
          totalUsers: data.stats.totalUsers ?? 0,
          activeProviders: data.stats.activeProviders ?? 0,
          pendingApprovals: data.stats.pendingApprovals ?? 0,
          totalRevenue: data.stats.totalRevenue ?? 0,
          monthlyGrowth: data.stats.monthlyGrowth ?? 0,
          activeBookings: data.stats.activeBookings ?? 0,
        });
      }

      setRecentUsers(Array.isArray(data.recentUsers) ? data.recentUsers : []);
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      setError(err?.message || "Failed to load dashboard data");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatDate = (dateString?: string | null) =>
    dateString ? new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

  const formatDateTime = (dateString?: string | null) =>
    dateString ? new Date(dateString).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Unknown";

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleBadge = (role?: string | null) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "provider":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const safeString = (s?: string | null) => (s ?? "").toString();

  // Determine which users to show depending on active tab
  const usersForTab = React.useMemo(() => {
    const tab = (activeTab || "overview").toLowerCase();
    if (tab === "providers") {
      return recentUsers.filter((u) => (u.role ?? "").toLowerCase() === "provider");
    }
    if (tab === "users") {
      return recentUsers.filter((u) => (u.role ?? "").toLowerCase() === "client");
    }
    if (tab === "overview") {
      // show a small recent list for overview
      return recentUsers.slice(0, 6);
    }
    // analytics or unknown: return recent users as a fallback
    return recentUsers;
  }, [activeTab, recentUsers]);

  // Apply search scoped to the currently visible set
  const filteredUsers = usersForTab.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      safeString(user.name).toLowerCase().includes(term) ||
      safeString(user.email).toLowerCase().includes(term) ||
      safeString(user.role).toLowerCase().includes(term)
    );
  });

  const pendingProviders = usersForTab.filter((u) => (u.role ?? "").toLowerCase() === "provider" && (u.status ?? "").toLowerCase() === "pending");

  const setProcessing = (id: string, state: boolean) => {
    setProcessingIds((prev) => ({ ...prev, [id]: state }));
  };

  // Unified handlers: after successful server update, re-fetch entire dashboard so stats/tables stay in sync
  const handleApproveProvider = async (userId: string) => {
    setError(null);
    setProcessing(userId, true);
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/approve`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Approve failed: ${res.status} ${text}`);
      }

      // If server returns JSON, we could use it; but even if it returns 204/empty, re-fetch to update UI
      await fetchDashboardData();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to approve provider");
    } finally {
      setProcessing(userId, false);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    setError(null);
    setProcessing(userId, true);
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/suspend`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Suspend failed: ${res.status} ${text}`);
      }

      await fetchDashboardData();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to suspend user");
    } finally {
      setProcessing(userId, false);
    }
  };

  const handleActivateUser = async (userId: string) => {
    setError(null);
    setProcessing(userId, true);
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/activate`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Activate failed: ${res.status} ${text}`);
      }

      await fetchDashboardData();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to activate user");
    } finally {
      setProcessing(userId, false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchDashboardData} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const searchPlaceholder = activeTab === "providers" ? "Search providers..." : activeTab === "analytics" ? "Search..." : "Search users...";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage users, providers, and platform activity</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900" type="button">
                <Download size={18} className="mr-1" />
                Export
              </button>
              <button onClick={fetchDashboardData} disabled={refreshing} className="flex items-center bg-white text-gray-700 px-3 py-2 rounded-md border hover:bg-gray-50 transition disabled:opacity-50" type="button">
                <RefreshCw size={18} className={`mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{(stats.totalUsers ?? 0).toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  +{stats.monthlyGrowth ?? 0}% this month
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Providers</p>
                <p className="text-2xl font-bold text-gray-900">{(stats.activeProviders ?? 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Platform professionals</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Briefcase size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{(stats.pendingApprovals ?? 0).toLocaleString()}</p>
                <p className="text-sm text-amber-600 mt-1">Needs review</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <ClipboardList size={24} className="text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${(stats.totalRevenue ?? 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Lifetime earnings</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["Overview", "Users", "Providers", "Analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.toLowerCase() ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" type="button">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" type="button">
                  <BarChart3 size={16} className="mr-2" />
                  View Reports
                </button>
              </div>
            </div>

            {/* Conditional content based on active tab */}
            {activeTab === "providers" && pendingProviders.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-800 flex items-center">
                      <AlertCircle size={18} className="mr-2" />
                      Pending Provider Approvals ({pendingProviders.length})
                    </h3>
                    <p className="text-amber-700 text-sm mt-1">These providers are waiting for approval to offer services on the platform.</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {pendingProviders.map((user) => {
                    const avatarLetter = (user.name ?? user.email ?? "U").charAt(0).toUpperCase();
                    const isProcessing = !!processingIds[user._id];
                    return (
                      <div key={user._id} className="bg-white rounded-lg p-3 border border-amber-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                              <span className="text-amber-800 font-semibold">{avatarLetter}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name ?? user.email ?? "N/A"}</p>
                              <p className="text-sm text-gray-600">{user.email ?? "N/A"}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleApproveProvider(user._id)}
                            disabled={isProcessing}
                            type="button"
                            className={`px-3 py-1 rounded-md text-sm transition ${isProcessing ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}>
                            {isProcessing ? "Approving..." : "Approve"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab-specific main content */}
            {activeTab === "analytics" ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600">
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-sm">Charts and visualizations will appear here. (Placeholder)</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      const avatarLetter = (user.name ?? user.email ?? "U").charAt(0).toUpperCase();
                      const role = (user.role ?? "user").toLowerCase();
                      const status = (user.status ?? "pending").toLowerCase();
                      const isProcessing = !!processingIds[user._id];
                      return (
                        <React.Fragment key={user._id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-800 font-semibold">{avatarLetter}</span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name ?? user.email ?? "N/A"}</div>
                                  <div className="text-sm text-gray-500">{user.email ?? "N/A"}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(role)}`}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900" type="button"><Eye size={16} /></button>
                                <button className="text-gray-600 hover:text-gray-900" type="button"><Edit size={16} /></button>
                                <button onClick={() => setExpandedUser(expandedUser === user._id ? null : user._id)} className="text-gray-600 hover:text-gray-900" type="button">
                                  {expandedUser === user._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                              </div>
                            </td>
                          </tr>

                          {expandedUser === user._id && (
                            <tr>
                              <td colSpan={5} className="px-6 py-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                  <div className="flex items-center"><Phone size={16} className="text-gray-400 mr-2" /><span>{user.phone ?? "Not provided"}</span></div>
                                  <div className="flex items-center"><MapPin size={16} className="text-gray-400 mr-2" /><span>{user.location ?? "Not provided"}</span></div>
                                  <div className="flex items-center"><Calendar size={16} className="text-gray-400 mr-2" /><span>Last active: {formatDateTime(user.lastActive)}</span></div>
                                  <div className="flex items-center space-x-2">
                                    {status === "pending" && (
                                      <button onClick={() => handleApproveProvider(user._id)} disabled={isProcessing} type="button" className={`px-3 py-1 rounded text-sm transition ${isProcessing ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}>
                                        {isProcessing ? "Approving..." : "Approve"}
                                      </button>
                                    )}
                                    {status === "active" && (
                                      <button onClick={() => handleSuspendUser(user._id)} disabled={isProcessing} type="button" className={`px-3 py-1 rounded text-sm transition ${isProcessing ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}>
                                        {isProcessing ? "Suspending..." : "Suspend"}
                                      </button>
                                    )}
                                    {status === "suspended" && (
                                      <button onClick={() => handleActivateUser(user._id)} disabled={isProcessing} type="button" className={`px-3 py-1 rounded text-sm transition ${isProcessing ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                                        {isProcessing ? "Activating..." : "Activate"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {filteredUsers.length === 0 && activeTab !== "analytics" && (
              <div className="text-center py-12">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No {activeTab === "providers" ? "providers" : "users"} found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
