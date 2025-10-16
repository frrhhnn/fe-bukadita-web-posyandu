"use client";

import { Bell, Clock, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NotificationSectionProps {}

export default function NotificationSection({}: NotificationSectionProps) {
  const toast = useToast();
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [reminderTime, setReminderTime] = useState("09:00");
  const [lastNotification, setLastNotification] = useState<string | null>(null);

  // Check notification permission on mount
  useEffect(() => {
    try {
      if ("Notification" in window) {
        setPermission(Notification.permission);

        // Load settings from localStorage
        const saved = localStorage.getItem("learningReminder");
        if (saved) {
          const data = JSON.parse(saved);
          setNotificationEnabled(data.enabled || false);
          setReminderTime(data.time || "09:00");
          setLastNotification(data.lastSent || null);
        }
      } else {
        toast.warning("Browser Anda tidak mendukung notifikasi web");
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
      toast.error("Gagal memuat pengaturan notifikasi");
    }
  }, [toast]);

  // Setup daily notification check
  useEffect(() => {
    if (!notificationEnabled || permission !== "granted") return;

    const checkAndSendNotification = () => {
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);
      const today = now.toDateString();

      // Check if notification already sent today
      if (lastNotification === today) {
        console.log("📅 Notifikasi sudah dikirim hari ini");
        return;
      }

      // Check if current time matches reminder time (within 1 minute tolerance)
      if (now.getHours() === hours && now.getMinutes() === minutes) {
        sendLearningReminder();
        setLastNotification(today);

        // Save to localStorage
        localStorage.setItem(
          "learningReminder",
          JSON.stringify({
            enabled: true,
            time: reminderTime,
            lastSent: today,
          })
        );
      }
    };

    // Check every minute
    const interval = setInterval(checkAndSendNotification, 60000);

    // Check immediately on load
    checkAndSendNotification();

    return () => clearInterval(interval);
  }, [notificationEnabled, permission, reminderTime, lastNotification]);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Browser Anda tidak mendukung notifikasi web");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        setNotificationEnabled(true);
        localStorage.setItem(
          "learningReminder",
          JSON.stringify({
            enabled: true,
            time: reminderTime,
            lastSent: null,
          })
        );

        toast.success("Notifikasi berhasil diaktifkan! ✅");

        // Send test notification
        sendLearningReminder();
      } else if (result === "denied") {
        toast.error(
          "Izin notifikasi ditolak. Aktifkan di pengaturan browser Anda."
        );
      } else {
        toast.warning("Izin notifikasi dibatalkan");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error("Gagal meminta izin notifikasi. Silakan coba lagi.");
    }
  };

  const sendLearningReminder = () => {
    if (Notification.permission !== "granted") {
      toast.warning("Izin notifikasi belum diberikan");
      return;
    }

    try {
      const notification = new Notification("Waktunya Belajar! 📚", {
        body: "Jangan lupa untuk melanjutkan pembelajaran Posyandu Anda hari ini!",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-96x96.png",
        tag: "daily-learning-reminder",
        requireInteraction: false,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        window.location.href = "/user/beranda";
      };

      notification.onerror = () => {
        toast.error(
          "Gagal mengirim notifikasi. Periksa pengaturan browser Anda."
        );
      };

      console.log("✅ Notifikasi pembelajaran terkirim!");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(
        "Gagal mengirim notifikasi. Browser mungkin memblokir notifikasi."
      );
    }
  };

  const toggleNotification = () => {
    try {
      if (!notificationEnabled) {
        // Enable notification
        if (permission !== "granted") {
          requestPermission();
        } else {
          setNotificationEnabled(true);
          localStorage.setItem(
            "learningReminder",
            JSON.stringify({
              enabled: true,
              time: reminderTime,
              lastSent: lastNotification,
            })
          );
          toast.success("Pengingat belajar diaktifkan ✅");
        }
      } else {
        // Disable notification
        setNotificationEnabled(false);
        localStorage.setItem(
          "learningReminder",
          JSON.stringify({
            enabled: false,
            time: reminderTime,
            lastSent: lastNotification,
          })
        );
        toast.info("Pengingat belajar dinonaktifkan");
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
      toast.error("Gagal mengubah pengaturan notifikasi");
    }
  };

  const handleTimeChange = (newTime: string) => {
    try {
      setReminderTime(newTime);
      localStorage.setItem(
        "learningReminder",
        JSON.stringify({
          enabled: notificationEnabled,
          time: newTime,
          lastSent: lastNotification,
        })
      );
      toast.success(`Waktu pengingat diubah ke ${newTime} ⏰`);
    } catch (error) {
      console.error("Error changing reminder time:", error);
      toast.error("Gagal mengubah waktu pengingat");
    }
  };

  const testNotification = () => {
    if (permission !== "granted") {
      toast.warning("Aktifkan notifikasi terlebih dahulu");
      return;
    }
    sendLearningReminder();
    toast.info("Notifikasi test dikirim 🔔");
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
      <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
        <Bell className="w-6 h-6 text-[#578FCA]" />
        Pengingat Belajar
      </h2>

      <div className="space-y-6">
        {/* Notification Status */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-[#27548A] mb-1">
                Notifikasi Harian
              </h3>
              <p className="text-sm text-gray-600">
                Dapatkan pengingat setiap hari untuk melanjutkan pembelajaran
                Anda
              </p>
            </div>
          </div>
        </div>

        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex-1">
            <h3 className="font-semibold text-[#27548A]">Aktifkan Pengingat</h3>
            <p className="text-sm text-[#578FCA]/70">
              Status:{" "}
              {permission === "granted"
                ? "✅ Diizinkan"
                : permission === "denied"
                ? "❌ Ditolak"
                : "⚠️ Belum diatur"}
            </p>
          </div>
          <button
            onClick={toggleNotification}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationEnabled ? "bg-[#578FCA]" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Time Picker */}
        {notificationEnabled && (
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-[#578FCA]" />
              <h3 className="font-semibold text-[#27548A]">Waktu Pengingat</h3>
            </div>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#578FCA]/30 rounded-xl focus:border-[#27548A] focus:outline-none text-[#27548A] font-semibold"
            />
            <p className="text-xs text-gray-500 mt-2">
              Pengingat akan dikirim setiap hari pada waktu yang dipilih
            </p>
          </div>
        )}

        {/* Test Button */}
        {notificationEnabled && permission === "granted" && (
          <button
            onClick={testNotification}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            🔔 Test Notifikasi
          </button>
        )}

        {/* Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>💡 Catatan:</strong> Notifikasi hanya bekerja jika website
            ini dibuka di background atau sebagai PWA. Untuk hasil terbaik,
            install aplikasi ke home screen Anda.
          </p>
        </div>

        {/* Permission Denied Help */}
        {permission === "denied" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800 mb-2">
              <strong>⚠️ Notifikasi Diblokir</strong>
            </p>
            <p className="text-xs text-red-700">
              Untuk mengaktifkan notifikasi, buka pengaturan browser → Izin
              situs → Cari {window.location.hostname} → Ubah izin Notifikasi
              menjadi &ldquo;Izinkan&rdquo;
            </p>
          </div>
        )}

        {/* Last Notification Info */}
        {lastNotification && notificationEnabled && (
          <div className="text-center text-sm text-gray-500">
            Notifikasi terakhir dikirim: {lastNotification}
          </div>
        )}
      </div>
    </div>
  );
}
