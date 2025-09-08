import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-6 sm:p-8 text-center text-white w-[280px] sm:w-[320px] lg:w-[371px] h-[280px] sm:h-[320px] lg:h-[345px] flex-shrink-0 rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] bg-[#578FCA]">
      {/* Icon */}
      <div className="mb-4 sm:mb-6">{icon}</div>

      {/* Title - Poppins SemiBold */}
      <h3 className="mb-3 sm:mb-4 font-poppins font-semibold text-lg sm:text-xl lg:text-2xl leading-tight">
        {title}
      </h3>

      {/* Description - Poppins Medium Italic */}
      <p className="font-poppins font-medium italic text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
