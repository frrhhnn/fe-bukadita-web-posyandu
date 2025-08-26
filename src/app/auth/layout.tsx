"use client"

import { usePathname } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Tentukan konten branding berdasarkan halaman
  const isLoginPage = pathname === "/auth/login";
  const isRegisterPage = pathname === "/auth/register";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Kolom Kiri - Branding */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-8 text-white">
        {/* Logo */}
        <div className="mb-8">
          {/* Placeholder logo - bisa diganti dengan <Image> */}
          <div className="text-4xl md:text-6xl font-bold mb-4">
            Bukadita
          </div>
          <div className="text-lg md:text-xl text-gray-300 text-center max-w-md">
            {isLoginPage && "Selamat datang kembali! Masuk ke akun Anda untuk melanjutkan."}
            {isRegisterPage && "Bergabunglah dengan platform pembelajaran kader posyandu terdepan."}
            {!isLoginPage && !isRegisterPage && "Platform digital untuk kader posyandu Indonesia."}
          </div>
        </div>

        {/* Additional branding content */}
        <div className="text-center max-w-md text-gray-400">
          <p className="text-sm">
            Bukadita (Buku Kader Digital) - Sistem Pembelajaran Mandiri Kader Posyandu Kopelma Darussalam
          </p>
        </div>
      </div>

      {/* Kolom Kanan - Form */}
      <div className="bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
