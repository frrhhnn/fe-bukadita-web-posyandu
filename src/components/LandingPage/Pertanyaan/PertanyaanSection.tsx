"use client";

import React, { useState } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function PertanyaanSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Pembelajaran yang Disesuaikan",
      answer:
        "Materi pembelajaran Bukadita dirancang khusus untuk kader posyandu dengan pendekatan yang mudah dipahami dan dapat diterapkan langsung di lapangan.",
    },
    {
      id: 2,
      question: "Sistem Tracking Progress yang Komprehensif",
      answer:
        "Bukadita menyediakan sistem pelacakan pembelajaran yang detail, memungkinkan kader untuk memantau perkembangan dan pencapaian mereka secara real-time.",
    },
    {
      id: 3,
      question: "Sertifikasi Digital Terakreditasi",
      answer:
        "Setiap penyelesaian modul akan mendapatkan sertifikat digital yang diakui dan dapat digunakan untuk pengembangan karir sebagai kader posyandu.",
    },
    {
      id: 4,
      question: "Komunitas dan Dukungan Expert",
      answer:
        "Platform menyediakan akses ke komunitas kader dan konsultasi langsung dengan para ahli kesehatan untuk mendapatkan panduan terbaik.",
    },
    {
      id: 5,
      question: "Interface yang User-Friendly",
      answer:
        "Bukadita dirancang dengan antarmuka yang intuitif dan mudah digunakan, bahkan untuk pengguna yang belum terbiasa dengan teknologi digital.",
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section
      id="pertanyaan"
      className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden"
    >
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section - Align Left */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="mb-4 text-left">
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Kenapa{" "}
            </span>
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] italic font-medium leading-tight">
              Bukadita
            </span>
            <br />
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Berbeda
            </span>
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-6 w-full">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#27548A] font-poppins text-base sm:text-lg lg:text-xl leading-tight pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#578FCA] transform transition-transform flex-shrink-0 ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openFaq === faq.id && (
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 font-poppins text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
