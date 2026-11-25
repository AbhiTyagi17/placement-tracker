import { Search, Bell, User } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Placement Overview
        </h2>
      </div>

      <div className="flex items-center gap-5">

        <button className="text-slate-500 hover:text-blue-600">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">

          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <User size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Abhi
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;