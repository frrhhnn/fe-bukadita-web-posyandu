"use client"

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Inline MobileMenu here to keep mobile styles in the same file (no external UI libs)
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

      <div
        ref={panelRef}
        className="absolute top-0 right-0 left-0 bg-white h-full p-6 shadow-lg transform transition-transform duration-200"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex">
            <Image
              src="/images/logo-hitam.png"
              alt="Logo Bukadita"
              width={120}
              height={40}
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Tutup menu"
          >
            <svg className="h-6 w-6 text-[#86B6F6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                  <Link
                    href={item.href}
                    className={`block text-base font-medium py-2 px-3 rounded-md ${isActive
                        ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                        : "text-gray-800 hover:bg-gray-50"
                      }`}
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/auth/login" className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-transparent hover:ring-1 hover:ring-gray-200">
            Masuk
          </Link>

          <Link href="/auth/register" className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

type NavItem = { name: string; href: string };

const MENU: NavItem[] = [
  { name: "Beranda", href: "#home" },
  { name: "Tentang", href: "#about" },
  { name: "Lokasi", href: "#maps" },
];

function useIsScrolled() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sentinel = document.getElementById("hero-sentinel");

    if (sentinel) {
      const obs = new IntersectionObserver(
        ([entry]) => setIsScrolled(!entry.isIntersecting),
        { root: null, threshold: 0 }
      );
      obs.observe(sentinel);
      return () => obs.disconnect();
    }

    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isScrolled;
}

// Custom hook for active section detection
function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["home", "about", "features", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}

export default function Navbar() {
  const activeSection = useActiveSection();
  const isScrolled = useIsScrolled();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  const navClasses = [
    "fixed top-0 inset-x-0 z-50 transition-all",
    "h-14 md:h-16",
    isScrolled
      ? "bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-sm text-black text-md font-medium"
      : "bg-transparent border-b border-[#B4D4FF]/30",
  ].join(" ");

  return (
    <>
      <a
        href="#content"
        className={`absolute pt-12 left-4 top-4 z-60 -translate-y-12 focus:translate-y-0 focus:px-3 focus:py-2 focus:bg-white focus:shadow rounded-md transition-transform text-sm font-medium text-gray-800 sr-only focus:not-sr-only`}
      >
        Skip to content
      </a>

      <header className={navClasses}>
        <nav
          aria-label="Primary"
          className={`h-full`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="h-full flex items-center justify-between">
              {/* Left: Logo */}
              <div className="flex items-center flex-1 md:flex-none">
                <Link href="/" className="inline-flex items-center gap-3">
                  {/* Logo before scroll */}
                  <Image 
                    src="/images/logo-putih.png" 
                    alt="Logo Bukadita"
                    width={120}
                    height={32}
                    className={`${isScrolled ? "hidden" : "inline-flex"}`} 
                  />

                  {/* Logo after scroll */}
                  <Image 
                    src="/images/logo-hitam.png" 
                    alt="Logo Bukadita"
                    width={120}
                    height={32}
                    className={`${isScrolled ? "inline-flex" : "hidden"}`} 
                  />
                </Link>
              </div>

              {/* Middle: Nav links (desktop) */}
              <div className="hidden md:flex md:flex-1 md:justify-center">
                <ul className="flex items-center gap-8">
                  {MENU.map((item) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`text-md font-medium hover:text-[#176B87] px-3 py-2 rounded-md ${isScrolled ? "text-gray-900" : "text-white"}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: Actions & Mobile Hamburger */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="/auth/login"
                    className={`px-3 py-1.5 rounded-md font-medium ${isScrolled ? "text-gray-700" : "text-white"} border border-transparent hover:ring-1 hover:ring-[#176B87]`}
                  >
                    Masuk
                  </Link>

                  <Link
                    href="/auth/register"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#176B87] hover:bg-[#0f4c75] transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ boxShadow: "0 0 0 3px rgba(245,158,11,0.08)" }}
                  >
                    Daftar
                  </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                  ref={triggerRef}
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-controls="mobile-menu"
                  aria-expanded={open}
                  aria-label="Buka menu"
                  onClick={() => setOpen((v) => !v)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

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

