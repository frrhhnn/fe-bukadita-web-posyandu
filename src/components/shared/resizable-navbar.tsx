"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// Mobile Menu Component
function MobileMenu({
  open,
  onClose,
  triggerRef,
  menu,
  activeSection,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  menu: NavItem[];
  activeSection: string;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    return () => {
      trigger?.focus?.();
      prev?.focus?.();
    };
  }, [open, triggerRef]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      id="mobile-menu"
      className={`fixed inset-0 z-60`}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        ref={panelRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-80 bg-[#27548A] h-full p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex">
            <Image
              src="/images/logo-default.svg"
              alt="Logo Bukadita"
              width={75}
              height={22}
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="Tutup menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-8" aria-label="Mobile primary">
          <ul className="flex flex-col gap-4">
            {menu.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={item.name}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.href);
                      onClose();
                    }}
                    className={`block text-base font-medium py-3 px-4 rounded-md transition-all w-full text-left ${
                      isActive
                        ? "text-white bg-white/20 border-l-4 border-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full text-center px-4 py-3 rounded-md text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-all"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className="w-full text-center px-4 py-3 rounded-md text-sm font-medium text-[#27548A] bg-white hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Daftar
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

type NavItem = { name: string; href: string };

const MENU: NavItem[] = [
  { name: "Beranda", href: "#beranda" },
  { name: "Fitur", href: "#fitur" },
  { name: "Galeri", href: "#galeri" },
  { name: "Pertanyaan", href: "#pertanyaan" },
  { name: "Kontak", href: "#kontak" },
];

// Helper function for smooth scrolling
const handleSmoothScroll = (href: string) => {
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear existing timeout
      clearTimeout(timeoutId);

      // Throttle scroll events to improve performance
      timeoutId = setTimeout(() => {
        const sections = MENU.map((item) => item.href.replace("#", ""));
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check if we're at the bottom of the page (kontak section)
        if (scrollPosition + windowHeight >= documentHeight - 50) {
          setActiveSection("kontak");
          return;
        }

        let currentSection = "";

        // Loop through sections in reverse order to prioritize later sections
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollPosition;

            // If the section is visible in viewport (with offset)
            if (scrollPosition + 150 >= elementTop) {
              currentSection = section;
              break;
            }
          }
        }

        if (currentSection) {
          setActiveSection(currentSection);
        }
      }, 16); // ~60fps throttling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return activeSection;
}

// Resizable Navbar Component inspired by Aceternity UI
export default function ResizableNavbar() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const activeSection = useActiveSection();
  const lastUpdateRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (current: number) => {
    if (typeof current === "number") {
      const now = Date.now();
      // Throttle updates to improve performance
      if (now - lastUpdateRef.current < 16) return; // ~60fps
      lastUpdateRef.current = now;

      // Set scrolled state
      setIsScrolled(current > 0.05);

      // Keep navbar always visible
      setVisible(true);
    }
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <>
      <motion.nav
        animate={{
          scale: isScrolled ? 0.95 : 1,
          y: visible ? 0 : -100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full transition-all will-change-transform ${
          isScrolled
            ? "mt-4 rounded-full bg-[#27548A]/95 backdrop-blur-md shadow-lg border border-white/10"
            : "bg-transparent"
        }`}
        style={{
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        <div className={`${isScrolled ? "px-6 lg:px-8" : "px-6 lg:px-8"}`}>
          <div
            className={`flex items-center justify-between ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center"
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="inline-flex items-center">
                {/* Logo ketika tidak di-scroll (default) */}
                <Image
                  src="/images/logo-default.svg"
                  alt="Logo Bukadita"
                  width={isScrolled ? 60 : 75}
                  height={isScrolled ? 18 : 22}
                  className={`transition-all duration-200 ${
                    isScrolled ? "hidden" : "block"
                  }`}
                />
                {/* Logo ketika di-scroll (putih) */}
                <Image
                  src="/images/logo-putih.svg"
                  alt="Logo Bukadita"
                  width={isScrolled ? 60 : 75}
                  height={isScrolled ? 18 : 22}
                  className={`transition-all duration-200 ${
                    isScrolled ? "block" : "hidden"
                  }`}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-2">
              {MENU.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.href);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative z-10 ${
                      isActive
                        ? isScrolled
                          ? "text-white bg-white/20 relative z-20"
                          : "text-[#578FCA] bg-[#578FCA]/10 relative z-20"
                        : isScrolled
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-[#578FCA]/80 hover:text-[#578FCA] hover:bg-[#578FCA]/10"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className={`absolute inset-0 rounded-full z-0 ${
                          isScrolled ? "bg-white/20" : "bg-[#578FCA]/10"
                        }`}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop Action Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-white/80 hover:text-white"
                      : "text-[#578FCA]/80 hover:text-[#578FCA]"
                  }`}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isScrolled
                      ? "text-[#27548A] bg-white hover:bg-white/90 focus:ring-white"
                      : "text-white bg-[#578FCA] hover:bg-[#578FCA]/90 focus:ring-[#578FCA]"
                  }`}
                >
                  Daftar
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                ref={triggerRef}
                className={`md:hidden p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isScrolled
                    ? "text-white hover:bg-white/10 focus:ring-white"
                    : "text-[#578FCA] hover:bg-[#578FCA]/10 focus:ring-[#578FCA]"
                }`}
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Buka menu"
                onClick={() => setOpen((v) => !v)}
              >
                <motion.svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  animate={{ rotate: open ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </motion.svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        menu={MENU}
        activeSection={activeSection}
      />
    </>
  );
}
