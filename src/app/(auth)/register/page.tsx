"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    posyandu: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    }

    if (!formData.posyandu.trim()) {
      newErrors.posyandu = "Nama posyandu wajib diisi";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simulasi API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Handle register logic here
        console.log("Register data:", formData);

        // Redirect ke halaman sukses atau login
        // router.push("/login?registered=true");
      } catch (error) {
        console.error("Register error:", error);
        setErrors({ general: "Terjadi kesalahan saat mendaftar" });
      }
    }

    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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
          Daftar Akun Baru
        </h1>
        <p className="text-[#578FCA] font-medium font-poppins">
          Bergabunglah dengan komunitas kader posyandu
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
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
              errors.name
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-[#578FCA]"
            }`}
            placeholder="Masukkan nama lengkap Anda"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.name}
            </p>
          )}
        </div>

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

        {/* Phone Input */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
          >
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
              errors.phone
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-[#578FCA]"
            }`}
            placeholder="Masukkan nomor telepon Anda"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Posyandu Input */}
        <div>
          <label
            htmlFor="posyandu"
            className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
          >
            Nama Posyandu
          </label>
          <input
            type="text"
            id="posyandu"
            name="posyandu"
            value={formData.posyandu}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
              errors.posyandu
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-[#578FCA]"
            }`}
            placeholder="Masukkan nama posyandu tempat Anda bertugas"
          />
          {errors.posyandu && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.posyandu}
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
            placeholder="Masukkan password (min. 6 karakter)"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
          >
            Konfirmasi Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
              errors.confirmPassword
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-[#578FCA]"
            }`}
            placeholder="Ulangi password Anda"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-[#27548A] focus:ring-[#27548A] border-gray-300 rounded mt-1"
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-3 block text-sm text-[#27548A] font-medium font-poppins"
            >
              Saya menyetujui{" "}
              <Link
                href="/terms"
                className="text-[#578FCA] hover:text-[#27548A] underline"
              >
                Syarat dan Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privacy"
                className="text-[#578FCA] hover:text-[#27548A] underline"
              >
                Kebijakan Privasi
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.agreeToTerms}
            </p>
          )}
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
            "Daftar Akun"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 font-poppins">atau</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600 font-poppins">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#27548A] hover:text-[#578FCA] transition hover:underline"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
