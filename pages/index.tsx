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
        <title>Jacob Richards - Musician & Software Engineer</title>
        <meta
          name="description"
          content="Professional drummer, producer, and software engineer. Featured on NBC, Showtime. Creator of BATTERY."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔋</text></svg>" />
        <meta
          property="og:title"
          content="Jacob Richards - Musician & Software Engineer"
        />
        <meta
          property="og:description"
          content="Professional drummer, producer, and software engineer creating innovative music and technology"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-bg-primary text-text-primary relative overflow-x-hidden">
        {/* Minimalist Background */}
        <MinimalistBackground />

        {/* Navigation */}
        <ModernNavigation scrollY={scrollY} />

        {/* YouTube Player */}
        <YouTubePlayer />

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
