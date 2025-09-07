export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-[#27548A]">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Active Sessions
          </h3>
          <p className="text-3xl font-bold text-[#27548A]">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Reports</h3>
          <p className="text-3xl font-bold text-[#27548A]">0</p>
        </div>
      </div>
    </div>
  );
}
