import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Users,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Applications",
      path: "/applications",
      icon: BriefcaseBusiness
    },
    {
      name: "Interviews",
      path: "/interviews",
      icon: CalendarDays
    },
    {
      name: "Resumes",
      path: "/resumes",
      icon: FileText
    },
    {
      name: "Recruiters",
      path: "/recruiters",
      icon: Users
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        PlacementTracker
      </h1>

      <nav>
        <ul className="space-y-2">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );

          })}

        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;