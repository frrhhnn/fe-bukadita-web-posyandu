"use client"

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#176B87] text-white z-50">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1: Logo & Alamat */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Logo placeholder - bisa diganti dengan <Image> */}
              <Image
                src="/images/logo-putih.png"
                alt="Logo Bukadita"
                width={120}
                height={40}
              />
            </div>
            <p className="text-white leading-relaxed">
              Platform digital terpercaya untuk layanan kesehatan masyarakat dan pendataan posyandu di Indonesia.
            </p>
            <div className="space-y-2">
              <p className="text-white">
                H99F+VG8, Kopelma Darussalam, Syiah Kuala, Banda Aceh City, Aceh 24415
              </p>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white mb-3">Tautan Cepat</h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#home"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link
                    href="#maps"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Lokasi
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white mb-3">Kontak</h3>
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white" />
                <a
                  href="mailto:info@bukadita.com"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                >
                  info@bukadita.com
                </a>
              </div>

              {/* Telepon */}
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white" />
                <a
                  href="tel:+6281234567890"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                >
                  +62 812 3456 7890
                </a>
              </div>
            </div>

            {/* Sosial Media Icons */}
            <div className="pt-4">
              <p className="text-white font-medium mb-3">Ikuti Kami</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/30 mt-8 pt-6">
          <div className="text-center">
            <p className="text-white text-sm">
              © 2025 Bukadita. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

