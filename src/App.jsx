import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Interviews from "./pages/Interviews";

import ApplicationDetails from "./pages/ApplicationDetails";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

const initialApplications = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer Intern",
    date: "2026-11-20",
    status: "Interview",
    jobLink: "",
    notes: "",
  },
  {
    id: 2,
    company: "Amazon",
    role: "SDE Intern",
    date: "2026-11-18",
    status: "Applied",
    jobLink: "",
    notes: "",
  },
  {
    id: 3,
    company: "Microsoft",
    role: "Software Engineer",
    date: "2026-11-15",
    status: "Rejected",
    jobLink: "",
    notes: "",
  },
  {
    id: 4,
    company: "Adobe",
    role: "Frontend Developer Intern",
    date: "2026-11-12",
    status: "Selected",
    jobLink: "",
    notes: "",
  },
];

function App() {
  const [applications, setApplications] = useState(initialApplications);

  // CREATE
  const handleAddApplication = (newApplication) => {
    setApplications((prev) => [newApplication, ...prev]);
  };

  const [interviews, setInterviews] = useState([]);

const handleAddInterview = (newInterview) => {
  setInterviews((prev) => [newInterview, ...prev]);
};
  // UPDATE
  const handleUpdateApplication = (updatedApplication) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app,
      ),
    );
  };

  // DELETE
  const handleDeleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard
              applications={applications}
              onAddApplication={handleAddApplication}
            />
          </DashboardLayout>
        }
      />

      <Route
        path="/applications"
        element={
          <DashboardLayout>
            <Applications
              applications={applications}
              onUpdate={handleUpdateApplication}
              onDelete={handleDeleteApplication}
            />
          </DashboardLayout>
        }
      />

      <Route
  path="/interviews"
  element={
    <DashboardLayout>
      <Interviews
        interviews={interviews}
        applications={applications}
        onAddInterview={handleAddInterview}
      />
    </DashboardLayout>
  }
/>

      <Route
        path="/applications/:id"
        element={
          <DashboardLayout>
            <ApplicationDetails applications={applications} />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;
