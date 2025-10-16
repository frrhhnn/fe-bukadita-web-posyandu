"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  FileText,
} from "lucide-react";
import jsPDF from "jspdf";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Note {
  id: string;
  title: string;
  content: string;
  material: string;
  createdAt: Date;
  updatedAt: Date;
}

const FloatingNotes: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("bukadita-notes", []);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    material: "",
  });
  const [showGreeting, setShowGreeting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    noteId: string;
    noteTitle: string;
  }>({ show: false, noteId: "", noteTitle: "" });
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>(
    "bukadita-notes-welcome",
    false
  );
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key
      if (e.key === "Escape") {
        if (deleteConfirm.show) {
          cancelDeleteNote();
        } else if (showGreeting) {
          setShowGreeting(false);
        } else if (isDialogOpen) {
          setIsDialogOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }

      // Ctrl/Cmd + S to save note (when dialog is open)
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isDialogOpen) {
        e.preventDefault();
        // handleSaveNote will be called via the save button
      }

      // Ctrl/Cmd + N to add new note (when panel is open)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "n" &&
        isOpen &&
        !isDialogOpen
      ) {
        e.preventDefault();
        setEditingNote(null);
        setFormData({ title: "", content: "", material: "" });
        setIsDialogOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDialogOpen, deleteConfirm.show, showGreeting]);

  // Auto-show greeting for first-time visitors
  useEffect(() => {
    if (!hasSeenWelcome) {
      // Show greeting after a delay
      const timer = setTimeout(() => {
        setShowGreeting(true);
        setHasSeenWelcome(true);

        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowGreeting(false);
        }, 5000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSeenWelcome, setHasSeenWelcome]);

  // Save notes function (now simplified with custom hook)
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
  };

  // Handle greeting hover/touch - disabled for auto-show only
  const handleIconHover = () => {
    // Disabled - greeting only shows on first visit automatically
  };

  // Handle mobile touch for greeting - disabled
  const handleIconTouch = () => {
    // Disabled - greeting only shows on first visit automatically
  };

  // Handle manual close of greeting
  const handleCloseGreeting = () => {
    setShowGreeting(false);
  };

  // Handle greeting click to open notes panel
  const handleGreetingClick = () => {
    setShowGreeting(false);
    setIsOpen(true);
  };

  // Helper function for toast notifications
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    const toastDiv = document.createElement("div");
    toastDiv.textContent = message;
    toastDiv.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-[70] text-sm text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    document.body.appendChild(toastDiv);

    // Add fade in animation
    toastDiv.style.opacity = "0";
    toastDiv.style.transform = "translateX(100%)";
    toastDiv.style.transition = "all 0.3s ease";

    setTimeout(() => {
      toastDiv.style.opacity = "1";
      toastDiv.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toastDiv.style.opacity = "0";
      toastDiv.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(toastDiv)) {
          document.body.removeChild(toastDiv);
        }
      }, 300);
    }, 2700);
  };

  // Export notes to PDF
  const exportNotes = () => {
    if (notes.length === 0) {
      showToast("Tidak ada catatan untuk diekspor", "error");
      return;
    }

    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = 30;

      // Header
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("Catatan Bukadita - Posyandu", margin, yPosition);

      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Diekspor pada: ${new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        margin,
        yPosition
      );

      yPosition += 20;

      // Notes content
      notes.forEach((note, index) => {
        // Check if we need a new page
        if (yPosition > pdf.internal.pageSize.getHeight() - 40) {
          pdf.addPage();
          yPosition = 30;
        }

        // Note number and title
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        const titleText = `${index + 1}. ${note.title}`;
        pdf.text(titleText, margin, yPosition);
        yPosition += 8;

        // Material
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "italic");
        pdf.text(`Materi: ${note.material}`, margin, yPosition);
        yPosition += 8;

        // Content
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        const contentLines = pdf.splitTextToSize(note.content, maxWidth);
        pdf.text(contentLines, margin, yPosition);
        yPosition += contentLines.length * 5 + 5;

        // Date
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "italic");
        const dateText = `Dibuat: ${note.createdAt.toLocaleDateString(
          "id-ID"
        )} | Diupdate: ${note.updatedAt.toLocaleDateString("id-ID")}`;
        pdf.text(dateText, margin, yPosition);
        yPosition += 15;

        // Separator line
        if (index < notes.length - 1) {
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 10;
        }
      });

      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          `Halaman ${i} dari ${totalPages} - Bukadita Posyandu Learning Platform`,
          pageWidth / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      // Save PDF
      const fileName = `catatan-bukadita-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);

      showToast(`Catatan berhasil diekspor ke ${fileName}`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      showToast("Gagal mengekspor catatan ke PDF", "error");
    }
  };

  // Create or update note
  const handleSaveNote = async () => {
    // Validation
    if (!formData.title.trim()) {
      showToast("Judul catatan tidak boleh kosong!", "error");
      return;
    }
    if (!formData.content.trim()) {
      showToast("Isi catatan tidak boleh kosong!", "error");
      return;
    }
    if (!formData.material.trim()) {
      showToast("Nama materi tidak boleh kosong!", "error");
      return;
    }

    setIsLoading(true);

    try {
      const now = new Date();

      if (editingNote) {
        // Update existing note
        const updatedNotes = notes.map((note) =>
          note.id === editingNote.id
            ? { ...note, ...formData, updatedAt: now }
            : note
        );
        saveNotes(updatedNotes);
      } else {
        // Create new note
        const newNote: Note = {
          id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...formData,
          createdAt: now,
          updatedAt: now,
        };
        saveNotes([...notes, newNote]);
      }

      // Reset form
      setFormData({ title: "", content: "", material: "" });
      setEditingNote(null);
      setIsDialogOpen(false);

      // Show success message
      showToast(
        editingNote ? "Catatan berhasil diupdate" : "Catatan berhasil disimpan"
      );
    } catch (error) {
      showToast("Terjadi kesalahan saat menyimpan catatan!", "error");
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete note - show custom confirmation dialog
  const handleDeleteNote = (id: string, title: string) => {
    setDeleteConfirm({ show: true, noteId: id, noteTitle: title });
  };

  // Confirm delete note
  const confirmDeleteNote = () => {
    const updatedNotes = notes.filter(
      (note) => note.id !== deleteConfirm.noteId
    );
    saveNotes(updatedNotes);
    setDeleteConfirm({ show: false, noteId: "", noteTitle: "" });
    showToast("Catatan berhasil dihapus");
  };

  // Cancel delete note
  const cancelDeleteNote = () => {
    setDeleteConfirm({ show: false, noteId: "", noteTitle: "" });
  };

  // Edit note
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      material: note.material,
    });
    setIsDialogOpen(true);
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.material.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Floating Icon */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="relative">
          {/* Greeting Message */}
          <AnimatePresence>
            {showGreeting && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                onClick={handleGreetingClick}
                className="absolute bottom-16 right-0 bg-white shadow-lg rounded-lg p-3 sm:p-4 min-w-[200px] max-w-[260px] sm:min-w-[240px] sm:max-w-[280px] border border-gray-200 relative cursor-pointer hover:bg-gray-50 transition-colors mr-0 sm:mr-0"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseGreeting();
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X size={14} className="sm:w-3 sm:h-3" />
                </button>
                <div className="text-xs sm:text-sm text-gray-700 font-medium pr-7 sm:pr-6">
                  Hai para kader! Kalau butuh catatan klik aku ya
                </div>
                <div className="absolute -bottom-2 right-6 sm:right-4 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className={`w-14 h-14 sm:w-14 sm:h-14 bg-gradient-to-br from-[#578FCA] to-[#27548A] text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center ${
              showGreeting ? "animate-subtle-glow" : ""
            }`}
            aria-label="Buka Catatan"
          >
            <BookOpen size={22} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Notes Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-30 floating-notes-backdrop z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white floating-notes-panel z-50 overflow-hidden flex flex-col safe-area-inset"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="sm:w-5 sm:h-5" />
                  <h2 className="text-base sm:text-lg font-semibold">
                    Catatan Saya
                  </h2>
                </div>
                <div className="flex items-center gap-1">
                  {/* Export Button */}
                  <button
                    onClick={exportNotes}
                    title="Export ke PDF"
                    className="p-2.5 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors active:scale-95"
                    aria-label="Export ke PDF"
                  >
                    <FileText size={20} className="sm:w-[18px] sm:h-[18px]" />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Tutup"
                    className="p-2.5 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors active:scale-95"
                    aria-label="Tutup Panel"
                  >
                    <X size={20} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="p-3 sm:p-4 border-b bg-gray-50">
                <div className="relative mb-0">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notes List */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 notes-scrollbar">
                {filteredNotes.length === 0 ? (
                  <div className="text-center text-gray-500 py-8 sm:py-12">
                    <BookOpen
                      size={48}
                      className="mx-auto mb-4 text-gray-300"
                    />
                    <p className="text-sm sm:text-base">Belum ada catatan</p>
                    <p className="text-xs sm:text-sm mt-1">
                      Mulai buat catatan pertama Anda!
                    </p>
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ y: -2 }}
                      className="bg-white border border-gray-200 rounded-lg p-3 sm:p-3 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-sm flex-1 pr-2">
                          {note.title}
                        </h3>
                        <div className="flex gap-1.5 sm:gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleEditNote(note)}
                            className="p-2 sm:p-1 text-[#578FCA] hover:bg-blue-50 active:bg-blue-100 rounded transition-colors"
                            aria-label="Edit Catatan"
                          >
                            <Edit
                              size={16}
                              className="sm:w-[14px] sm:h-[14px]"
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteNote(note.id, note.title)
                            }
                            className="p-2 sm:p-1 text-red-500 hover:bg-red-50 active:bg-red-100 rounded transition-colors"
                            aria-label="Hapus Catatan"
                          >
                            <Trash2
                              size={16}
                              className="sm:w-[14px] sm:h-[14px]"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-[#578FCA] bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                        {note.material}
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-2">
                        {note.content}
                      </p>

                      <div className="text-xs text-gray-400">
                        {note.updatedAt.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Statistics */}
              {notes.length > 0 && (
                <div className="px-3 sm:px-4 py-2 bg-gray-50 border-t text-xs text-gray-600 text-center">
                  <span>
                    {filteredNotes.length} dari {notes.length} catatan
                  </span>
                </div>
              )}

              {/* Add Note Button */}
              <div className="p-3 sm:p-4 border-t bg-gray-50">
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setFormData({ title: "", content: "", material: "" });
                    setIsDialogOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white py-3 sm:py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
                  aria-label="Tambah Catatan Baru"
                >
                  <Plus size={20} className="sm:w-[18px] sm:h-[18px]" />
                  Tambah Catatan Baru
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Note Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDialogOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-30 z-[60]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-md bg-white rounded-lg shadow-2xl z-[60] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">
                  {editingNote ? "Edit Catatan" : "Tambah Catatan Baru"}
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-1">
                      Judul Catatan
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Masukkan judul catatan..."
                      className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-1">
                      Nama Materi
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      placeholder="Contoh: Posyandu Dasar, Gizi Balita, dll..."
                      className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-1">
                      Isi Catatan
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Tulis catatan Anda di sini..."
                      rows={5}
                      className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578FCA] focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveNote}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check size={18} className="sm:w-4 sm:h-4" />
                    )}
                    {isLoading
                      ? "Menyimpan..."
                      : editingNote
                      ? "Update"
                      : "Simpan"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDeleteNote}
              className="fixed inset-0 bg-black bg-opacity-30 z-[70]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-sm bg-white rounded-lg shadow-2xl z-[70]"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-3 sm:mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-center text-gray-900 mb-2">
                  Hapus Catatan
                </h3>

                <p className="text-xs sm:text-sm text-center text-gray-600 mb-5 sm:mb-6 px-2">
                  Apakah Anda yakin ingin menghapus catatan{" "}
                  <span className="font-medium">
                    &ldquo;{deleteConfirm.noteTitle}&rdquo;
                  </span>
                  ? Tindakan ini tidak dapat dibatalkan.
                </p>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={cancelDeleteNote}
                    className="flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDeleteNote}
                    className="flex-1 bg-red-600 text-white px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} className="sm:w-4 sm:h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNotes;
