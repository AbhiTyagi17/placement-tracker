
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Calendar, ExternalLink } from "lucide-react";

function ApplicationDetails({ applications }) {
  // Read the application ID from the URL
  const { id } = useParams();

  const navigate = useNavigate();

  // Find the application matching the URL ID
  const application = applications.find(
    (app) => String(app.id) === id
  );

  // Handle invalid application ID
  if (!application) {
    return (
      <div className="bg-white p-8 rounded-xl border text-center">
        <h2 className="text-xl font-semibold text-slate-800">
          Application Not Found
        </h2>

        <p className="text-slate-500 mt-2">
          The application you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/applications")}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Application Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
              <Building2 size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {application.company}
              </h1>

              <p className="text-slate-500 mt-1">
                {application.role}
              </p>
            </div>
          </div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {application.status}
          </span>
        </div>

      </div>

      {/* Application Information */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">

        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Application Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-slate-500">Company</p>
            <p className="font-medium mt-1">{application.company}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Job Role</p>
            <p className="font-medium mt-1">{application.role}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Application Date</p>
            <p className="font-medium mt-1 flex items-center gap-2">
              <Calendar size={16} />
              {application.date || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium mt-1">{application.status}</p>
          </div>

        </div>

        {application.jobLink && (
          <div className="mt-6">
            <a
              href={application.jobLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              View Job Posting
              <ExternalLink size={16} />
            </a>
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm text-slate-500">Notes</p>
          <p className="mt-1 text-slate-700">
            {application.notes || "No notes added yet."}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ApplicationDetails;
