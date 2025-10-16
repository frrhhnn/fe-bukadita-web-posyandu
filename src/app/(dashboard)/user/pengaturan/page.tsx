"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, AlertTriangle } from "lucide-react";
import { UserNavbar, MobileBottomNavbar } from "@/components/User/Beranda";
import {
  SettingsHeader,
  SettingsNavigation,
  ProfileSection,
  SecuritySection,
} from "@/components/User/Pengaturan";
import NotificationSection from "@/components/User/Pengaturan/NotificationSectionNew";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui";

export default function PengaturanPage() {
  const router = useRouter();
  const authCtx = useAuth();
  const { user, logout, isLoading, profilePending, upsertProfile } = authCtx;
  const toast = useToast();

  // All hooks must be declared first before any conditional logic
  // Profile state - Initialize with user data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    joinDate: "",
    role: "",
    backendLoaded: false,
  });

  // Removed backendStatus; no direct legacy fetch to backend profile endpoints

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI state
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [editMode, setEditMode] = useState({
    profile: false,
    password: false,
    completeProfile: false,
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [savingCompletion, setSavingCompletion] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [completionSuccess, setCompletionSuccess] = useState<string | null>(
    null
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Initialize profile data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.profile?.full_name || user.email || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        birthDate: user.profile?.date_of_birth || "",
      }));
    }
  }, [
    user?.id,
    user?.email,
    user?.profile?.full_name,
    user?.profile?.phone,
    user?.profile?.address,
    user?.profile?.date_of_birth,
  ]);

  // Separate useEffect for loading full profile (runs only once on mount if needed)
  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      if (user && authCtx.loadFullProfile) {
        // Only load if some profile fields are missing
        const needsFullProfile =
          !user.profile?.address || !user.profile?.date_of_birth;

        if (needsFullProfile && mounted) {
          console.log("[PengaturanPage] Loading full profile...");
          try {
            await authCtx.loadFullProfile();
          } catch (error) {
            console.error("[PengaturanPage] Error loading profile:", error);
          }
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency - only run once on mount

  // Removed legacy fetch from ProfileService; rely on context 'user' and upsertProfile

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#578FCA]/20 border-t-[#27548A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#27548A] font-semibold">
            Memuat data pengguna...
          </p>
        </div>
      </div>
    );
  }

  // Return null if no user (will redirect)
  if (!user) {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfilePhoto = async () => {
    if (!selectedFile) {
      toast.warning("Pilih foto terlebih dahulu");
      return;
    }

    // Additional file validation
    console.log("📸 File to upload:", {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      lastModified: selectedFile.lastModified,
    });

    if (selectedFile.size === 0) {
      toast.error("File kosong atau tidak valid");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    try {
      setUploadingPhoto(true);
      toast.info("Mengupload foto profil... 📤");

      // Import ProfileService
      const { ProfileService } = await import("@/services/userProfileService");

      console.log("🚀 Starting photo upload...");
      const response = await ProfileService.uploadProfilePhoto(selectedFile);
      console.log("📝 Upload response:", response);
      console.log("🔗 Photo URL from backend:", response.data?.photo_url);

      if (response.data && !response.error) {
        // Update user profile URL in context
        if (authCtx.updateProfileWithNew) {
          await authCtx.updateProfileWithNew({
            profil_url: response.data.photo_url,
          });
        }

        toast.success("✅ Foto profil berhasil diupload!");
        setSelectedFile(null);
        setSelectedImage(null);

        // Reload profile to get updated photo URL
        if (authCtx.loadFullProfile) {
          await authCtx.loadFullProfile();
        }
      } else {
        // Handle specific errors
        if (response.code === "FILE_MISSING") {
          toast.error("❌ File tidak ditemukan");
        } else if (response.code === "PROFILE_NOT_FOUND") {
          toast.error("❌ Profil tidak ditemukan");
        } else if (response.message?.includes("size")) {
          toast.error("❌ Ukuran file terlalu besar (max 5MB)");
        } else {
          toast.error(response.message || "❌ Gagal upload foto");
        }
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error uploading photo:", err);

      // Handle different error types
      if (err.message?.includes("fetch") || err.message?.includes("network")) {
        toast.error("❌ Koneksi gagal. Periksa internet Anda.");
      } else if (err.message?.includes("size")) {
        toast.error("❌ File terlalu besar");
      } else {
        toast.error("❌ Gagal upload foto. Silakan coba lagi.");
      }
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profileData.name?.trim()) {
      toast.warning("Nama wajib diisi");
      return;
    }
    try {
      const result = await upsertProfile({
        full_name: profileData.name.trim(),
        phone: profileData.phone || undefined,
        address: profileData.address || undefined,
        date_of_birth: profileData.birthDate || undefined,
      });
      if (result.success) {
        setEditMode({ ...editMode, profile: false });
        toast.success("Profil berhasil diperbarui");
      } else {
        toast.error(result.error || "Gagal memperbarui profil");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Gagal menyimpan profil. Silakan coba lagi.");
    }
  };

  const handleChangePassword = async () => {
    try {
      // Validate passwords
      if (!passwordData.currentPassword) {
        toast.warning("Password saat ini wajib diisi!");
        return;
      }

      if (!passwordData.newPassword) {
        toast.warning("Password baru wajib diisi!");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.warning("Password baru dan konfirmasi password tidak cocok!");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        toast.warning("Password baru minimal 6 karakter!");
        return;
      }

      // Import ProfileService
      const { ProfileService } = await import("@/services/userProfileService");

      // Show loading state
      toast.info("Mengubah password...");

      // Call API to change password
      const response = await ProfileService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (!response.error) {
        // Reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setEditMode({ ...editMode, password: false });

        // Show success message
        toast.success("Password berhasil diubah! ✅");
      } else {
        // Show specific error message
        if (response.code === "INVALID_CURRENT_PASSWORD") {
          toast.error("❌ Password saat ini salah!");
        } else if (response.message?.includes("password")) {
          toast.error(response.message);
        } else {
          toast.error("Gagal mengubah password. Silakan coba lagi.");
        }
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error changing password:", err);

      // Handle different types of errors
      if (err.message?.includes("fetch") || err.message?.includes("network")) {
        toast.error("❌ Koneksi gagal. Periksa internet Anda.");
      } else if (err.message?.includes("password")) {
        toast.error(err.message);
      } else {
        toast.error("❌ Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout from AuthContext
      logout();
      setShowLogoutModal(false);

      // Redirect to landing page
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Gagal logout. Silakan coba lagi.");
    }
  };

  const handleDeleteAccount = () => {
    // Delete account logic here
    setShowDeleteModal(false);
    // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      <UserNavbar activeMenu="pengaturan" />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 pb-28 md:pb-8">
        <SettingsHeader />

        <SettingsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          profilePending={profilePending}
        />

        <div className="max-w-4xl mx-auto">
          {activeTab === "profile" && (
            <ProfileSection
              user={user}
              profileData={profileData}
              setProfileData={setProfileData}
              editMode={editMode}
              setEditMode={setEditMode}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleImageUpload={handleImageUpload}
              handleSaveProfile={handleSaveProfile}
              handleSaveProfilePhoto={handleSaveProfilePhoto}
              selectedFile={selectedFile}
              uploadingPhoto={uploadingPhoto}
              profilePending={profilePending}
              upsertProfile={upsertProfile}
              savingCompletion={savingCompletion}
              setSavingCompletion={setSavingCompletion}
              completionError={completionError}
              setCompletionError={setCompletionError}
              completionSuccess={completionSuccess}
              setCompletionSuccess={setCompletionSuccess}
            />
          )}

          {activeTab === "security" && (
            <SecuritySection
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              showPasswords={showPasswords}
              setShowPasswords={setShowPasswords}
              editMode={editMode}
              setEditMode={setEditMode}
              handleChangePassword={handleChangePassword}
            />
          )}

          {activeTab === "notifications" && <NotificationSection />}
        </div>

        {/* Logout Section - Always Visible */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-4 flex items-center justify-center gap-3">
                <LogOut className="w-6 h-6 text-[#578FCA]" />
                Keluar dari Akun
              </h2>
              <p className="text-[#578FCA]/70 mb-6 text-sm sm:text-base">
                Anda akan keluar dari akun dan diarahkan kembali ke halaman
                login
              </p>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-sm sm:text-base"
              >
                <LogOut className="w-5 h-5" />
                Keluar dari Akun
              </button>
            </div>
          </div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
              <div className="text-center">
                <LogOut className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#27548A] mb-2">
                  Keluar dari Akun?
                </h3>
                <p className="text-[#578FCA]/70 mb-6">
                  Apakah Anda yakin ingin keluar dari akun?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-3 sm:py-2 bg-orange-500 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-orange-600 text-sm sm:text-base min-h-[44px]"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
              <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#27548A] mb-2">
                  Hapus Akun Permanen?
                </h3>
                <p className="text-[#578FCA]/70 mb-6">
                  Tindakan ini tidak dapat dibatalkan. Semua data Anda akan
                  dihapus permanen.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-3 sm:py-2 bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 text-sm sm:text-base min-h-[44px]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileBottomNavbar activeMenu="pengaturan" />
    </div>
  );
}
