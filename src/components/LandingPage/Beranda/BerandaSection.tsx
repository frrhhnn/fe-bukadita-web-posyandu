"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function BerandaSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when component mounts
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section
      id="beranda"
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-blue-200/30"
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={0.8}
        glow={false}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-medium text-[#3674B5] font-poppins leading-tight">
          Lorem ipsum dolor sit amet,
          <br className="hidden sm:block" />
          <span className="block sm:inline"> consectetur adipiscing elit.</span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 sm:mb-10 lg:mb-12 text-sm sm:text-base lg:text-[16px] font-medium text-[#27548A] font-poppins max-w-2xl mx-auto px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-14 lg:mb-16 px-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-80 hover:transform hover:scale-105 flex items-center justify-center gap-2 rounded-[20px] bg-[#27548A] min-w-[140px]"
          >
            Masuk
            <span className="material-symbols-outlined text-lg">
              arrow_outward
            </span>
          </Link>
          <Link
            href="#kontak"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-80 hover:transform hover:scale-105 flex items-center justify-center gap-2 rounded-[20px] bg-[#578FCA] min-w-[140px]"
          >
            Hubungi Kami
            <span className="material-symbols-outlined text-lg">
              arrow_outward
            </span>
          </Link>
        </div>

        {/* Video Section */}
        <div className="relative mx-auto max-w-[1168px] px-4">
          <div className="relative overflow-hidden w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-[343px] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              muted
              loop
              autoPlay
              playsInline
            >
              <source src="/dummy/test.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Text Overlay - Right Aligned */}
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-6 lg:pr-8">
              <div className="text-right">
                <h3 className="text-white text-right font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] font-medium leading-tight">
                  Lorem ipsum dolor sit amet,
                  <br className="hidden sm:block" />
                  <span className="block sm:inline">
                    {" "}
                    consectetur adipiscing elit
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
