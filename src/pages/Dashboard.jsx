import { Link } from "react-router-dom";
import { useState } from "react";

import {
  BriefcaseBusiness,
  Clock,
  Trophy,
  XCircle,
  Search,
  Plus,
} from "lucide-react";

import StatCard from "../components/StatCard";
import AddApplicationForm from "../components/AddApplicationForm";

function Dashboard({ applications, onAddApplication }) {
  // Controls Add Application form visibility
  const [showForm, setShowForm] = useState(false);

  // Search state
  const [search, setSearch] = useState("");

  // Search by company name or job role
  const filteredApplications = applications.filter((app) => {
    const searchTerm = search.toLowerCase();

    return (
      app.company.toLowerCase().includes(searchTerm) ||
      app.role.toLowerCase().includes(searchTerm)
    );
  });

  // Calculate dashboard statistics dynamically
  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: BriefcaseBusiness,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "In Progress",
      value: applications.filter((app) =>
        ["Applied", "OA", "Interview"].includes(app.status),
      ).length,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Offers Received",
      value: applications.filter((app) => app.status === "Selected").length,
      icon: Trophy,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rejections",
      value: applications.filter((app) => app.status === "Rejected").length,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
  ];

  // Status badge styling
  const getStatusStyle = (status) => {
    const styles = {
      Applied: "bg-yellow-100 text-yellow-700",
      OA: "bg-purple-100 text-purple-700",
      Interview: "bg-blue-100 text-blue-700",
      Selected: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-slate-100 text-slate-700";
  };

  // Handle new application
  const handleAdd = (newApplication) => {
    onAddApplication(newApplication);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, Abhi! 👋
        </h1>

        <p className="text-slate-500 mt-1">
          Here's what's happening with your placement journey.
        </p>
      </div>

      {/* Add Application Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Application
        </button>
      </div>

      {/* Add Application Form */}
      {showForm && (
        <AddApplicationForm
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl border border-slate-200">
        {/* Table Header */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Recent Applications
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Track your latest company applications.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Applied Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4 font-medium">
                    <Link
                      to={`/applications/${app.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {app.company}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {app.role}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {app.date || "Not specified"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}

              {/* Empty Search Result */}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
