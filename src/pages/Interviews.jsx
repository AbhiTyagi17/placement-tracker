
import { useState } from "react";
import { Plus, Calendar, UserRound, Building2 } from "lucide-react";

import AddInterviewForm from "../components/AddInterviewForm";

function Interviews({ interviews, applications, onAddInterview }) {
  const [showForm, setShowForm] = useState(false);

  const getCompanyName = (applicationId) => {
    const application = applications.find(
      (app) => app.id === applicationId
    );

    return application?.company || "Unknown Company";
  };

  const handleAdd = (newInterview) => {
    onAddInterview(newInterview);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Interviews
          </h1>
          <p className="text-slate-500 mt-1">
            Track your interview rounds and performance.
          </p>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg"
        >
          <Plus size={18} />
          Add Interview
        </button>
      </div>

      {showForm && (
        <AddInterviewForm
          applications={applications}
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-4">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-white p-5 rounded-xl border border-slate-200"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div>
                <h2 className="font-semibold text-lg text-slate-800">
                  {interview.roundName}
                </h2>

                <p className="text-blue-600 text-sm mt-1">
                  {getCompanyName(interview.applicationId)}
                </p>
              </div>

              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm h-fit">
                {interview.outcome}
              </span>
            </div>

            <div className="flex flex-wrap gap-5 mt-4 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <Calendar size={16} />
                {interview.date || "Date not specified"}
              </p>

              <p className="flex items-center gap-2">
                <UserRound size={16} />
                {interview.interviewer || "Interviewer not specified"}
              </p>

              <p className="flex items-center gap-2">
                <Building2 size={16} />
                {getCompanyName(interview.applicationId)}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="font-medium text-slate-700">
                Questions Asked
              </h3>

              {interview.questions.length > 0 ? (
                <ul className="list-disc pl-5 mt-2 text-sm text-slate-600 space-y-1">
                  {interview.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 mt-2">
                  No questions recorded.
                </p>
              )}
            </div>

            <div className="mt-5">
              <h3 className="font-medium text-slate-700">
                Performance Notes
              </h3>

              <p className="text-sm text-slate-600 mt-2">
                {interview.performance || "No notes added."}
              </p>
            </div>
          </div>
        ))}

        {interviews.length === 0 && (
          <div className="bg-white rounded-xl border p-10 text-center text-slate-500">
            No interviews added yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default Interviews;
