export default function UserPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Progress Pembelajaran
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#578FCA] h-2.5 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">0% Complete</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Materi Tersedia
          </h3>
          <p className="text-3xl font-bold text-[#578FCA]">0</p>
        </div>
      </div>
    </div>
  );
}
