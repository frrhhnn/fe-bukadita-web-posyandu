"use client"

export default function VideoBackground() {
    return (
        <>
            {/* Background Video - hanya untuk section home */}
            <video
                className="absolute inset-0 h-full w-full object-cover -z-10"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/bg-poster.jpg"
            >
                <source src="/videos/bg-video.mp4" type="video/mp4" />
                {/* Opsional fallback jika tersedia */}
                {/* <source src="/videos/bg-video.webm" type="video/webm" /> */}
                Browser tidak mendukung video HTML5.
            </video>

            {/* Poster background for reduced motion */}
            <div className="poster-bg absolute inset-0 -z-10" aria-hidden="true" />

            {/* Dark blur overlay untuk mengurangi kecerahan video */}
            <div className="absolute inset-0 -z-5 bg-black/50 backdrop-blur-sm" />

            {/* Additional gradient overlay untuk efek yang lebih halus */}
            <div className="absolute inset-0 -z-4 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        </>
    );
}
