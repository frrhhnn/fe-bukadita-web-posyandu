"use client"

import { LogOut, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="w-full h-20 bg-gradient-to-l from-[#27548A] to-[#1C3C6D] shadow-sm">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Dashboard Admin</h1>
          <p className="text-xs text-slate-300">Bukadita - Buku Kader Digital Posyandu Kopelma Darussalam</p>
        </div>

        <div className="flex items-center gap-5">
          <div>
            <span className="text-sm text-slate-300">Admin</span>
            <User className="inline-block w-5 h-5 text-slate-300 ml-2" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}