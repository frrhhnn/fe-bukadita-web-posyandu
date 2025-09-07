"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulasi proses login/callback
    const processCallback = async () => {
      try {
        // Simulasi delay untuk proses authentication
        await new Promise((resolve) => setTimeout(resolve, 2000));

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
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#27548A] mb-4"></div>

        {/* Loading Text */}
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Sedang memproses login...
        </h1>

        <p className="text-gray-600">Mohon tunggu sebentar</p>
      </div>
    </div>
  );
}
