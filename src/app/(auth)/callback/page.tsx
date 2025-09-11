"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulasi proses login/callback
    const processCallback = async () => {
      try {
        // Simulasi delay untuk proses authentication
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Redirect ke dashboard atau home setelah berhasil
        router.push("/");
      } catch (error) {
        console.error("Callback error:", error);
        // Redirect ke login jika gagal
        router.push("/login");
      }
    };

    processCallback();
  }, [router]);

  return (
    <div className="w-full text-center">
      {/* Logo */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <Image
          src="/images/logo-default.svg"
          alt="BukaDita Logo"
          width={80}
          height={80}
          className="w-16 h-16 sm:w-20 sm:h-20"
        />
      </div>

      {/* Loading Content */}
      <div className="space-y-4 sm:space-y-6">
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#578FCA]/20 border-t-[#27548A] rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-r-[#578FCA] rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#27548A] font-poppins">
            Sedang memproses login...
          </h1>
          <p className="text-sm sm:text-base text-[#578FCA] font-medium font-poppins px-4">
            Mohon tunggu sebentar, kami sedang mengatur akun Anda
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-2 sm:space-y-3 max-w-xs mx-auto">
          <div className="flex items-center space-x-2 text-[#27548A]">
            <div className="w-2 h-2 bg-[#27548A] rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium font-poppins">
              Memverifikasi kredensial
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[#578FCA]">
            <div className="w-2 h-2 bg-[#578FCA] rounded-full animate-pulse animation-delay-300"></div>
            <span className="text-xs sm:text-sm font-medium font-poppins">
              Menyiapkan dashboard
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse animation-delay-500"></div>
            <span className="text-xs sm:text-sm font-medium font-poppins">
              Hampir selesai
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
