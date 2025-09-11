"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi sederhana
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle login logic here
      console.log("Login data:", formData);

      // Redirect ke dashboard (implementasi sebenarnya)
      // router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Terjadi kesalahan saat login" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo-default.svg"
            alt="BukaDita Logo"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>
        <h1 className="text-3xl font-bold text-[#27548A] mb-2 font-poppins">
          Masuk ke Akun
        </h1>
        <p className="text-[#578FCA] font-medium font-poppins">
          Selamat datang kembali di BukaDita
        </p>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{errors.general}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-[#578FCA]"
            }`}
            placeholder="Masukkan email Anda"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
              errors.password
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-[#578FCA]"
            }`}
            placeholder="Masukkan password Anda"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#27548A] focus:ring-[#27548A] border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-[#27548A] font-medium font-poppins"
            >
              Ingat saya
            </label>
          </div>
          <Link
            href="/reset-password"
            className="text-sm text-[#578FCA] hover:text-[#27548A] transition font-medium font-poppins hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white font-semibold rounded-xl hover:from-[#1e3f6f] hover:to-[#4681c4] focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2 transition-all duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 font-poppins">atau</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600 font-poppins">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#27548A] hover:text-[#578FCA] transition hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
