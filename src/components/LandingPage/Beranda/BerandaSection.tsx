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
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-6 py-20 overflow-hidden"
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
        <h1
          className="mb-6"
          style={{
            color: "#3674B5",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit.
        </h1>

        {/* Subtitle */}
        <p
          className="mb-12"
          style={{
            color: "#27548A",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <Link
            href="/login"
            className="px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-80 hover:transform hover:scale-105 flex items-center gap-2"
            style={{
              borderRadius: "20px",
              background: "#27548A",
            }}
          >
            Masuk
            <span className="material-symbols-outlined text-lg">
              arrow_outward
            </span>
          </Link>
          <Link
            href="#kontak"
            className="px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-80 hover:transform hover:scale-105 flex items-center gap-2"
            style={{
              borderRadius: "20px",
              background: "#578FCA",
            }}
          >
            Hubungi Kami
            <span className="material-symbols-outlined text-lg">
              arrow_outward
            </span>
          </Link>
        </div>

        {/* Video Section */}
        <div className="relative mx-auto" style={{ maxWidth: "1168px" }}>
          <div
            className="relative overflow-hidden"
            style={{
              width: "100%",
              height: "343px",
              borderRadius: "20px",
              maxWidth: "1168px",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              style={{
                width: "100%",
                height: "343px",
                flexShrink: 0,
                borderRadius: "20px",
              }}
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
            <div className="absolute inset-0 flex items-center justify-end pr-8">
              <div className="text-right">
                <h3
                  style={{
                    color: "#FFF",
                    textAlign: "right",
                    fontFamily: "Poppins",
                    fontSize: "32px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Lorem ipsum dolor sit amet,
                  <br />
                  consectetur adipiscing elit
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
