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
        <div className="text-right mb-16">
          <h2 className="text-[64px] font-bold text-white mb-4 font-poppins">
            Hubungi Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 font-poppins">
              Ikuti Kami
            </h3>

            <div className="space-y-4">
              <a
                href="https://instagram.com/bukadita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-[#578FCA]/20 rounded-lg hover:bg-[#578FCA]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold font-poppins">
                    Instagram
                  </h4>
                  <p className="text-blue-100 text-sm font-poppins">
                    @bukadita_official
                  </p>
                </div>
              </a>

              <a
                href="https://youtube.com/@bukadita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-[#578FCA]/20 rounded-lg hover:bg-[#578FCA]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold font-poppins">
                    YouTube
                  </h4>
                  <p className="text-blue-100 text-sm font-poppins">
                    Bukadita Channel
                  </p>
                </div>
              </a>

              <a
                href="https://facebook.com/bukadita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-[#578FCA]/20 rounded-lg hover:bg-[#578FCA]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold font-poppins">
                    Facebook
                  </h4>
                  <p className="text-blue-100 text-sm font-poppins">
                    Bukadita Posyandu
                  </p>
                </div>
              </a>

              <a
                href="https://twitter.com/bukadita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-[#578FCA]/20 rounded-lg hover:bg-[#578FCA]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold font-poppins">
                    X (Twitter)
                  </h4>
                  <p className="text-blue-100 text-sm font-poppins">
                    @bukadita_id
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 font-poppins">
              Link Cepat
            </h3>

            <div className="space-y-4">
              <Link
                href="/beranda"
                className="block text-blue-100 hover:text-white transition-colors font-poppins"
              >
                Beranda
              </Link>
              <Link
                href="/fitur"
                className="block text-blue-100 hover:text-white transition-colors font-poppins"
              >
                Fitur
              </Link>
              <Link
                href="/galeri"
                className="block text-blue-100 hover:text-white transition-colors font-poppins"
              >
                Galeri
              </Link>
              <Link
                href="/pertanyaan"
                className="block text-blue-100 hover:text-white transition-colors font-poppins"
              >
                FAQ
              </Link>
              <Link
                href="/register"
                className="block text-blue-100 hover:text-white transition-colors font-poppins"
              >
                Daftar
              </Link>
              <Link
                href="/login"
                className="block text-blue-100 hover:text-white transition-colors font-poppins"
              >
                Masuk
              </Link>
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
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-8 border-t border-blue-400/20">
          <div className="text-center">
            <p className="text-blue-100 mb-4 font-poppins">
              © 2025 Bukadita. Semua hak cipta dilindungi.
            </p>
            <p className="text-blue-100/80 text-sm font-poppins">
              Dikembangkan dengan ❤️ untuk meningkatkan kualitas kesehatan
              posyandu di Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
