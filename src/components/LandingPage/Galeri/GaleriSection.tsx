import React from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function GaleriSection() {
  const galleryItems = [
    {
      id: 1,
      title: "Pelatihan Kader Posyandu",
      size: "large", // 767x345
    },
    {
      id: 2,
      title: "Kegiatan Pembelajaran",
      size: "small", // 373x345
    },
    {
      id: 3,
      title: "Sertifikasi Kader",
      size: "small", // 373x345
    },
    {
      id: 4,
      title: "Workshop Digital",
      size: "small", // 373x345
    },
    {
      id: 5,
      title: "Praktik Lapangan",
      size: "small", // 373x345
    },
  ];

  return (
    <section
      id="galeri"
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
        {/* Title Section - Align Right */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-right">
          <h2 className="mb-4">
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Galeri{" "}
            </span>
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] italic font-medium leading-tight">
              Posyandu
            </span>
            <br />
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Kopelma
            </span>
          </h2>
        </div>

        {/* Responsive Bento Grid Layout */}
        <div className="flex flex-col gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Mobile: Stack all images vertically */}
          <div className="block lg:hidden space-y-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="w-full h-48 sm:h-56 rounded-2xl bg-[#D9D9D9] flex items-center justify-center"
              >
                <div className="text-center">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-2 sm:mb-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 font-medium font-poppins text-sm sm:text-base">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Original bento layout */}
          <div className="hidden lg:flex lg:flex-col lg:gap-6">
            {/* First Row - Large image on left, 2 small images on right */}
            <div className="flex gap-6 justify-center">
              {/* Large Image */}
              <div className="w-[767px] h-[345px] flex-shrink-0 rounded-2xl bg-[#D9D9D9] flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-500 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 font-semibold font-poppins">
                    {galleryItems[0].title}
                  </span>
                </div>
              </div>

              {/* Two Small Images Stacked */}
              <div className="flex flex-col gap-6">
                <div className="w-[373px] h-[165px] flex-shrink-0 rounded-2xl bg-[#D9D9D9] flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 text-gray-500 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500 font-medium font-poppins text-sm">
                      {galleryItems[1].title}
                    </span>
                  </div>
                </div>

                <div className="w-[373px] h-[165px] flex-shrink-0 rounded-2xl bg-[#D9D9D9] flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 text-gray-500 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500 font-medium font-poppins text-sm">
                      {galleryItems[2].title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - 3 equal-sized images */}
            <div className="flex gap-6 justify-center">
              <div className="w-[373px] h-[250px] flex-shrink-0 rounded-2xl bg-[#D9D9D9] flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-gray-500 mx-auto mb-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 font-medium font-poppins">
                    {galleryItems[3].title}
                  </span>
                </div>
              </div>

              <div className="w-[373px] h-[250px] flex-shrink-0 rounded-2xl bg-[#D9D9D9] flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-gray-500 mx-auto mb-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 font-medium font-poppins">
                    {galleryItems[4].title}
                  </span>
                </div>
              </div>

              <div className="w-[373px] h-[250px] flex-shrink-0 rounded-2xl bg-[#D9D9D9] flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-gray-500 mx-auto mb-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 font-medium font-poppins">
                    Workshop Posyandu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
