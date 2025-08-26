"use client"

import { usePathname } from "next/navigation";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah halaman auth
  const isAuthPage = pathname?.startsWith("/auth");

  // Jika halaman auth, return children tanpa navbar dan footer
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Jika bukan halaman auth, return dengan navbar dan footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
