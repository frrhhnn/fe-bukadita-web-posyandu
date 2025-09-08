import React from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { InfiniteMovingCards } from "@/components/ui";

export default function FiturSection() {
  const features = [
    {
      icon: (
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ),
      title: "Pembelajaran Interaktif",
      description:
        "Materi pembelajaran yang interaktif dan mudah dipahami untuk semua tingkatan kader posyandu.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: "Tracking Progress",
      description:
        "Pantau perkembangan pembelajaran dan pencapaian kompetensi secara real-time dengan mudah.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
      title: "Sertifikat Digital",
      description:
        "Dapatkan sertifikat digital setelah menyelesaikan setiap modul pembelajaran dengan baik.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      ),
      title: "Komunitas Kader",
      description:
        "Bergabung dengan komunitas kader posyandu untuk berbagi pengalaman dan ilmu.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
      ),
      title: "Konsultasi Expert",
      description:
        "Konsultasi langsung dengan para ahli kesehatan dan gizi untuk panduan terbaik.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      ),
      title: "Analytics Dashboard",
      description:
        "Dashboard analitik komprehensif untuk memantau performa pembelajaran.",
    },
  ];

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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-left">
            <span
              style={{
                color: "#27548A",
                fontFamily: "Poppins",
                fontSize: "64px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Fitur{" "}
            </span>
            <span
              style={{
                color: "#27548A",
                fontFamily: "Poppins",
                fontSize: "64px",
                fontStyle: "italic",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Interaktif
            </span>
            <br />
            <span
              style={{
                color: "#27548A",
                fontFamily: "Poppins",
                fontSize: "64px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Bukadita
            </span>
          </h2>
        </div>

        {/* Infinite Moving Feature Cards */}
        <div className="mt-16">
          <InfiniteMovingCards
            features={features}
            direction="left"
            speed="fast"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}
