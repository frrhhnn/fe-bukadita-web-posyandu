import React from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function FiturSection() {
  return (
    <section id="fitur" className="relative py-20 bg-white overflow-hidden">
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
            Fitur Unggulan
          </h2>
          <p className="text-gray-600 text-lg font-poppins">
            Berbagai fitur yang memudahkan pembelajaran kader posyandu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#578FCA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#578FCA]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#27548A] mb-3 font-poppins">
              Pembelajaran Interaktif
            </h3>
            <p className="text-gray-600 font-poppins">
              Materi pembelajaran yang interaktif dan mudah dipahami untuk semua
              tingkatan
            </p>
          </div>

          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#578FCA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#578FCA]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#27548A] mb-3 font-poppins">
              Tracking Progress
            </h3>
            <p className="text-gray-600 font-poppins">
              Pantau perkembangan pembelajaran dan pencapaian kompetensi secara
              real-time
            </p>
          </div>

          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#578FCA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#578FCA]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#27548A] mb-3 font-poppins">
              Sertifikat Digital
            </h3>
            <p className="text-gray-600 font-poppins">
              Dapatkan sertifikat digital setelah menyelesaikan setiap modul
              pembelajaran
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
