import VideoBackground from "../components/ui/video-background";

export default function Home() {
  return (
    <>
      {/* Hero Section dengan Video Background */}
      <section id="home" className="relative min-h-screen">
        <VideoBackground />

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center text-center px-6">
          <div className="h-full">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">Bukadita (Buku Kader Digital)</h1>
            <p className="mt-4 text-white/90 text-lg md:text-xl">
              Sistem Pembelajaran Mandiri Kader Posyandu Kopelma Darussalam
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold shadow hover:shadow-lg transition"
              >
                Pelajari Lebih Lanjut
              </a>
              <a
                href="/auth"
                className="px-6 py-3 rounded-xl border border-white/70 text-white font-semibold hover:bg-white/10 transition"
              >
                Mulai Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <div className="relative z-10 min-h-screen flex items-center justify-center text-center px-6 py-24 md:py-0">
          <div className="max-w-4xl">
            <h2 className="text-[#176B87] text-4xl md:text-5xl font-bold tracking-tight">
              Tentang Bukadita
            </h2>
            <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo minus, alias consectetur corporis animi sit quam, cupiditate suscipit ad aut fuga repellat recusandae enim saepe excepturi maiores voluptatum corrupti molestiae?
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Visi Kami</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus voluptate similique aperiam quod ex? Consequatur sequi, saepe commodi porro nam placeat, ipsam rerum, error eveniet hic neque optio et nesciunt.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Misi Kami</h3>
                <p className="text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt expedita ipsam natus, eos impedit unde totam suscipit provident quo iure amet atque debitis eaque quibusdam aperiam fugiat itaque delectus. Esse.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tujuan</h3>
                <p className="text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est maxime illum, id quo odit dolores atque placeat ut, velit quod nobis, labore saepe architecto exercitationem perspiciatis itaque veniam excepturi temporibus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section id="maps" className="relative py-24 bg-gray-50 bg-gradient-to-tl from-blue-100 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#176B87] text-4xl md:text-5xl font-bold tracking-tight">
              Lokasi Posyandu
            </h2>
            <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              Temukan lokasi posyandu terdekat di wilayah Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Maps Container */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Peta Lokasi</h3>

                {/* Google Maps Embed */}
                <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0977!2d95.3178!3d5.5481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzInNTMuMiJOIDk1wrAxOSc0MC4xIkU!5e0!3m2!1sen!2sid!4v1640000000000!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Posyandu"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Lokasi</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Alamat Lengkap</h4>
                    <p className="text-gray-600 mt-1">
                      H99F+VG8, Kopelma Darussalam, Syiah Kuala, Banda Aceh City, Aceh 24415
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Koordinat</h4>
                    <p className="text-gray-600 mt-1">
                      Latitude: 5.5697101 N<br />
                      Longitude: 95.3737989° E
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Jam Operasional</h4>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p>Senin - Jumat: 08:00 - 16:00 WIB</p>
                      <p>Sabtu: 08:00 - 12:00 WIB</p>
                      <p>Minggu: Tutup</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="bg-[#176B87] p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-3">Petunjuk Arah</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Dapatkan petunjuk arah langsung ke lokasi posyandu
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=5.5697101,95.3737989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-3 bg-white text-[#176B87] font-semibold rounded-lg hover:bg-gray-100 transition"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
