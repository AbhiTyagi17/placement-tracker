import { useState } from "react";

function AddApplicationForm({ onAdd, onCancel }) {

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    date: "",
    jobLink: "",
    status: "Applied",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      return;
    }

    onAdd({
      ...formData,
      id: Date.now()
    });

    setFormData({
      company: "",
      role: "",
      date: "",
      jobLink: "",
      status: "Applied",
      notes: ""
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Add New Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-2">
              Company Name *
            </label>

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Role *
            </label>

            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. SDE Intern"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Application Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Application Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 bg-white"
            >
              <option value="Applied">Applied</option>
              <option value="OA">Online Assessment</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Job Posting URL
          </label>

          <input
            type="url"
            name="jobLink"
            value={formData.jobLink}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Personal Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Referral details, application observations..."
            rows="3"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Application
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddApplicationForm;