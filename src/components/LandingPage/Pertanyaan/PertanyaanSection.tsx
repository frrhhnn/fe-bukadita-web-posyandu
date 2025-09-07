"use client";

import React, { useState } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function PertanyaanSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Apa itu Bukadita?",
      answer:
        "Bukadita (Buku Kader Digital) adalah sistem pembelajaran mandiri untuk kader posyandu di Kopelma Darussalam yang dirancang untuk meningkatkan kualitas pelayanan kesehatan masyarakat.",
    },
    {
      id: 2,
      question: "Siapa yang bisa menggunakan sistem ini?",
      answer:
        "Sistem ini diperuntukkan bagi kader posyandu, tenaga kesehatan, dan masyarakat yang ingin belajar tentang kesehatan ibu dan anak serta manajemen posyandu.",
    },
    {
      id: 3,
      question: "Apakah ada sertifikat setelah menyelesaikan pembelajaran?",
      answer:
        "Ya, Anda akan mendapatkan sertifikat digital setelah menyelesaikan seluruh modul pembelajaran dan lulus evaluasi yang disediakan.",
    },
    {
      id: 4,
      question: "Bagaimana cara mengakses materi pembelajaran?",
      answer:
        "Setelah mendaftar dan login, Anda dapat mengakses semua materi pembelajaran melalui dashboard user. Materi disusun secara bertahap dari tingkat dasar hingga lanjutan.",
    },
    {
      id: 5,
      question: "Apakah pembelajaran ini gratis?",
      answer:
        "Ya, platform Bukadita menyediakan pembelajaran gratis untuk semua kader posyandu dan masyarakat yang ingin meningkatkan pengetahuan tentang kesehatan.",
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section
      id="pertanyaan"
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-blue-100/30"
        width={26}
        height={26}
        cx={1}
        cy={1}
        cr={0.8}
        glow={false}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#27548A] mb-4 font-poppins">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-600 text-lg font-poppins">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#27548A] font-poppins">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[#578FCA] transform transition-transform ${
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
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600 font-poppins leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 font-poppins">
            Masih ada pertanyaan lain?
          </p>
          <a
            href="#kontak"
            className="inline-flex items-center px-6 py-3 bg-[#578FCA] text-white rounded-lg hover:bg-[#27548A] transition-colors font-poppins"
          >
            Hubungi Kami
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
