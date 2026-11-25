function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>
        </div>

        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} />
        </div>

      </div>

    </div>
  );
}

export default StatCard;