"use client";

import React, { useEffect, useRef } from "react";
import { FeatureCard } from "./feature-card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface InfiniteMovingCardsProps {
  features: Feature[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}

export function InfiniteMovingCards({
  features,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getAnimationDuration = () => {
    switch (speed) {
      case "fast":
        return "15s"; // Dipercepat dari 20s ke 15s
      case "slow":
        return "50s"; // Dipercepat dari 80s ke 50s
      default:
        return "25s"; // Dipercepat dari 40s ke 25s
    }
  };

  const animationDirection = direction === "left" ? "normal" : "reverse";

  useEffect(() => {
    if (containerRef.current) {
      const scrollerInner =
        containerRef.current.querySelector(".scroller__inner");
      if (scrollerInner) {
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .infinite-scroll {
          animation: scrollLeft ${getAnimationDuration()} linear infinite;
          animation-direction: ${animationDirection};
        }
        
        .infinite-scroll:hover {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative z-20 w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        }}
      >
        <div className="scroller__inner flex gap-8 py-4 infinite-scroll">
          {features.map((feature, idx) => (
            <div key={idx} className="flex-shrink-0">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
