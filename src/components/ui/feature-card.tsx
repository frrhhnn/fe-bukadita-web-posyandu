import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="flex flex-col items-center p-8 text-center text-white"
      style={{
        width: "371px",
        height: "345px",
        flexShrink: 0,
        borderRadius: "50px",
        background: "#578FCA",
      }}
    >
      {/* Icon */}
      <div className="mb-6">{icon}</div>

      {/* Title - Poppins SemiBold */}
      <h3
        className="mb-4"
        style={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "normal",
        }}
      >
        {title}
      </h3>

      {/* Description - Poppins Medium Italic */}
      <p
        style={{
          fontFamily: "Poppins",
          fontWeight: 500,
          fontStyle: "italic",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>
    </div>
  );
}
