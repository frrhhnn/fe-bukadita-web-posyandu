import { FaCalendar } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div>
      <div className="bg-gradient-to-l from-[#27548A] to-[#1C3C6D] p-6 rounded-lg mb-6 text-white">
        <h1 className="text-3xl font-semibold mb-2 text-white">Selamat Datang, Admin!</h1>
        <p className="text-slate-300">Ini adalah dashboard admin untuk mengelola aplikasi.</p>

        <div className="flex items-center mt-4">
          <FaCalendar className="w-5 h-5 text-white" />
          <span className="ml-2 text-sm">
            {new Date().toLocaleString("id-ID", {
              weekday: "long",   // Senin, Selasa, ...
              day: "numeric",    // 1, 2, 3, ...
              month: "long",     // Januari, Februari, ...
              year: "numeric",   // 2025
              hour: "2-digit",   // 07
              minute: "2-digit", // 30
            })}
          </span>
        </div>
      </div>

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
