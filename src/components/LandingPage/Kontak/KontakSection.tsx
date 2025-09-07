import React from "react";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function KontakSection() {
  return (
    <section
      id="kontak"
      className="relative py-20 bg-[#27548A] overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-blue-400/15"
        width={30}
        height={30}
        cx={1}
        cy={1}
        cr={0.9}
        glow={true}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-poppins">
            Hubungi Kami
          </h2>
          <p className="text-blue-100 text-lg font-poppins">
            Siap membantu perjalanan pembelajaran Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 font-poppins">
              Informasi Kontak
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#578FCA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 font-poppins">
                    Alamat
                  </h4>
                  <p className="text-blue-100 font-poppins">
                    Kopelma Darussalam
                    <br />
                    Banda Aceh, Aceh
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#578FCA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 font-poppins">
                    Email
                  </h4>
                  <p className="text-blue-100 font-poppins">
                    bukadita@kopelma.ac.id
                    <br />
                    info@bukadita.ac.id
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#578FCA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 font-poppins">
                    Telepon
                  </h4>
                  <p className="text-blue-100 font-poppins">
                    (0651) 123-4567
                    <br />
                    +62 812-3456-7890
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-8 p-6 bg-[#578FCA]/20 rounded-lg">
              <h4 className="text-white font-semibold mb-4 font-poppins">
                Jam Operasional
              </h4>
              <div className="space-y-2 text-blue-100 font-poppins">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>08:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Libur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 font-poppins">
              Kirim Pesan
            </h3>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-medium mb-2 font-poppins"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-[#578FCA] focus:border-transparent outline-none transition font-poppins"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2 font-poppins"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-[#578FCA] focus:border-transparent outline-none transition font-poppins"
                  placeholder="Masukkan email Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-white font-medium mb-2 font-poppins"
                >
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-[#578FCA] focus:border-transparent outline-none transition font-poppins"
                  placeholder="Subjek pesan"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-2 font-poppins"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-[#578FCA] focus:border-transparent outline-none transition font-poppins resize-vertical"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#578FCA] text-white font-semibold rounded-lg hover:bg-white hover:text-[#27548A] transition-all duration-300 font-poppins"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <p className="text-blue-100 mb-6 font-poppins">
            Atau mulai pembelajaran sekarang juga
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-[#27548A] font-semibold rounded-lg hover:bg-blue-50 transition-colors font-poppins"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#27548A] transition-colors font-poppins"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
