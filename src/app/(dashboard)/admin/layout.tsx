"use client"

import { AdminSidebar, AdminHeader } from "@/components/Admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
