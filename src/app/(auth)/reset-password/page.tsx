"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (!formData.email.trim()) {
      setErrors({ email: "Email wajib diisi" });
      setIsLoading(false);
      return;
    }

    try {
      // Simulasi API call untuk mengirim kode verifikasi
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Sending reset code to:", formData.email);
      setStep("code");
    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({ general: "Terjadi kesalahan saat mengirim kode verifikasi" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (!formData.verificationCode.trim()) {
      setErrors({ verificationCode: "Kode verifikasi wajib diisi" });
      setIsLoading(false);
      return;
    }

    try {
      // Simulasi API call untuk verifikasi kode
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Verifying code:", formData.verificationCode);
      setStep("password");
    } catch (error) {
      console.error("Code verification error:", error);
      setErrors({ general: "Kode verifikasi tidak valid" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password minimal 6 karakter";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulasi API call untuk reset password
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Password reset successful");
      // Redirect ke login dengan success message
      // router.push("/login?reset=success");
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({ general: "Terjadi kesalahan saat mengatur ulang password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const getStepContent = () => {
    switch (step) {
      case "email":
        return (
          <>
            <h1 className="text-3xl font-bold text-[#27548A] mb-2 font-poppins">
              Lupa Password?
            </h1>
            <p className="text-[#578FCA] font-medium font-poppins mb-8">
              Masukkan email Anda untuk menerima kode verifikasi
            </p>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">
                  {errors.general}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmitEmail} className="space-y-6">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white font-semibold rounded-xl hover:from-[#1e3f6f] hover:to-[#4681c4] focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2 transition-all duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mengirim Kode...
                  </>
                ) : (
                  "Kirim Kode Verifikasi"
                )}
              </button>
            </form>
          </>
        );

      case "code":
        return (
          <>
            <h1 className="text-3xl font-bold text-[#27548A] mb-2 font-poppins">
              Verifikasi Kode
            </h1>
            <p className="text-[#578FCA] font-medium font-poppins mb-8">
              Masukkan kode 6 digit yang telah dikirim ke email Anda
            </p>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">
                  {errors.general}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmitCode} className="space-y-6">
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
                >
                  Kode Verifikasi
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-center text-lg tracking-widest ${
                    errors.verificationCode
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-[#578FCA]"
                  }`}
                  placeholder="000000"
                />
                {errors.verificationCode && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    {errors.verificationCode}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white font-semibold rounded-xl hover:from-[#1e3f6f] hover:to-[#4681c4] focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2 transition-all duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Memverifikasi...
                  </>
                ) : (
                  "Verifikasi Kode"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-[#578FCA] hover:text-[#27548A] transition font-medium font-poppins hover:underline"
                >
                  Kirim ulang kode
                </button>
              </div>
            </form>
          </>
        );

      case "password":
        return (
          <>
            <h1 className="text-3xl font-bold text-[#27548A] mb-2 font-poppins">
              Password Baru
            </h1>
            <p className="text-[#578FCA] font-medium font-poppins mb-8">
              Buat password baru untuk akun Anda
            </p>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">
                  {errors.general}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmitPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
                >
                  Password Baru
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#27548A]/20 focus:border-[#27548A] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 ${
                    errors.newPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-[#578FCA]"
                  }`}
                  placeholder="Masukkan password baru (min. 6 karakter)"
                />
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-[#27548A] mb-2 font-poppins"
                >
                  Konfirmasi Password Baru
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
                  placeholder="Ulangi password baru"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

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
                  "Atur Ulang Password"
                )}
              </button>
            </form>
          </>
        );

      default:
        return null;
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
        {getStepContent()}
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 font-poppins">atau</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <p className="text-sm text-gray-600 font-poppins">
          Ingat password Anda?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#27548A] hover:text-[#578FCA] transition hover:underline"
          >
            Kembali ke Login
          </Link>
        </p>
      </div>
    </div>
  );
}
