const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Flight Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Example Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">Total Flights</p>
          <p className="text-2xl font-bold text-sky-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">Pending Points</p>
          <p className="text-2xl font-bold text-emerald-600">24,500</p>
        </div>
      </div>
      {/* This is where your fetch logic from useAirlines.ts would display data */}
    </div>
  );
};

export default Dashboard;