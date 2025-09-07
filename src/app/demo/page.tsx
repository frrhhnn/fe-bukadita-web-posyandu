import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="pt-20">
      {/* Beranda Section */}
      <section
        id="beranda"
        className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Selamat Datang di Buka Dita
          </h1>
          <p className="text-xl opacity-90">
            Sistem Pembelajaran Mandiri Kader Posyandu
          </p>
        </div>
      </section>

      {/* Fitur Section */}
      <section
        id="fitur"
        className="min-h-screen bg-white flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#27548A] mb-8">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Pembelajaran Interaktif
              </h3>
              <p className="text-gray-600">
                Materi pembelajaran yang interaktif dan mudah dipahami
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Tracking Progress</h3>
              <p className="text-gray-600">
                Pantau perkembangan pembelajaran Anda
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Sertifikat</h3>
              <p className="text-gray-600">
                Dapatkan sertifikat setelah menyelesaikan pembelajaran
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section
        id="galeri"
        className="min-h-screen bg-gray-100 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#27548A] mb-8">Galeri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow-md">
                <div className="h-48 bg-[#27548A]/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-[#27548A] font-semibold">
                    Gambar {item}
                  </span>
                </div>
                <h3 className="font-semibold">Aktivitas Posyandu {item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Route Button */}
      <div className="fixed bottom-4 right-4">
        <Link
          href="/test-routes"
          className="px-4 py-2 bg-[#27548A] text-white rounded-lg shadow-lg hover:bg-[#578FCA] transition"
        >
          Test Routes
        </Link>
      </div>
    </div>
  );
}
