export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#27548A] text-white min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </div>
          <nav className="mt-8">
            {/* Navigation items akan ditambahkan nanti */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
