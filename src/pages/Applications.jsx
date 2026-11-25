import { useState } from "react";
import { Search, Pencil, Trash2, X, Save } from "lucide-react";

function Applications({
  applications,
  onUpdate,
  onDelete
}) {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // SEARCH + FILTER
  const filteredApplications = applications.filter((app) => {

    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // START EDITING
  const handleEdit = (app) => {
    setEditingId(app.id);
    setEditData({ ...app });
  };

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // SAVE CHANGES
  const handleSave = () => {
    if (!editData.company.trim() || !editData.role.trim()) {
      return;
    }

    onUpdate(editData);
    setEditingId(null);
  };

  // CANCEL EDITING
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Applications
        </h1>

        <p className="text-slate-500 mt-1">
          Manage and track all your job applications.
        </p>
      </div>

      {/* SEARCH AND FILTER */}

      <div className="bg-white p-4 rounded-xl border flex flex-col sm:flex-row gap-4">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role..."
            className="w-full border rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="OA">Online Assessment</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* APPLICATIONS TABLE */}

      <div className="bg-white border rounded-xl overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-500 text-sm">

            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Role</th>
              <th className="p-4">Applied Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredApplications.map((app) => (

              <tr key={app.id} className="border-t">

                {editingId === app.id ? (

                  <>
                    <td className="p-3">
                      <input
                        name="company"
                        value={editData.company}
                        onChange={handleChange}
                        className="border rounded p-2 w-36"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        name="role"
                        value={editData.role}
                        onChange={handleChange}
                        className="border rounded p-2 w-40"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleChange}
                        className="border rounded p-2"
                      />
                    </td>

                    <td className="p-3">
                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="border rounded p-2"
                      >
                        <option value="Applied">Applied</option>
                        <option value="OA">OA</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2">

                        <button
                          onClick={handleSave}
                          className="text-green-600"
                          title="Save"
                        >
                          <Save size={18} />
                        </button>

                        <button
                          onClick={handleCancel}
                          className="text-slate-500"
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>

                      </div>
                    </td>
                  </>

                ) : (

                  <>
                    <td className="p-4 font-medium">
                      {app.company}
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {app.role}
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {app.date || "Not specified"}
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {app.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-3">

                        <button
                          onClick={() => handleEdit(app)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(
                              `Delete ${app.company}?`
                            )) {
                              onDelete(app.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>
                  </>

                )}

              </tr>

            ))}

            {filteredApplications.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-slate-500"
                >
                  No applications found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      <p className="text-sm text-slate-500">
        Showing {filteredApplications.length} of {applications.length} applications
      </p>

    </div>
  );
}

export default Applications;