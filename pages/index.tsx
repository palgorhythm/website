import { useState, useEffect } from "react";
import Head from "next/head";
import MinimalistBackground from "../components/MinimalistBackground";
import YouTubePlayer from "../components/YouTubePlayer";
import ModernHero from "../components/ModernHero";
import ModernMusic from "../components/ModernMusic";
import ModernAbout from "../components/ModernAbout";
import ModernContact from "../components/ModernContact";
import ModernNavigation from "../components/ModernNavigation";
import GigsSection from "../components/GigsSection";
import BackToTop from "../components/BackToTop";

export default function Home(): React.JSX.Element {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Jacob Richards</title>
        <meta
          name="description"
          content="Professional drummer, producer, and software engineer. Featured on NBC, Showtime. Creator of BATTERY."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="keywords"
          content="Jacob Richards, drummer, producer, software engineer, BATTERY, music, programming, creative coding, NBC, Showtime"
        />
        <meta name="author" content="Jacob Richards" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.jacobrichards.net" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔋</text></svg>"
        />
        <meta property="og:title" content="Jacob Richards" />
        <meta
          property="og:description"
          content="Professional drummer, producer, and software engineer. Featured on NBC, Showtime. Creator of BATTERY."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jacobrichards.net" />
        <meta
          property="og:image"
          content="https://www.jacobrichards.net/inEurope.jpeg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jacob Richards" />
        <meta
          name="twitter:description"
          content="Professional drummer, producer, and software engineer. Featured on NBC, Showtime. Creator of BATTERY."
        />
        <meta
          name="twitter:image"
          content="https://www.jacobrichards.net/inEurope.jpeg"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jacob Richards",
              jobTitle: ["Drummer", "Music Producer", "Software Engineer"],
              description:
                "Professional drummer, producer, and software engineer. Featured on NBC, Showtime. Creator of BATTERY.",
              url: "https://www.jacobrichards.net",
              image: "https://www.jacobrichards.net/inEurope.jpeg",
              email: "jacob.richards33@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/palgorhythm/",
                "https://github.com/palgorhythm",
                "https://www.instagram.com/_battery/",
                "https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng",
                "https://batterydrums.bandcamp.com/",
                "https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69",
              ],
              knowsAbout: [
                "Music Production",
                "Drumming",
                "Software Engineering",
                "Creative Coding",
                "Audio Engineering",
              ],
              alumniOf: {
                "@type": "Organization",
                name: "Professional Music and Software Development",
              },
              hasCredential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "Professional Experience",
                  about: "Featured on NBC and Showtime",
                },
              ],
            }),
          }}
        />

        {/* Music Work Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "BATTERY",
              member: {
                "@type": "Person",
                name: "Jacob Richards",
              },
              genre: "Electronic Music",
              url: "https://batterydrums.bandcamp.com/",
              sameAs: [
                "https://www.instagram.com/_battery/",
                "https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng",
                "https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69",
              ],
            }),
          }}
        />
      </Head>

      <div
        className="min-h-screen bg-bg-primary text-text-primary relative overflow-x-hidden"
        id="top"
      >
        {/* Minimalist Background */}
        <MinimalistBackground />

        {/* Navigation */}
        <ModernNavigation scrollY={scrollY} />

        {/* YouTube Player */}
        <YouTubePlayer />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Main Content */}
        <main className="relative">
          <ModernHero />
          <ModernMusic />
          <GigsSection />
          <ModernAbout />
          <ModernContact />
        </main>

        {/* Subtle grain overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            zIndex: 100,
          }}
        />
      </div>
    </>
  );
}
