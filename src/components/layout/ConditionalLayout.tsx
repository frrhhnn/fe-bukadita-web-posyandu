"use client";

import { usePathname } from "next/navigation";
import ResizableNavbar from "../navbar/resizable-navbar";
import Footer from "../footer/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah halaman auth atau dashboard
  const isAuthPage =
    pathname?.includes("login") ||
    pathname?.includes("register") ||
    pathname?.includes("callback");
  const isDashboardPage =
    pathname?.includes("admin") || pathname?.includes("user");

  // Jika halaman auth atau dashboard, return children tanpa navbar dan footer
  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  // Jika bukan halaman auth/dashboard, return dengan navbar dan footer
  return (
    <>
      <ResizableNavbar />
      {children}
      <Footer />
    </>
  );
}
