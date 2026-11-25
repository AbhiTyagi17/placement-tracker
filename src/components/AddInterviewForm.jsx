
import { useState } from "react";

function AddInterviewForm({applications ,onAdd, onCancel }) {
  const [formData, setFormData] = useState({
	applicationId: "",
    roundName: "",
    date: "",
    interviewer: "",
    questions: "",
    performance: "",
    outcome: "Pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.roundName.trim()) {
      alert("Please enter the interview round name.");
      return;
    }

    onAdd({
      ...formData,
      questions: formData.questions
        .split("\n")
        .map((question) => question.trim())
        .filter(Boolean),
      id: Date.now()
    });

    setFormData({
      roundName: "",
      date: "",
      interviewer: "",
      questions: "",
      performance: "",
      outcome: "Pending"
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border border-slate-200 space-y-5"
    >
      <h2 className="text-lg font-semibold text-slate-800">
        Add Interview Round
      </h2>

	  <div>
  <label className="block text-sm mb-2">Company Application *</label>

  <select
    name="applicationId"
    value={formData.applicationId}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
    required
  >
    <option value="">Select application</option>

    {applications.map((app) => (
      <option key={app.id} value={app.id}>
        {app.company} - {app.role}
      </option>
    ))}
  </select>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm mb-2">Round Name *</label>
          <input
            name="roundName"
            value={formData.roundName}
            onChange={handleChange}
            placeholder="Technical Interview"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Interview Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Interviewer</label>
          <input
            name="interviewer"
            value={formData.interviewer}
            onChange={handleChange}
            placeholder="Interviewer name"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Outcome</label>
          <select
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Pending</option>
            <option>Passed</option>
            <option>Rejected</option>
            <option>On Hold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">
          Questions Asked (one question per line)
        </label>
        <textarea
          name="questions"
          value={formData.questions}
          onChange={handleChange}
          rows="4"
          placeholder={"Explain closures in JavaScript\nWhat is the virtual DOM?"}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Performance Notes</label>
        <textarea
          name="performance"
          value={formData.performance}
          onChange={handleChange}
          rows="3"
          placeholder="What went well? What should you improve?"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Interview
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border px-5 py-2 rounded-lg hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddInterviewForm;
