"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Users, Baby, PersonStanding, ChartPie, BookOpen, ListChecks, ChevronDown, ChevronRight} from "lucide-react";
import { FaBlind } from "react-icons/fa";
import { MdPregnantWoman } from "react-icons/md";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openBayi, setOpenBayi] = useState(true);
  const [openRemaja, setOpenRemaja] = useState(true);
  const [openIbuHamil, setOpenIbuHamil] = useState(true);
  const [openDewasaLansia, setOpenDewasaLansia] = useState(true);

  // normalize path (remove trailing slash) and determine active state
  const normalize = (p?: string) => (p || "").replace(/\/+$/, "");
  const isActive = (href: string) => {
    const current = normalize(pathname);
    const target = normalize(href);
    // make the root admin link active only on exact '/admin'
    if (target === "/admin") return current === "/admin";
    return current.startsWith(target);
  };

  const itemBase = 'flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150';
  const itemActive = 'bg-white/10 text-white';
  const itemHover = 'hover:bg-white/6';

  return (
    <aside className="w-80 bg-gradient-to-t from-[#27548A] to-[#1C3C6D] text-slate-100 shadow-lg min-h-screen flex flex-col">
      <div className="h-20 flex items-center justify-center bg-gradient-to-r from-[#27548A] to-[#1C3C6D] border-b border-white/10">
        <Image
          src="/images/logo-putih.png"
          alt="Bukadita Logo"
          width={100}
          height={30} />
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <nav className="space-y-3">
          <Link href="/admin" className={`${itemBase} ${isActive('/admin') ? itemActive : itemHover}`}>
            <ChartPie className="w-5 h-5 opacity-90" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link href="/admin/pengguna" className={`${itemBase} ${isActive('/admin/pengguna') ? itemActive : itemHover}`}>
            <Users className="w-5 h-5 opacity-90" />
            <span className="font-medium">Kelola Pengguna</span>
          </Link>

          <div className="pt-2">
            <button onClick={() => setOpenBayi(v => !v)} className="w-full flex items-center justify-between font-medium text-slate-100 px-3 py-2 rounded-md hover:bg-white/6">
              <div className="flex items-center gap-3">
                <Baby className="w-5 h-5 opacity-90" />
                <span>Bayi & Balita</span>
              </div>
              <span className="ml-2">{openBayi ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
            </button>

            {openBayi && (
              <div className="mt-2 pl-6 flex flex-col gap-1">
                <Link href="/admin/bayi-balita/materi" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/bayi-balita/materi') ? itemActive : itemHover}`}>
                  <BookOpen className="w-4 h-4 opacity-80" />
                  <span>Materi</span>
                </Link>

                <Link href="/admin/bayi-balita/kuis" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/bayi-balita/kuis') ? itemActive : itemHover}`}>
                  <ListChecks className="w-4 h-4 opacity-80" />
                  <span>Kuis</span>
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button onClick={() => setOpenRemaja(v => !v)} className="w-full flex items-center justify-between font-medium text-slate-100 px-3 py-2 rounded-md hover:bg-white/6">
              <div className="flex items-center gap-3">
                <PersonStanding className="w-6 h-6 opacity-90" />
                <span>Usia Sekolah & Remaja</span>
              </div>
              <span className="ml-2">{openRemaja ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
            </button>

            {openRemaja && (
              <div className="mt-2 pl-6 flex flex-col gap-1">
                <Link href="/admin/sekolah-remaja/materi" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/sekolah-remaja/materi') ? itemActive : itemHover}`}>
                  <BookOpen className="w-4 h-4 opacity-80" />
                  <span>Materi</span>
                </Link>

                <Link href="/admin/sekolah-remaja/kuis" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/sekolah-remaja/kuis') ? itemActive : itemHover}`}>
                  <ListChecks className="w-4 h-4 opacity-80" />
                  <span>Kuis</span>
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button onClick={() => setOpenIbuHamil(v => !v)} className="w-full flex items-center justify-between font-medium text-slate-100 px-3 py-2 rounded-md hover:bg-white/6">
              <div className="flex items-center gap-3">
                <MdPregnantWoman className="w-7 h-7 opacity-90" />
                <span>Ibu Hamil & Menyusui</span>
              </div>
              <span className="ml-2">{openIbuHamil ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
            </button>

            {openIbuHamil && (
              <div className="mt-2 pl-6 flex flex-col gap-1">
                <Link href="/admin/hamil-menyusui/materi" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/hamil-menyusui/materi') ? itemActive : itemHover}`}>
                  <BookOpen className="w-4 h-4 opacity-80" />
                  <span>Materi</span>
                </Link>

                <Link href="/admin/hamil-menyusui/kuis" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/hamil-menyusui/kuis') ? itemActive : itemHover}`}>
                  <ListChecks className="w-4 h-4 opacity-80" />
                  <span>Kuis</span>
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button onClick={() => setOpenDewasaLansia(v => !v)} className="w-full flex items-center justify-between font-medium text-slate-100 px-3 py-2 rounded-md hover:bg-white/6">
              <div className="flex items-center gap-3">
                <FaBlind className="w-6 h-6 opacity-90" />
                <span>Dewasa & Lansia</span>
              </div>
              <span className="ml-2">{openDewasaLansia ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
            </button>

            {openDewasaLansia && (
              <div className="mt-2 pl-6 flex flex-col gap-1">
                <Link href="/admin/dewasa-lansia/materi" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/dewasa-lansia/materi') ? itemActive : itemHover}`}>
                  <BookOpen className="w-4 h-4 opacity-80" />
                  <span>Materi</span>
                </Link>

                <Link href="/admin/dewasa-lansia/kuis" className={`${itemBase} text-slate-100 text-sm ${isActive('/admin/dewasa-lansia/kuis') ? itemActive : itemHover}`}>
                  <ListChecks className="w-4 h-4 opacity-80" />
                  <span>Kuis</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
