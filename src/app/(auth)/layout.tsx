"use client";

import { usePathname } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Tentukan konten branding berdasarkan halaman
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isResetPasswordPage = pathname === "/reset-password";
  const isCallbackPage = pathname === "/callback";

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Kolom Kiri - Branding */}
      <div className="bg-gradient-to-br from-[#27548A] to-[#578FCA] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 text-white min-h-[200px] md:min-h-screen">
        {/* Logo */}
        <div className="mb-4 md:mb-8 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 font-poppins">
            Bukadita
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 text-center max-w-sm md:max-w-md px-2">
            {isLoginPage &&
              "Selamat datang kembali! Masuk ke akun Anda untuk melanjutkan."}
            {isRegisterPage &&
              "Bergabunglah dengan platform pembelajaran kader posyandu terdepan."}
            {isResetPasswordPage &&
              "Atur ulang password Anda dengan mudah dan aman."}
            {isCallbackPage &&
              "Memproses autentikasi Anda, mohon tunggu sebentar."}
            {!isLoginPage &&
              !isRegisterPage &&
              !isResetPasswordPage &&
              !isCallbackPage &&
              "Platform digital untuk kader posyandu Indonesia."}
          </div>
        </div>

        {/* Additional branding content */}
        <div className="text-center max-w-sm md:max-w-md text-blue-200 px-2">
          <p className="text-xs sm:text-sm font-poppins">
            Bukadita (Buku Kader Digital) - Sistem Pembelajaran Mandiri Kader
            Posyandu Kopelma Darussalam
          </p>
        </div>
      </div>

      {/* Kolom Kanan - Form */}
      <div className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 flex-1">
        <div className="w-full max-w-sm sm:max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
