import React from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function GaleriSection() {
  const galleryItems = [
    {
      id: 1,
      title: "Pelatihan Kader Posyandu",
      image: "/images/bg-poster.jpg",
    },
    { id: 2, title: "Kegiatan Pembelajaran", image: "/images/bg-poster.jpg" },
    { id: 3, title: "Sertifikasi Kader", image: "/images/bg-poster.jpg" },
    { id: 4, title: "Workshop Digital", image: "/images/bg-poster.jpg" },
    { id: 5, title: "Praktik Lapangan", image: "/images/bg-poster.jpg" },
    { id: 6, title: "Evaluasi Pembelajaran", image: "/images/bg-poster.jpg" },
  ];

  return (
    <section id="galeri" className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-gray-200/25"
        width={28}
        height={28}
        cx={1}
        cy={1}
        cr={0.7}
        glow={false}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#27548A] mb-4 font-poppins">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 text-lg font-poppins">
            Dokumentasi kegiatan pembelajaran dan pelatihan kader posyandu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-[#578FCA]/20 to-[#27548A]/20 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-[#27548A] mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[#27548A] font-semibold font-poppins">
                    Gambar {item.id}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#27548A] mb-2 font-poppins">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-poppins">
                  Dokumentasi kegiatan pembelajaran dan pelatihan
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
